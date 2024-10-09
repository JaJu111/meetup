<template>
    <div>
        <HeaderComponent />

        <div class="main">
            <div class="login">
                <h1 class="login-title">{{ $t('header.registration') }}</h1>

                <form class="login-form" @submit.prevent>
                    <div class="input-box">
                        <span class="input-box__text">Email</span>
                        <input v-model.trim="email" class="login-form__input" type="email" name="email" placeholder=""
                            :class="{ invalid: ($v.email.$dirty && !$v.email.required && !goNextPage) || ($v.email.$dirty && !$v.email.email && !goNextPage) }">
                        <small style="color: red;" v-if="$v.email.$dirty && !$v.email.required && !goNextPage">
                            {{ 'Поле Email не должно быть пустым' }}
                        </small>
                        <small style="color: red;" v-else-if="$v.email.$dirty && !$v.email.email && !goNextPage">
                            {{ 'Введите корректный Email' }}
                        </small>
                    </div>
                    <div class="input-box">
                        <span class="input-box__text">{{ $t('registration.name') }}</span>
                        <input v-model.trim="fullName" class="login-form__input" type="text" name="fullName"
                            placeholder=""
                            :class="{ invalid: ($v.fullName.$dirty && !$v.fullName.required && !goNextPage) }">
                        <small style="color: red;" v-if="$v.fullName.$dirty && !$v.fullName.required && !goNextPage">
                            {{ 'Поле Имя не должно быть пустым' }}
                        </small>
                    </div>
                    <div class="input-box-bottom">
                        <span class="input-box__text">{{ $t('login.password') }}</span>
                        <input v-model.trim="password" class="login-form__input" type="password" name="password"
                            placeholder=""
                            :class="{ invalid: ($v.password.$dirty && !$v.password.required && !goNextPage) || ($v.password.$dirty && !$v.password.minLength && !goNextPage) }">
                        <small v-if="$v.password.$dirty && !$v.password.required && !goNextPage" style="color: red;">
                            {{ 'Введите пароль' }}
                        </small>
                        <small v-else-if="$v.password.$dirty && !$v.password.minLength && !goNextPage"
                            style="color: red;">
                            {{ `Пароль должно быть ${$v.password.$params.minLength.min} символов. Сейчас он` }} {{
                            password.length }}
                        </small>
                    </div>
                    <div class="input-box-bottom">
                        <span class="input-box__text">{{ $t('registration.repeatPassword') }}</span>
                        <input v-model.trim="repeatPassword" class="login-form__input" type="password" name="password"
                            placeholder=""
                            :class="{ invalid: ($v.repeatPassword.$dirty && !$v.repeatPassword.required && !goNextPage) || ($v.repeatPassword.$dirty && !$v.repeatPassword.minLength && !goNextPage) || isRepeatPassword }">
                        <small v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.required && !goNextPage"
                            style="color: red;">
                            {{ 'Введите повторный пароль' }}
                        </small>
                        <small v-if="isRepeatPassword" style="color: red;">
                            {{ 'Повторный пароль должно совпадать с предыдущим паролем' }}
                        </small>
                        <small v-else-if="$v.repeatPassword.$dirty && !$v.repeatPassword.minLength && !goNextPage"
                            style="color: red;">
                            {{ `Пароль должно быть ${$v.repeatPassword.$params.minLength.min} символов. Сейчас он` }} {{
                            repeatPassword.length }}
                        </small>
                    </div>
                    <div class="input-box-bottom__checkbox">
                        <input class="checkbox" v-model="selectCheck" type="checkbox">
                        <span class="checkbox-text">{{ $t('registration.agree') }}</span>
                        <small v-if="isSelectCheck">Вы должны согласоваться с условиями</small>
                    </div>
                    <div class="login-buttons">
                        <button class="login-btn" type="submit" @click="submitForm">{{ $t('registration.register')}}</button>
                    </div>
                    <div class="form-append">
                        {{ $t('registration.alreadyAccount') }}
                        <router-link to="/login">{{ $t('registration.singIn') }}</router-link>
                    </div>
                </form>
            </div>
        </div>

        <FooterComponent />
    </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
    name: 'RegisterView',
    components: {
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            email: '',
            fullName: '',
            password: '',
            repeatPassword: '',
            selectCheck: false,
            isSelectCheck: false,
            goNextPage: false,
            isLogin: false,
            isRepeatPassword: false,
        }
    },
    validations: {
        email: { email, required },
        password: { required, minLength: minLength(5) },
        fullName: { required },
        repeatPassword: { required, minLength: minLength(5) },
    },
    created() {
        // console.log($v);
    },
    methods: {
        submitForm() {
            this.isLogin = true;

            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            if (this.password !== this.repeatPassword) {
                this.isRepeatPassword = true;
            }

            if (this.password === this.repeatPassword) {
                this.isRepeatPassword = false;
            }

            if (!this.selectCheck) {
                this.isSelectCheck = true;
            }

            if (this.selectCheck && this.password === this.repeatPassword) {
                this.goNextPage = true;
                this.isRepeatPassword = false;
                this.isSelectCheck = false;

                const user = {
                    email: this.email,
                    fullName: this.fullName,
                    password: this.password,
                    repeatPassword: this.repeatPassword,
                    selectCheck: this.selectCheck,
                    isLogin: this.isLogin
                }

                localStorage.setItem('isAuth', JSON.stringify(user))

                this.$router.push({
                    name: 'home',
                    params: {
                        path: '/'
                    }
                })

                this.email = this.fullName = this.password = this.repeatPassword = '';
                this.selectCheck = false;
            }
        }
    }
}
</script>

