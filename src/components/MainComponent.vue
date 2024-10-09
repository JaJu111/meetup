<template>
    <div>
        <div v-if="isAuth" class="toast">
            <i class="fa-solid fa-check"></i>
            <span>{{ $t('main.loginCompleted') }}</span>
        </div>

        <div v-if="loader" class="loader-box">
            <UiLoader />
        </div>

        <main v-if="!loader" class="main">
            <div>
                <div class="container-box">
                    <div class="filters-panel">
                        <div class="filters-panel-radio-box">
                            <div @click="checkChipsButton1" class="chips-button1" :class="{ 'active': chipsButton1 }">
                                {{ $t('main.all') }}
                            </div>
                            <div @click="checkChipsButton2" class="chips-button2" :class="{ 'active': chipsButton2 }">
                                {{ $t('main.past') }}
                            </div>
                            <div @click="checkChipsButton3" class="chips-button3" :class="{ 'active': chipsButton3 }">
                                {{ $t('main.expected') }}
                            </div>
                        </div>
                        <div class="filters-panel-search-box">
                            <div class="search-box">
                                <i class="fa-solid fa-magnifying-glass search"></i>
                                <i v-if="search.length" class="fa-solid fa-xmark closed" @click="clearSearch"></i>
                                <input v-model="search" type="text" :placeholder="$t('main.search')">
                            </div>
                            <div class="search-box__buttons">
                                <button @click="getMeetupsList" class="buttons1"
                                    :class="{ 'button-clicked': showCalendar }">
                                    <i class="fa-solid fa-bars"></i>
                                </button>
                                <button @click="getCalendar" class="buttons2"
                                    :class="{ 'button-clicked': showCalendar }">
                                    <i class="fa-regular fa-calendar"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <ul v-if="filteredMeetupsList.length && !this.showCalendar" class="meetups-list">
                        <li class="meetups-list__item" v-for="item of filteredMeetupsList" :key="item.id"
                            @click="getItemGoNextPage(item)">
                            <article class="meetup-card">
                                <div class="card__col1"
                                    style="background-image: url(https://course-vue.javascript.ru/assets/undraw_conference_speaker_6nt7.3cd91942.svg); background-size: cover; background-position: center;">
                                    <div class="card__col1__background"></div>
                                    <img :src="item.image">
                                    <h1 class="card__col1__title">
                                        {{ item.title }}
                                    </h1>
                                </div>

                                <div class="card__col2">
                                    <div class="info" :style="{
                                        'background-color': item.type === 'register' ? 'rgb(205 255 195)' : 'rgb(255 200 200)',
                                        'color': item.type === 'register' ? 'rgb(12 147 0)' : 'rgb(187 0 0)'
                                    }">
                                        {{ getAgenda(item) }}
                                    </div>
                                    <ul>
                                        <li><i class="fa-regular fa-user"></i> {{ item.organizer }}</li>
                                        <li><i class="fa-solid fa-location-dot"></i> {{ item.place }}</li>
                                        <li><i class="fa-regular fa-calendar"></i> {{ item.dateIso }}</li>
                                    </ul>
                                </div>
                            </article>
                        </li>
                    </ul>

                    <div v-else-if="!filteredMeetupsList.length && !this.showCalendar" class="not-found">
                        {{ $t('main.notFoundMeetups') }}
                    </div>

                    <template v-if="showCalendar">
                        <UiCalendar />
                    </template>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

import meetups from '@/meetups/meetups';
import UiLoader from '@/components/UiLoader.vue';
import UiCalendar from '@/components/UiCalendar.vue';

export default {
    components: {
        UiLoader,
        UiCalendar
    },
    mixins: [meetups],
    data() {
        return {
            isAuth: false,
            loader: false,
            search: '',
            showCalendar: false,
            chipsButton1: true,
            chipsButton2: false,
            chipsButton3: false,
        }
    },
    created() {
        const getUser = localStorage.getItem('isAuth');
        let USER = JSON.parse(getUser);

        if (!USER) {
            this.$router.push({
                name: 'login',
                params: {
                    path: '/login'
                }
            })
        } else {

            if (USER.isLogin) {
                this.isAuth = true;
            }

            this.loader = true;

            setTimeout(() => {
                this.loader = false;
            }, 500)

            setTimeout(() => {
                USER.isLogin = false;

                localStorage.setItem('isAuth', JSON.stringify(USER))
            }, 500)

            setTimeout(() => {
                this.isAuth = false;
            }, 5000)

            setTimeout(() => {
                localStorage.clear('isAuth');
            }, 300000)
        }
    },
    // methods: {
    //     clearSearch() {
    //         this.search = '';
    //     },
    //     getCalendar() {
    //         this.showCalendar = true;
    //     },
    //     getMeetupsList() {
    //         this.showCalendar = false;
    //     },
    //     checkChipsButton2() {
    //         this.chipsButton1 = false;
    //         this.chipsButton3 = false;
    //         this.chipsButton2 = true;
    //     },
    //     checkChipsButton3() {
    //         this.chipsButton1 = false;
    //         this.chipsButton2 = false;
    //         this.chipsButton3 = true;
    //     },
    //     checkChipsButton1() {
    //         this.chipsButton2 = false;
    //         this.chipsButton3 = false;
    //         this.chipsButton1 = true;
    //     },
    //     getItemGoNextPage(item) {
    //         localStorage.setItem("meetupDetail", JSON.stringify(item));

    //         this.$router.push({
    //             name: 'meetup',
    //             params: {
    //                 path: '/meetup',
    //             }
    //         });
    //     },
    //     getAgenda(item) {
    //         if (item.type === 'register') {
    //             return 'Участвую';
    //         }
    //         if (item.type === 'closed') {
    //             return 'Закрыто';
    //         }
    //     }
    // },
    computed: {
        filteredMeetupsList() {
            return this.meetups.filter(i => {
                return i.place.toLowerCase().includes(this.search) ||
                    i.organizer.toLowerCase().includes(this.search)
            });
        }
    }
}
</script>

