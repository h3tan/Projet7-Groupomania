<template >
  <div i="signup">
    <div class="title">
      <img alt="Groupomania logo" src="../assets/Groupomania-logo-red.png" />
      <h1>Réseau social interne</h1>
    </div>
    <SignUpForm />
  </div>
</template>

<script>
// @ is an alias to /src
import { userLogged } from "@/functions/fetchUser.js";
import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "SignUpFormView",
  components: {
    SignUpForm,
  },
    beforeCreate() {
    if (userLogged()) this.$router.push("/whatsnew");
  },
};
</script>

<style lang="scss"></style>
