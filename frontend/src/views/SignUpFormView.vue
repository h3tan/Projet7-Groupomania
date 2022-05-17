<template>
  <SignUpForm msg="Veuillez créer un compte" />
</template>

<script>
// @ is an alias to /src
import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "SignUpFormView",
  components: {
    SignUpForm,
  },
};
</script>

<style lang="scss"></style>