<style lang="sass" scoped>
  .main
    background-color: #f7f9fe
  
  .login
    max-width: 374px
    width: 100%
    margin: 0 auto
    padding: 48px 0
  
    &-title
      margin-bottom: 32px
      text-align: center
      color: #474747
  
    &-form
      display: flex
      flex-direction: column
  
      &__input
        width: 100%
        padding: 12px 16px
        height: 52px
        border-radius: 8px
        border: 2px solid #b8c5e2
        font-family: Nunito, sans-serif
        font-weight: 600
        font-size: 20px
        line-height: 28px
        color: #34423f
        transition: .2s border-color
        background-color: #fff
        outline: none
        box-shadow: none
  
        &:focus
          border: 2px solid #4c6bb6
  
        &::placeholder
          font-weight: 100
          color: #b8c5e2
  
    &-btn
      padding: 10px 24px
      font-weight: 700
      font-size: 20px
      line-height: 28px
      color: #fff
      text-align: center
      border: 4px solid transparent
      transition-duration: .2s
      background-color: #4c6bb6
      border-radius: 8px
      cursor: pointer
  
      &:hover
        background-color: #b8c5e2
  
    &-buttons
      display: flex
      flex-direction: column
      // padding: 0 40px
      margin-top: 40px
  
  .input-box
    margin-bottom: 24px
    
    &__text
      font-weight: 400
      font-size: 20px
      line-height: 28px
      color: #505050
      margin-bottom: 10px
      display: block
  
  .form-append
    margin-top: 40px
    text-align: center
    font-weight: 400
    font-size: 20px
    line-height: 28px
    color: #505050
    
  .form-append a
    color: #466eca
    text-decoration: none
    margin-left: 10px
  
    &:hover
      text-decoration: underline
  
  .input-box-bottom
    margin-bottom: 24px
  
  .input-box-bottom__checkbox
    position: relative
    display: flex
    margin-bottom: 12px
  
  .input-box-bottom__checkbox small
    position: absolute
    bottom: -20px
    color: red
  
  .checkbox
    width: 25px
    cursor: pointer
    border-radius: 8px
    border: 2px solid #b8c5e2
    font-family: Nunito, sans-serif
  
    &-text
      margin-left: 20px
      font-weight: 400
      font-size: 20px
      line-height: 28px
      color: #505050
      display: block
  
  .login-form__input.invalid
    border: 2px solid red
  
  </style>