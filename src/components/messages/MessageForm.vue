<template>
    <div class="messages__form">
        <div class="ui inverted form">
            <div class="two fields">
                <div class="field">
                    <texture 
                        name="message" 
                        id="message" 
                        v-model="message" 
                        rows="3" 
                        placeholder="Message"
                    ></texture>
                </div>
                <div class="field">
                    <button class="ui green button" @click.prevent="sendMessage">Send</button>
                    <button class="ui labeled icon button"><i class="cloud upload icon"></i>File</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'message-form',
        data() {
            return {
                message: ''
            }
        },
        methods: {
            sendMessage() {

            }
        }
    }
</script>

<style scoped>
    .message__form {
        position: fixed;
        bottom: 0;
        background-color: #232323;
        padding: 10px;
        padding-top: 20px;
        height: 210px;
        left: 300px;
        right: 0; 
    }
    .message__form.big {
        height: 350px;
    }
    .shortcut {
        color: white;
    }
</style>


