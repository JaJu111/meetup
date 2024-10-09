<template>
    <div>
        <HeaderComponent />

        <div class="main">
            <div class="login">
                <h1 class="login-title">{{ $t('header.signIn') }}</h1>

                <form class="login-form" @submit.prevent>
                    <div class="input-box">
                        <span class="input-box__text">Email</span>
                        <input v-model.trim="email" class="login-form__input" type="email" name="email"
                            placeholder="demo@email"
                            :class="{ invalid: ($v.email.$dirty && !$v.email.required && !goNextPage) || ($v.email.$dirty && !$v.email.email && !goNextPage) }">
                        <small style="color: red;" v-if="$v.email.$dirty && !$v.email.required && !goNextPage">
                            {{ $t('login.enterYourEmail') }}
                        </small>
                        <small style="color: red;" v-else-if="$v.email.$dirty && !$v.email.email && !goNextPage">
                            {{ $t('login.enterYourEmailValid') }}
                        </small>
                    </div>
                    <div class="input-box-bottom">
                        <span class="input-box__text">{{ $t('login.password') }}</span>
                        <input v-model.trim="password" class="login-form__input" type="password" name="password"
                            placeholder="password"
                            :class="{ invalid: ($v.password.$dirty && !$v.password.required && !goNextPage) || ($v.password.$dirty && !$v.password.minLength && !goNextPage) || isPassword && email !== USER.email && !goNextPage || isPassword && password !== USER.password && !goNextPage }">
                        <small v-if="$v.password.$dirty && !$v.password.required && !goNextPage" style="color: red;">
                            {{ $t('login.enterEmailPassword') }}
                        </small>
                        <small v-else-if="$v.password.$dirty && !$v.password.minLength && !goNextPage"
                            style="color: red;">
                            {{ $t('login.passwordMustBeCharacters', [$v.password.$params.minLength.min,
                            password.length]) }}
                        </small>
                        <small
                            v-else-if="isPassword && email !== USER.email && !goNextPage || isPassword && password !== USER.password && !goNextPage"
                            style="color: red;">
                            {{ $t('login.incorrectPassword') }}
                        </small>
                    </div>
                    <div class="login-buttons">
                        <button :disabled="!email.length && !password.length || email.length && !password.length" class="login-btn" :class="{'btn-light': email.length && password.length}" type="submit" @click="submitForm">{{ $t('login.toComeIn') }}</button>
                    </div>
                    <div class="form-append">
                        {{ $t('login.dontAccount') }}
                        <router-link to="/register">{{ $t('login.goRegister') }}</router-link>
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
    name: 'LoginView',
    components: {
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            email: '',
            password: '',
            isLogin: false,
            isPassword: false,
            goNextPage: false,
            USER: {
                email: 'jaju777@gmail.com',
                password: '12345',
            },
        }
    },
    validations: {
        email: { email, required },
        password: { required, minLength: minLength(5) }
    },
    methods: {
        submitForm() {
            this.isLogin = true;

            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            const user = {
                email: this.email,
                password: this.password,
                isLogin: this.isLogin
            }

            if (user.email !== this.USER.email && user.password === this.USER.password || user.email !== this.USER.email && user.password !== this.USER.password) {
                this.isPassword = true;
            }

            if (user.email === this.USER.email && user.password === this.USER.password) {

                this.goNextPage = true;

                this.isPassword = false;

                localStorage.setItem('isAuth', JSON.stringify(user))

                this.$router.push({
                    name: 'home',
                    params: {
                        path: '/'
                    }
                })

                this.email = this.password = '';
            }
        }
    },
    computed: {
        errorEmail() {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return regex.test(this.email);
        },

        errorPassword() {
            return this.password
        }
    }
}
</script>

<style lang="sass" scoped>
  .main
    display: flex
    justify-content: center
    background-color: #f7f9fe
  
  .login
    max-width: 374px
    width: 100%
    padding: 75px 0
  
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
      color: #AEB6C7
      text-align: center
      border: 4px solid transparent
      transition-duration: .2s
      background-color: #f1f1f1
      border-radius: 8px
      cursor: pointer
  
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
  
  .login-form__input.invalid
    border: 2px solid red

.btn-light
    background-color: #4c6bb6
    color: #fff


@media (max-width: 460px)
    .login
        padding: 75px 24px

    .form-append
        font-size: 16px

</style>