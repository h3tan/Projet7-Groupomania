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
      <UserButton
        @click="goToSignUp"
        buttonClass="logoutButton"
        buttonText="Supprimer ce compte"
      />
    </div>
  </div>
</template>

<script>
import UserButton from "@/components/UserButton.vue";
import UserInfos from "@/components/UserInfos.vue";
import { userLogged } from "../functions/fetchUser.js";
import IsLogged from "@/components/IsLogged.vue";
import { requestDeleteUserFromAPI } from "../functions/fetchUser.js";

export default {
  name: "UserInfosView",
  components: {
    UserInfos,
    UserButton,
    IsLogged,
  },
  methods: {
    userLogged,
    requestDeleteUserFromAPI,
    goToLogIn() {
      localStorage.clear();
      this.$router.push("/login");
    },
    async goToSignUp() {
      let result = await requestDeleteUserFromAPI(localStorage.getItem("userId"));
      localStorage.clear();
      this.$router.push("/signup");
      return result;
    }
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
