<template>
    <div class="messages__container">
        <div class="messages__content">
            <h2 class="ui inverted center aligned header">{{ channelName }}</h2>
            <div class="ui segment">
                <div class="ui comments">
                    <transition-group tag="div" name="list">
                        <single-message 
                            :message="message" 
                            v-for="message in messages" 
                            :key="message.id"
                        ></single-message>
                    </transition-group>
                </div>
            </div>
        </div>
        <message-form></message-form>
    </div>
</template>

<script>

    import MessageForm from './MessageFrom'
    import {mapGetters} from 'vuex'
    import SingleMessage from './SingleMessage'

    export default {
        name: 'messages',
        components: {MessageForm, SingleMessage},
        data() {
            return {
                messagesRef: firebase.database().ref('messages'),
                privateMessageRef: firebase.database().ref('privateMessage'),
                messages: [],
                channel: null,
                listeners: []  
            }
        },
        computed: {
            ...mapGetters(['currentChannel', 'currentUser', 'isPrivate']),
            channelName() {
                if(this.channel !== null) {
                    return this.isPrivate ? '@ ' + this.channel.name : '@ ' + this.channel.name
                }
            }
        },
        watch: {
            currentChannel() {
                this.detachListeners()
                this.addlisteners()
                this.channel = this.currentChannel
            }
        },
        methods: {
            addlisteners() {
                let ref = this.getMessageRef()
                ref.child(this.currentChannel.id).on('child_added', snap => {
                    let message = snap.val()
                    message['id'] = snap.key
                    this.messages.push(message)
                    this.$nextTick(() => {
                        $('html, body').scrollTop($(document).height()) 
                    })
                    
                })
                this.addToListeners(this.currentChannel.id, ref, 'child_added')
            },
            addToListeners(id, ref, event) {
                let index = this.listeners.findIndex(el => {
                    return el.id === id && el.ref && el.event === event
                })
                if(index === -1) {
                    this.listeners.push({id: id, ref: ref, event: event})
                }
            },
            detachListeners() {
                this.listeners.forEach(listener => {
                    listener.ref.child(listener.id).off(listener.event)
                })
                this.listeners = []
                this.messages = []
            },
            getMessageRef() {
                if(this.isPrivate) {
                    return this.privateMessageRef
                }else {
                    return this.messagesRef
                }
            }
        },
        beforeDestroy() {
            this.detachListeners()
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
    .list-enter-active {
        transition: all 0.3s;
    }
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateX(30px);
    }
</style>
