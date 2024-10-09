<template>
    <div style="box-shadow: 0 0px 7px #0000001f; position: relative;">
        <header class="header">
            <router-link to="/">
                <img class="logo" src="@/assets/logo.5583e3eb.svg">
            </router-link>
        </header>
        
        <nav class="navbar">
            <ul>
                <li v-if="isMeetupPage"><router-link to="/">← {{ $t('header.returnToList') }}</router-link></li>
                <div v-if="isMeetupPage" class="dot"></div>

                <li><router-link to="/login">{{ $t('header.signIn') }}</router-link></li>
                <div class="dot"></div>
                <li><router-link to="/register">{{ $t('header.registration') }}</router-link></li>
                <div class="dot"></div>
                <div class="translate-box">
                    <select @click="setTranslate($event)" class="dropdown-content">
                        <option :value="ruLang">{{ ruLang }}</option>
                        <option :value="enLang">{{ enLang }}</option>
                    </select>
                    <div class="flags">
                        <img v-if="this.$i18n.locale === 'ru'" :src="ruImg">
                        <img v-if="this.$i18n.locale === 'en'" :src="enImg">
                    </div>
                </div>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMeetupPage: false,
            isLocale: false,
            ruLang: 'RU',
            enLang: 'EN',
            ruImg: 'https://vectorflags.s3.amazonaws.com/flags/ru-circle-01.png',
            enImg: 'https://vectorflags.s3.amazonaws.com/flags/us-circle-01.png',
        }
    },
    created() {
        this.$route.path === '/meetup' ? this.isMeetupPage = true : this.isMeetupPage = false;

        if (this.$i18n.locale === 'ru') {
            this.ruLang = 'RU';
            this.enLang = 'EN';
        } else {
            this.ruLang = 'EN';
            this.enLang = 'RU';
        }

        if (this.$i18n.locale === 'en') {
            this.ruLang = 'EN';
            this.enLang = 'RU';
        } else {
            this.ruLang = 'RU';
            this.enLang = 'EN';
        }
    },
    methods: {
        setTranslate(event) {
            let lang = event.target;
            return this.$i18n.locale = lang.value.toLowerCase();
        }
    }
}
</script>

<style lang="sass">
.header
    padding: 44px 0 0
    display: flex
    justify-content: center
    background-color: #fff

.logo
    width: 175px

.navbar 
    display: flex
    justify-content: center
    padding-bottom: 32px
    padding-top: 24px
    background-color: #fff

.navbar ul
    display: flex
    align-items: center

.navbar li
    list-style: none
    font-size: 24px
    line-height: 28px
    padding: 0 20px

.navbar a
    text-decoration: none
    color: #505050

    &:hover
        color: #466eca

.dot
    width: 6px
    height: 6px
    border-radius: 50%
    background: #cbd4e9

.translate-box
    display: flex
    justify-content: center
    align-items: center
    padding: 0 20px

.dropdown-content
    outline: none
    color: #505050
    font-size: 24px
    line-height: 28px
    cursor: pointer

.lang-icon
    padding-left: 12px
    font-size: 24px
    padding-top: 1px
    color: #4c6bb6

.flags
    position: relative
    width: 21px
    height: 20px
    border-radius: 50%
    padding-left: 6px

.flags img
    position: absolute
    width: 100%
    height: 100%
    border: 0.1px solid #c6c6c6
    border-radius: 50%

</style>