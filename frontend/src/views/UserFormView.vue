<template>
  <div id="userform">
    <NotLogged />
    <div class="title">
      <img alt="Groupomania logo" src="../assets/Groupomania-logo-red.png" />
      <h1>Réseau social interne</h1>
    </div>
    <LoginForm v-if="$route.path == '/login'" />
    <SignUpForm v-if="$route.path == '/signup'" />
  </div>
</template>

<script>
// @ is an alias to /src
import { userLogged } from "@/functions/fetchUser.js";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";
import NotLogged from "@/components/NotLogged.vue";

export default {
  name: "UserFormView",
  components: {
    LoginForm,
    SignUpForm,
    NotLogged,
  },
  beforeCreate() {
    if (userLogged()) this.$router.push("/whatsnew");
  },
};
</script>

<style lang="scss">
h1 {
  margin-top: 0;
  color: red;
}

button {
  height: 30px;
  width: 100px;
}
img {
  width: 300px;
}
</style>
