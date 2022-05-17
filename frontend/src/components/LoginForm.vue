<template>
  <div class="login">
    <h2>{{ msg }}</h2>
    <form id="login" v-on:submit.prevent="goToUserInfos">
      <label for="nickname">Nom d'utilisateur</label>
      <input
        onfocus="this.value=''"
        @input="isNicknameValid(this.nickname)"
        id="nickname"
        type="text"
        v-model="nickname"
      />
      <label for="password">Mot de passe</label>
      <input
        onfocus="this.value=''"
        @input="isPasswordValid(this.password)"
        id="password"
        type="password"
        v-model="password"
      />
      <UserButton class="formButton" buttonName="Se Connecter" disabled />
    </form>
    <p id="loginresult"></p>
  </div>
</template>

<script>
import UserButton from "./UserButton.vue";
import { isNicknameValid } from "../functions/formCheck.js";
import { isPasswordValid } from "../functions/formCheck.js";
import { sendLoginForm } from "../functions/fetchUser.js";
import { userLogged } from "../functions/fetchUser.js";

export default {
  name: "LoginForm",
  data() {
    return {
      nickname: "",
      password: "",
    };
  },
  components: {
    UserButton,
  },
  props: {
    msg: String,
  },
  methods: {
    isNicknameValid,
    isPasswordValid,
    sendLoginForm,
    userLogged,
    async goToUserInfos() {
      let reponse = await sendLoginForm(this.nickname, this.password);
      if (!reponse.error) {
        setTimeout(() => this.$router.push("/userinfos"), 2000);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  margin-top: 40px;
}

h2 {
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;

  &::after {
    background-color: lightgrey;
    content: "";
    display: block;
    height: 1px;
    margin-top: 2px;
    width: 100%;
  }
}

#login {
  width: 90%;
  margin: auto;
}

label {
  display: flex;
  margin-top: 20px;
  margin-bottom: 2px;
  font-weight: bold;
  font-size: 17px;
}

input {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 30px;
  padding-left: 5px;

  &:focus {
    background-color: lightblue;
  }
}

#loginresult {
  margin-top: 40px;
  font-size: 20px;
  color: red;
}
</style>
