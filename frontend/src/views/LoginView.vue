<template>
  <div id="loginbox">
    <div class="title">
      <img alt="Groupomania logo" src="../assets/Groupomania-logo-red.png" />
      <h1>Réseau social interne</h1>
    </div>
    <Login msg="Veuillez vous connecter" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/LogIn.vue";

export default {
  name: "LoginView",
  components: {
    Login,
  },
};
</script>

<style lang="scss"></style>
