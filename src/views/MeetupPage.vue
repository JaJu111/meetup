<template>
    <div>
        <HeaderComponent />

        <main class="main">
            <div>
                <div class="meetup-page"
                    style="background-image: url(https://course-vue.javascript.ru/assets/undraw_conference_speaker_6nt7.3cd91942.svg); background-size: cover; background-position: center;">
                    <div class="background"></div>
                    <img :src="meetupDetail.image">
                    <h1 class="meetup-page__title">{{ meetupDetail.title }}</h1>
                </div>

                <div class="container-box">
                    <div class="meetup">
                        <div class="meetup__content">
                            <UiTabs @selectedTabLeft="selectedTabLeft" @selectedTabRight="selectedTabRight" />

                            <keep-alive>
                                <component :is="currentComponent" :meetupDetail="meetupDetail"
                                    :meetupsAgenda="meetupsAgenda" />
                            </keep-alive>
                        </div>

                        <div class="meetup__aside">
                            <UiAside :meetupDetail="meetupDetail" />
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <FooterComponent />
    </div>
</template>

<script>

import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import UiTabs from '@/components/UiTabs.vue';
import UiAside from '@/components/UiAside.vue';
import ComponentTabsLeft from '@/components/ComponentTabsLeft.vue';
import ComponentTabsRight from '@/components/ComponentTabsRight.vue';

export default {
    name: 'MeetupPage',
    components: {
        HeaderComponent,
        FooterComponent,
        UiTabs,
        UiAside,
        ComponentTabsLeft,
        ComponentTabsRight,
    },
    data() {
        return {
            currentComponent: 'ComponentTabsLeft',
            meetupDetail: null,
            meetupsAgenda: [],
        }
    },
    created() {
        const meetupDetail = localStorage.getItem("meetupDetail");
        this.meetupDetail = JSON.parse(meetupDetail);
        console.log(this.meetupDetail);
    },
    methods: {
        selectedTabLeft() {
            this.currentComponent = 'ComponentTabsLeft';

            this.currentComponent === 'ComponentTabsLeft' ? 'ComponentTabsLeft.vue' : 'ComponentTabsRight.vue';
        },
        selectedTabRight() {
            this.meetupsAgenda = this.meetupDetail.agenda
            this.currentComponent = 'ComponentTabsRight';

            this.currentComponent === 'ComponentTabsRight' ? 'ComponentTabsRight.vue' : 'ComponentTabsLeft.vue';
        }
    }
}
</script>

<style lang="sass" scoped>
.main
  background-color: #f7f9fe

.container-box
  max-width: 1000px
  width: 100%
  margin: 0 auto

.meetup-page
    position: relative
    width: 100%
    min-height: 410px
    overflow: hidden
    display: flex
    justify-content: center
    align-items: center

    &__title
        color: #fff
        z-index: 1
        position: absolute
        font-size: 72px
        line-height: 84px
        text-align: center

.meetup-page img
    position: absolute
    width: 100%

.background
    position: absolute
    width: 100%
    height: 100%
    opacity: 40%
    background-color: #000
    z-index: 1

.meetup
    display: flex
    margin: 48px 0 0

.meetup__content
    width: 70%

.meetup__aside
    width: 30%
    padding: 30px 0 0 44px

</style>