<template>
  <div id="user_box">
    <div id="user_infos">
      <h1>Vos Informations</h1>

      <UserInfos />
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
