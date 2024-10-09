<template>
    <div>
        <div class="aside">
            <ul>
                <li><i class="fa-regular fa-user"></i> {{ meetupDetail.organizer }}</li>
                <li><i class="fa-solid fa-location-dot"></i> {{ meetupDetail.place }}</li>
                <li><i class="fa-regular fa-calendar"></i> {{ meetupDetail.dateIso }}</li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        meetupDetail: Object,
        default: {}
    }
}

</script>

<style lang="sass">
.aside li
    list-style: none
    position: relative
    font-size: 18px
    line-height: 28px
    margin: 0 0 8px
    color: #595959

.aside i
    padding-right: 10px
    color: #7c9eeb

</style>