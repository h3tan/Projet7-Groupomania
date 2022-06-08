<template>
  <div class="signup">
    <h2>Veuillez créer un compte</h2>
    <form id="signup" v-on:submit.prevent="goToLogin">
      <label for="nickname">Pseudo</label>
      <input
        @input="isNicknameValid(this.nickname, 'nickname')"
        class="input_form"
        id="nickname"
        type="text"
        v-model="nickname"
      />
      <label for="last_name">Nom</label>
      <input
        @input="isLastNameValid(this.last_name, 'last_name')"
        class="input_form"
        id="last_name"
        type="text"
        v-model="last_name"
      />
      <label for="first_name">Prénom</label>
      <input
        @input="isFirstNameValid(this.first_name, 'first_name')"
        class="input_form"
        id="first_name"
        type="text"
        v-model="first_name"
      />
      <label for="email">E-Mail</label>
      <input
        @input="isEmailValid(this.email, 'email')"
        class="input_form"
        id="email"
        type="email"
        v-model="email"
      />
      <div class="password_box">
        <label for="password">Mot de passe</label>
        <input
          @input="isPasswordValid(this.password, 'password')"
          class="input_form"
          id="password"
          type="password"
          v-model="password"
        />
        <div id="show_password" @click="toggleShowPassword">
          <i class="fas fa-eye-slash" v-if="!password_showed"></i>
          <i class="fas fa-eye" v-if="password_showed"></i>
        </div>
      </div>
      <p id="password_infos">
        Comporte 10 caractères, 1 minuscule, 1 majuscule, 1 chiffre et un
        caractère spécial
      </p>
      <div class="submitForm">
        <transition name="fadeButton">
          <UserButton
            v-if="!confirmSignup"
            buttonClass="formButton"
            buttonText="Valider"
            disabled
          />
        </transition>
        <div class="signup_result">
          <transition name="successAppear">
            <span class="signed" v-if="confirmSignup">
              <p>Création du compte réussie</p>
              <p>Veuillez vous connecter avec vos identifiants</p>
            </span>
          </transition>
          <transition name="errorAppear">
            <span class="errorSign" v-if="showErrorSignup">{{
              errorSignup
            }}</span>
          </transition>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import UserButton from "./UserButton.vue";
import { isNicknameValid } from "../functions/formCheck.js";
import { isPasswordValid } from "../functions/formCheck.js";
import { isFirstNameValid } from "../functions/formCheck.js";
import { isLastNameValid } from "../functions/formCheck.js";
import { isEmailValid } from "../functions/formCheck.js";
import { sendSignUpForm } from "../functions/fetchUser.js";

export default {
  name: "SignUpForm",
  data() {
    return {
      nickname: "",
      last_name: "",
      first_name: "",
      email: "",
      password: "",
      confirmSignup: false,
      showErrorSignup: false,
      errorSignup: "Placeholder",
      password_showed: false,
    };
  },
  components: {
    UserButton,
  },
  methods: {
    isNicknameValid,
    isLastNameValid,
    isFirstNameValid,
    isEmailValid,
    isPasswordValid,
    sendSignUpForm,
    toggleShowPassword() {
      if (!this.password_showed) {
        this.password_showed = true;
        document.getElementById("password").setAttribute("type", "text");
      } else {
        this.password_showed = false;
        document.getElementById("password").setAttribute("type", "password");
      }
    },
    async goToLogin() {
      this.showErrorSignup = false;
      let reponse = await sendSignUpForm(
        this.nickname,
        this.last_name,
        this.first_name,
        this.email,
        this.password
      );
      if (!reponse.error) {
        this.showErrorSignup = false;
        this.confirmSignup = true;
        setTimeout(() => {
          this.$router.push(`/login`);
        }, 2000);
        return;
      }
      this.showErrorSignup = true;
      this.errorSignup = reponse.error;
      return;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup {
  margin-top: 40px;
}
.password_box {
  position: relative;
}
#show_password {
  font-size: 20px;
  position: absolute;
  right: 20px;
  width: 30px;
  bottom: 24px;
}
#password_infos {
  text-align: left;
  margin: 0;
  margin-top: 5px;
}
i {
  position: absolute;
}
h2 {
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
  width: 94%;
  margin: auto;

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

.submit_form {
  position: relative;
  width: 80%;
  margin: auto;
  height: 50px;
}

button {
  margin-top: 40px;
}

.signup_result {
  height: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 40px;
}
.signed {
  color: green;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 45px;
  width: 300px;
  height: 100px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0;
  }
}

.errorSign {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #fd2d01;
  font-size: 20px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0px;
}

.successAppear-enter-active,
.successAppear-leave-active {
  transition: all 0.5s;
  transition-delay: 0.5s;
}
.successAppear-enter-from {
  opacity: 0;
}

.errorAppear-enter-active,
.errorAppear-leave-active {
  transition: all 0.5s;
}
.errorAppear-enter-from {
  opacity: 0;
}

.fadeButton-enter-active,
.fadeButton-leave-active {
  transition: all 0.5s;
}
.fadeButton-leave-to {
  opacity: 0;
}
</style>
