<template>
  <div id="login">
    <div class="title">
      <img alt="Groupomania logo" src="../assets/Groupomania-logo-red.png" />
      <h1>Réseau social interne</h1>
    </div>
    <LoginForm />
  </div>
</template>

<script>
// @ is an alias to /src
import { userLogged } from "@/functions/fetchUser.js"
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginFormView",
  components: {
    LoginForm,
  },
  beforeCreate() {
    if (userLogged()) this.$router.push("/whatsnew");
  },
};
</script>

<style lang="scss"></style>
