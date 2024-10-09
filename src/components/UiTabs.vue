<template>
    <div>
        <div class="content_tabs">
            <span 
                @click="selectTabsLeft" 
                class="left" 
                :class="{'active': selectedTabLeft}"
            >
                Описание
            </span>
            <span 
                @click="selectTabsRight" 
                class="right" 
                :class="{'active': selectedTabRight}"
            >
                Программа
            </span>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            selectedTabLeft: true,
            selectedTabRight: false
        }
    },
    methods: {
        selectTabsLeft() {
            this.selectedTabLeft = true;
            this.selectedTabRight = false;

            this.$emit('selectedTabLeft')
        },
        selectTabsRight() {
            this.selectedTabRight = true;
            this.selectedTabLeft = false;

            this.$emit('selectedTabRight')
        }
    }
}

</script>

<style lang="sass">
.content_tabs
    position: relative

.content_tabs::before
    content: ""
    position: absolute
    left: 0
    bottom: -9.5px
    width: 100%
    height: 2.5px
    background-color: #dee1e1

.left,
.right
    position: relative
    color: #5e706c
    padding: 10px 0
    font-weight: 400
    font-size: 18px
    text-decoration: none
    line-height: 28px
    border-bottom: 2px solid transparent
    cursor: pointer
    margin-right: 18px
    user-select: none

.left.active
    border-bottom: 2.5px solid #4c6bb6
    color: #4c6bb6
    z-index: 1

.right.active
    border-bottom: 2.5px solid #4c6bb6
    color: #4c6bb6
    z-index: 1

.right:hover
    border-bottom: 2.5px solid #4c6bb6
    color: #4c6bb6

.left:hover
    border-bottom: 2.5px solid #4c6bb6
    color: #4c6bb6

</style>