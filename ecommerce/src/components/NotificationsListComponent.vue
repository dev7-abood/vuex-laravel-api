<template>
    <div class="notifications-list">
        <NotificationMassageComponent v-for="not in notifications" :key="not.id" :notification="not"/>
    </div>
</template>

<script>
    import NotificationMassageComponent from "./NotificationMassageComponent";
    import { mapState } from 'vuex';
    export default {
        name: "NotificationsListComponent",
        components : {
            NotificationMassageComponent
        },
        computed : {
            ...mapState(['notifications'])
        }
    }
</script>

<style scoped>
    .notifications-list {
        position: fixed;
        bottom: 0;
        right: 0;
        margin-right: 15px;
        width: 320px;
}
</style>