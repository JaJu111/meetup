<template>
    <div class="home-page">
        <HeaderComponent />

        <MainComponent />

        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import MainComponent from '@/components/MainComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
    name: 'HomeView',
    components: {
        HeaderComponent,
        MainComponent,
        FooterComponent,
    },
}
</script>

<style lang="sass" scoped>
  .home-page
    background-color: #f7f9fe
  </style>