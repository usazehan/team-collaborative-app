<template>
    <div class="messages__form">
        <div class="ui inverted form">
            <div class="two fields">
                <div class="field">
                    <textarea 
                        name="message" 
                        id="message" 
                        v-model.trim="message" 
                        rows="3" 
                        placeholder="Message"
                    ></textarea>
                </div>
                <div class="field">
                    <button class="ui green button" @click.prevent="sendMessage">Send</button>
                    <button class="ui labeled icon button" @click.prevent="openFileModal"><i class="cloud upload icon"></i>File</button>
                </div>
            </div>
        </div>
        <file-modal></file-modal>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import FileModal from './FileModal'

    export default {
        name: 'message-form',
        components: {FileModal},
        data() {
            return {
                message: '',
                errors: []
            }
        },
        computed: {
            ...mapGetters(['currentChannel', 'currentUser'])
        },
        methods: {
            sendMessage() {
                if(this.currentChannel !==null) {
                    if(this.message.length > 0) {
                       this.$parent.getMessageRef().child(this.currentChannel.id).push().set(this.createMessage()).then(() => {

                        }).catch(error => {
                            this.errors.push(error.message)
                        })
                        this.message = "" 
                    }
                }
            },
            createMessage() {
                return {
                    content: this.message,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                        name: this.currentUser.displayName,
                        avatar: this.currentUser.photoURL,
                        id: this.currentUser.uid
                    }
                }
            },
            uploadFile(File, metadata) {
                console.log("upload")
            },
            openFileModal() {
                $("#fileModal").modal("show")
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


