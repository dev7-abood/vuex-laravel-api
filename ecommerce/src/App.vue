<template>
  <div id="app">
    <HeaderComponent/>
    <div class="container">
      <router-view/>
    </div>
    <notifications-list-component/>
  </div>
</template>

<style lang="scss">

</style>
<script>
  import HeaderComponent from "./components/HeaderComponent";
  import NotificationsListComponent from "./components/NotificationsListComponent";
  export default {
      name : 'App',
      components : {
        HeaderComponent,
        NotificationsListComponent
      }
  }
</script>