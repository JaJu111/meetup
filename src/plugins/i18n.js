import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import messages from './messages';

Vue.use(VueI18n);

export default new VueI18n({
	locale: 'ru',
	// messages
    messages: {
        ru: {
            header: {
                signIn: 'Вход',
                registration: 'Регистрация',
                returnToList: 'Вернуться к списку',
            },
            main: {
                all: 'Все',
                past: 'Прошедшие',
                expected: 'Ожидаемые',
                search: 'Поиск',
                notFoundMeetups: 'Митапов по заданным условиям не найдено...',
                loginCompleted: 'Вход завершен, ваша сессия заканчивается через 5 минут',
            },
            login: {
                password: 'Пароль',
                toComeIn: 'Войти',
                dontAccount: 'Нет аккаунта?',
                goRegister: 'Зарегистрируйтесь',
                enterYourEmail: 'Введите адрес электронной почты.',
                enterYourEmailValid: 'Пожалуйста, введите действительный адрес электронной почты.',
                enterEmailPassword: 'Введите пароль электронной почты.',
                passwordMustBeCharacters: 'Пароль должно быть {0} символов. Сейчас он {1}',
                incorrectPassword: 'Не верный пароль',
            },
            registration: {
                name: 'Имя',
                repeatPassword: 'Повтор пароля',
                agree: 'Я согласен с условиями',
                register: 'Зарегистрироваться',
                alreadyAccount: 'Уже есть аккаунт?',
                singIn: 'Войдите',
            },
        },
        en: {
            header: {
                signIn: 'Sign in',
                registration: 'Registration',
                returnToList: 'Return to list',
            },
            main: {
                all: 'All',
                past: 'Past',
                expected: 'Expected',
                search: 'Search',
                notFoundMeetups: 'No meetups were found matching the specified conditions...',
                loginCompleted: 'Login completed, your session ends in 5 minutes',
            },
            login: {
                password: 'Password',
                toComeIn: 'To come in',
                dontAccount: `Don't have an account?`,
                goRegister: 'Register',
                enterYourEmail: 'Enter your email address.',
                enterYourEmailValid: 'Please enter a valid email address.',
                enterEmailPassword: 'Enter your email password.',
                passwordMustBeCharacters: 'Password must be {0} characters. Now he is {1}',
                incorrectPassword: 'Incorrect password',
            },
            registration: {
                name: 'Name',
                repeatPassword: 'Repeat password',
                agree: 'I agree with the conditions',
                register: 'Register',
                alreadyAccount: 'Already have an account?',
                singIn: 'Sign in',
            },
        },
    }
});