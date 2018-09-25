<template>
    <div class="comment comment_container">
        <a class="avatar">
            <img src="message.user.avatar">
        </a>
        <div class="content" :class="{'comment__self': selfMessage(message.user)}" >
            <a class="author">{{message.user.name}}</a>
            <div class="metadata">
                <span class="date comment__date">{{message.timestamp | fromNow}}</span>
            </div>
            <div class="text">{{message.content}}</div>
        </div>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import moment from 'moment'

    export default {
        name: 'single-message',
        props: ['message'],
        computed: {
                ...mapGetters(['currentUser'])
        },
        methods: {
            selfMessage(user) {
                return user.id === this.currentUser.uid
            }
        },
        filters: {
            fromNow(value) {
                return moment(value).fromNow()
            }
        }
    }
</script>

<style scoped>

</style>

