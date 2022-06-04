<template>
  <div id="user_box">
    <div id="user_infos">
      <h1>Votre profil</h1>
      <UserInfos @sendUpdateAvatarToView='sendUpdateAvatarToApp'/>
    </div>
  </div>
</template>

<script>
import UserInfos from "@/components/UserInfos.vue";

export default {
  name: "UserInfosView",
  components: {
    UserInfos,
  },
  methods: {
    sendUpdateAvatarToApp() {
      this.$emit('modifyAvatar');
    }
  },
};
</script>

<style scoped lang="scss">
#user_box {
  padding-bottom: 30px;
}
#user_infos {
  margin-top: 10%;
}
</style>
