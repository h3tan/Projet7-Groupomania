<template v-if="isLogged == true">
  <div id="userinfos">
    <h1>Vos Informations</h1>
    <UserInfos />
  </div>
</template>

<script>
import UserInfos from '@/components/UserInfos.vue'

export default {
  name: 'UserInfosView',
  components: {
    UserInfos
  }
}
</script>

<style lang="scss">
#userinfos {
  margin-top: 10%;
}
</style>