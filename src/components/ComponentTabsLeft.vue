<template>
    <div>
        <div class="meetup-description">
            <p>
                {{ meetupDetail.description }}
            </p>
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
.meetup-description
    padding-top: 40px
    // margin-bottom: 24px
    font-size: 18px
    line-height: 28px
    white-space: pre-wrap

.meetup-description p
    color: #595959

</style>