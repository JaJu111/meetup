<template>
    <div>
        <footer class="footer">
            <div class="container">
                <router-link to="/">
                    Vue 3 Course
                </router-link>
                © 2022-2024
            </div>
        </footer>
    </div>
</template>

<script>
export default {}
</script>

<style lang="sass">
.footer
    padding: 100px 0 60px
    text-align: center
    background-color: #f7f9fe

.container
    width: 100%
    margin: 0 auto

.container a
    color: #466eca
    text-decoration: none
    margin-right: 10px

    &:hover
        text-decoration: underline
</style>