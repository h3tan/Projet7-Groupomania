<template>
  <div class="signup">
    <h2>{{ msg }}</h2>
    <form id="signup" v-on:submit.prevent="sendSignUpForm(this.nickname, this.email, this.password)">
      <label for="nickname">Nom d'utilisateur</label>
      <input
        onfocus="this.value=''"
        @input="isNicknameValid(this.nickname)"
        id="nickname"
        type="text"
        v-model="nickname"
      />
      <label for="email">E-Mail</label>
      <input
        onfocus="this.value=''"
        @input="isEmailValid(this.email)"
        id="email"
        type="email"
        v-model="email"
      />
      <label for="password">Mot de passe</label>
      <input
        onfocus="this.value=''"
        @input="isPasswordValid(this.password)"
        id="password"
        type="password"
        v-model="password"
      />
      <UserButton class="formButton"
        buttonName="Créer un compte"
        disabled
      />
    </form>
    <p id="signupresult"></p>
  </div>
</template>

<script>
import UserButton from "./UserButton.vue";
import { isNicknameValid } from "../functions/formCheck.js";
import { isPasswordValid } from "../functions/formCheck.js";
import { isEmailValid } from "../functions/formCheck.js";
import { sendSignUpForm } from "../functions/fetchUser.js";
import { userLogged } from "../functions/fetchUser.js";

export default {
  name: "SignUpForm",
  data() {
    return {
      nickname: "",
      email: "",
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
    isEmailValid,
    isPasswordValid,
    sendSignUpForm,
    userLogged
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup {
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

#signup {
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
    color: black;
  }
}

#signupresult {
  margin-top: 20px;
  font-size: 20px;
  color: red;
}
</style>
