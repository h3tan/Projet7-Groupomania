<template>
    <LoginForm msg="Veuillez vous connecter" />
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginFormView",
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss"></style>
