<template>
    <div class="messages__container">
        <div class="messages__content">
            <h2 class="ui inverted center aligned header"># Channel name</h2>
            <div class="ui segment">
                <div class="uicomments">

                </div>
            </div>
        </div>
        <message-form></message-form>
    </div>
</template>

<script>

    import MessageForm from './MessageFrom'

    export default {
        name: 'messages',
        components: {MessageForm},
        data() {
            messagesRef: firebase.database().ref('messages')
        }
    }
</script>

<style scoped>
    .messages__constainer {
        position: relative;
        background-color: #2a2a2e;
        padding: 10px 30px 210px 30px;
        margin-left: 300px;
        min-height: 100%;
    }
    .messages__constainer .comments{
        font-size: 1.2em;
    }
</style>
