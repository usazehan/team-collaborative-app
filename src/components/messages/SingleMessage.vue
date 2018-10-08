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
            <div class="text" v-if="!isFile(message)">{{message.content}}</div>
            <img class="ui image comment__image" :src="message.image" alt="image" v-else>
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
            },
            isFile(message) {
                return message.content == null && message.image != null
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

