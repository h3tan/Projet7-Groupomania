<template>
  <div id="user_box">
    <isLogged />
    <div id="userinfos">
      <h1>Vos Informations</h1>
      <UserInfos />
      <UserButton
        @click="goToLogIn"
        buttonClass="logoutButton"
        buttonText="Se Déconnecter"
      />
    </div>
  </div>
</template>

<script>
import UserButton from "@/components/UserButton.vue";
import UserInfos from "@/components/UserInfos.vue";
import { userLogOut } from "../functions/fetchUser.js";
import { userLogged } from "../functions/fetchUser.js";
import IsLogged from "@/components/IsLogged.vue";

export default {
  name: "UserInfosView",
  components: {
    UserInfos,
    UserButton,
    IsLogged
  },
  methods: {
    userLogOut,
    userLogged,
    goToLogIn() {
      if (userLogOut()) this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="scss">
#userinfos {
  margin-top: 10%;
}

button {
  margin-top: 40px;
}
</style>
