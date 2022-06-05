<template>
  <div id="user_form">
    <div class="title">
      <h1>Réseau social interne</h1>
    </div>
    <LoginForm v-if="$route.path == '/login' || $route.path == '/login/'" />
    <SignUpForm v-if="$route.path == '/signup' || $route.path == '/signup/'" />
  </div>
</template>

<script>
// @ is an alias to /src
import { userLogged } from "@/functions/fetchUser.js";
import LoginForm from "@/components/LoginForm.vue";
import SignUpForm from "@/components/SignUpForm.vue";

export default {
  name: "UserFormView",
  components: {
    LoginForm,
    SignUpForm,
  },
  beforeCreate() {
    if (userLogged()) this.$router.push("/whatsnew");
  },
};
</script>

<style scoped lang="scss">
#user_form{
  padding-top: 1px;
}
.title {
  margin-top: 20px;
}
h1 {
  margin-top: 0;
  color: #FD2D01;
  font-size: 25px;
}

button {
  height: 30px;
  width: 100px;
}
img {
  width: 200px;
}
</style>
