<template v-if="isLogged == true">
  <div id="userinfos">
    <h1>Vos Informations</h1>
    <UserInfos />
    <UserButton
      @click="goToLogIn"
      buttonClass="logoutButton"
      buttonText="Se Déconnecter"
    />
  </div>
</template>

<script>
import UserButton from "@/components/UserButton.vue";
import UserInfos from "@/components/UserInfos.vue";
import { userLogOut } from "../functions/fetchUser.js";
import { userLogged } from "../functions/fetchUser.js";

export default {
  name: "UserInfosView",
  components: {
    UserInfos,
    UserButton
  },
  methods: {
    userLogOut,
    userLogged,
    goToLogIn() {
      document.getElementById("loginSign").style.display = "block";
      document.getElementById("logged").style.display = "none";
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
