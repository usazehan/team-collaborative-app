export default {
    methods: {
        handleNotifications(channelId, currentChannelId, notifCount, snap) {
            let lastTotal = 0
            let index = notifCount.findIndex(el => el.id === channelId)
            if(index !== -1) {
                if(channelId !== currentChannelId) {
                    lastTotal = notifyCount[index].total
                    if(snap.numChildren() - lastTotal > 0) {
                        notifyCount[index].notif = snap.numChildren() - lastTotal
                    }
                }
                notifCount[index].lastKnownTotal = snap.numChildren()
            } else {
                notifCount.push({
                    id: channelId, 
                    total: snap.numChildren(),
                    lastKnownTotal: snap.numChildren(),
                    notify: 0
                })
            }
        }
    }
}