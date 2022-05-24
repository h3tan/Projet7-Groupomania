<template>
  <div class="login">
    <h2>Veuillez vous connecter</h2>
    <form id="login" v-on:submit.prevent="logIn">
      <label for="nickname">Nom d'utilisateur</label>
      <input
        @input="isNicknameValid(this.nickname)"
        id="nickname"
        type="text"
        v-model="nickname"
      />
      <div class="password_box">
        <label for="password">Mot de passe</label>
        <input
          @input="isPasswordValid(this.password)"
          id="password"
          type="password"
          v-model="password"
        />
        <div id="show_password" @click="toggleShowPassword">
          <i class="fas fa-eye-slash" v-if="!password_showed"></i>
          <i class="fas fa-eye" v-if="password_showed"></i>
        </div>
      </div>
      <div class="submitForm">
        <UserButton
          v-if="!isLogged"
          buttonClass="formButton"
          buttonText="Se Connecter"
          disabled
        />
        <p class="logged" v-if="isLogged">Connecté</p>
        <p class="errorLog" v-show="showErrorLogin">{{ errorLogin }}</p>
      </div>
    </form>
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
      isLogged: "",
      showErrorLogin: "",
      errorLogin: "",
      password_showed: false,
    };
  },
  components: {
    UserButton,
  },
  methods: {
    isNicknameValid,
    isPasswordValid,
    sendLoginForm,
    userLogged,
    toggleShowPassword() {
      if (!this.password_showed) {
        this.password_showed = true;
        document.getElementById("password").setAttribute("type", "text");
      } else {
        this.password_showed = false;
        document.getElementById("password").setAttribute("type", "password");
      }
    },
    async logIn() {
      let reponse = await sendLoginForm(this.nickname, this.password);
      if (!reponse.error) {
        localStorage.clear();
        localStorage.setItem("userId", reponse.userId);
        localStorage.setItem("token", `BEARER ${reponse.token}`);
        localStorage.setItem("nickname", this.nickname);
        this.showErrorLogin = false;
        this.isLogged = true;
        setTimeout(() => {
          this.$router.push(`/whatsnew/`);
        }, 1000);
      } else {
        this.showErrorLogin = true;
        this.errorLogin = reponse.error;
        return;
      }
      return reponse;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  margin-top: 40px;
}
.password_box {
  position: relative;
}
#show_password {
  font-size: 25px;
  position: absolute;
  right: 25px;
  width: 30px;
  bottom: 27px;
}
i {
  position: absolute;
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
.logged {
  color: green;
  position: absolute;
  left: 145px;
  margin-top: 45px;
  font-weight: bold;
  font-size: 20px;
}

.errorLog {
  margin-top: 40px;
}

button {
  margin-top: 40px;
}

#loginresult {
  margin-top: 40px;
  font-size: 20px;
  color: red;
}
</style>
