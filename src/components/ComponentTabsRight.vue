<template>
    <div>
        <div class="meetups-agenda" v-for="item in meetupsAgenda" :key="item.id">
            <div class="agenda-item">
                <div class="agenda-item__icon" v-html="setIconAgenda(item)"></div>
                <div class="agenda-item__time">{{ item.startsAt }} - {{ item.endsAt }}</div>
                <div class="agenda-item__description">
                    <h3 v-if="item.type && !item.description" class="agenda-item__type">{{ agendaItemType(item.type) }}</h3>
                    <h3 v-else class="agenda-item__title">{{ item.title }}</h3>
                    <div v-if="item.description" class="agenda-item__box">{{ item.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        meetupsAgenda: Array,
        default: []
    },
    methods: {
        agendaItemType(type) {
            if (type === 'registration') {
                return 'Регистрация'
            }
            if (type === 'closing') {
                return 'Закрытие'
            }
            if (type === 'opening') {
                return 'Открытие'
            }
            if (type === 'coffee') {
                return 'Coffee Break'
            }
            if (type === 'break') {
                return 'Перерыв'
            }
            if (type === 'afterparty') {
                return 'После вечеринки'
            }
            if (type === 'other') {
                return 'Другой'
            }
        },
        setIconAgenda(item) {
            if (item.type === 'registration' || item.type === 'closing') {
                return '<i class="fa-solid fa-key"></i>';
            }
            if (item.type === 'coffee' || item.type === 'break' || item.type === 'afterparty') {
                return '<i class="fa-solid fa-mug-hot"></i>';
            }
            if (item.type === 'talk') {
                return '<i class="fa-solid fa-comments"></i>';
            }
            if (item.type === 'opening') {
                return '<i class="fa-regular fa-folder-open"></i>';
            }
            if (item.type === 'other') {
                return '<i class="fa-brands fa-meetup"></i>';
            }
        }
    }
}

</script>

<style lang="sass">
.meetups-agenda
    padding-top: 9px

.agenda-item
    display: flex
    justify-content: space-between
    padding: 40px 0
    border-bottom: 2px solid #dee1e1

    &__icon
        color: #b8c5e2
        font-size: 18px

    &__time
        color: #4c6bb6
        font-size: 17px

    &__description
        width: 70%

    &__title
        margin-bottom: 20px
        color: #505050

    &__type
        color: #505050

    &__box
        color: #5e706c
        font-size: 20px

</style>