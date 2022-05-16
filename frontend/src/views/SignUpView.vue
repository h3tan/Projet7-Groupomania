<template>
  <div id="signupbox">
    <div class="title">
      <img alt="Groupomania logo" src="../assets/Groupomania-logo-red.png" />
      <h1>Réseau social interne</h1>
    </div>
    <Signup msg="Veuillez créer un compte" />
  </div>
</template>

<script>
// @ is an alias to /src
import Signup from "@/components/SignUp.vue";

export default {
  name: "SignUpView",
  components: {
    Signup,
  },
};
</script>

<style lang="scss"></style>