<style lang="sass" scoped>
  .info
    position: absolute
    top: 0
    right: 0
    font-size: 18px
    padding: 5px 18px
    border-bottom-left-radius: 8px
  
  .toast
    padding: 16px 30px
    bottom: 28px
    right: 30px
    background: #505050
    color: #fff
    border-radius: 4px
    position: fixed
    z-index: 2
  
  .toast i
    color: #28b800
    margin-right: 14px
    font-size: 17px
  
  .main
    min-height: 332px
    max-height: 100%
    background-color: #f7f9fe
    padding: 0 30px
  .container-box
    max-width: 1000px
    width: 100%
    margin: 0 auto
  
  .filters-panel
    display: flex
    flex-direction: row
    justify-content: space-between
    margin-bottom: 32px
    margin-top: 40px
  
  .meetups-list li
    list-style: none
  
  .meetups-list__item
    margin: 0 0 32px
    cursor: pointer
  
  .meetups-list__item a
    margin: 0
    text-decoration: none
  
    &:hover
      text-decoration: none
  
    &:last-child
      margin: 0
  
  .meetup-card
    display: flex
    flex-direction: row
    background-color: #fff
    box-shadow: 0 2px 16px #0000001f
    transition: box-shadow ease .2s
    min-height: 220px
  
    &:hover
      box-shadow: 0 2px 16px #0000003d
  
  .card__col1,
  .card__col2
    flex: 1 0 50%
    position: relative
    display: flex
    flex-direction: column
  
  .card__col2
    display: flex
    flex-direction: column
    justify-content: center
    padding: 50px
    border-left: 5px solid #4c6bb6
  
  .card__col1
    position: relative
    display: flex
    justify-content: center
    align-items: center
    overflow: hidden
  
    &__title
      z-index: 1
      color: #fff
      font-size: 32px
      text-align: center
  
    &__background
      width: 100%
      height: 100%
      background-color: #000
      opacity: 50%
      position: absolute
      z-index: 1
  
  .card__col1 img
    position: absolute
    width: 100%
  
  .card__col2 li
    margin: 0 0 8px
    font-size: 18px
    line-height: 28px
    color: #505050
  
  .card__col2 li i
    font-size: 20px
    color: #7c9eeb
    padding-right: 10px
  
  .filters-panel-search-box
    display: flex
  
  .search-box
    position: relative
    display: flex
  
  .search-box input
    min-width: 300px
    padding-left: 50px
    border: 2px solid #b8c5e2
    outline: none
    height: 44px
    border-radius: 22px
    font-family: Nunito, sans-serif
    font-weight: 500
    color: #505050
    font-size: 20px
    line-height: 28px
    box-shadow: none
    background-color: #fff
    transition: .2s border-color
  
    &:focus
      border: 2px solid #4c6bb6
  
    &::placeholder
      color: #b8c5e2
      font-weight: 200
  
  .search-box .search
    position: absolute
    color: #b8c5e2
    font-size: 25px
    left: 15px
    top: 11.5px
  
  .search-box .closed
    position: absolute
    color: #4c6bb6
    font-size: 24px
    right: 16px
    top: 11px
  
  .search-box__buttons
    padding-left: 15px
  
  .buttons1
    border-radius: 22px 0 0 22px
    border-left: 2px solid #4c6bb6
    background-color: #4c6bb6
    color: #fff
    border: 2px solid #4c6bb6
    height: 44px
    padding-left: 15px
    padding-right: 12px
    padding-top: 2px
    cursor: pointer
  
  .buttons1 i
    font-size: 20px
  
  .buttons2 i
    font-size: 20px
  
  .buttons2
    border-radius: 0 22px 22px 0
    border-left: 2px solid #4c6bb6
    background-color: #fff
    color: #4c6bb6
    border: 2px solid #4c6bb6
    height: 44px
    padding-left: 12px
    padding-right: 15px
    padding-top: 2px
    transition: 0.2s
    cursor: pointer
  
    &:hover
      background-color: #4c6bb6
      color: #fff
  
  .buttons2.button-clicked
    background-color: #4c6bb6
    color: #fff
  
  .buttons1.button-clicked
    background-color: #fff
    color: #4c6bb6
  
    &:hover
      background-color: #4c6bb6
      color: #fff
  
  .not-found
    padding: 28px 24px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    font-size: 20px
    line-height: 28px
    color: #6386d3
    border: 2px solid #b8c5e2
    border-radius: 8px
  
  .filters-panel-radio-box
    display: flex
  
  .chips-button1,
  .chips-button2,
  .chips-button3
    display: flex
    align-items: center
    margin-right: 16px
    height: 44px
    padding: 6px 16px
    border-radius: 22px
    color: #466eca
    font-weight: 400
    font-size: 20px
    line-height: 28px
    cursor: pointer
    user-select: none
  
  .chips-button1.active,
  .chips-button2.active,
  .chips-button3.active
    border: 2px solid #4c6bb6
    padding: 4px 14.4px
  
  .loader-box
    display: flex
    justify-content: center
    align-items: center
    height: 50vh
  
  @media only screen and (max-width: 900px)
    .filters-panel
      flex-direction: column
  
    .filters-panel-search-box
      margin-top: 20px
  
  </style>