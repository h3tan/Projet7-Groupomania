<template>
  <div class="password_container">
    <h4>Modifier votre mot de passe</h4>
    <form class="password_change" v-on:submit.prevent="changePassword">
      <!-- Mot de passe actuel -->
      <div class="password_box">
        <label for="password">Entrez le mot de passe actuel</label>
        <input
          @input="isPasswordChangeValid(this.password, 'password')"
          class="input_password"
          id="password"
          type="password"
          v-model="password"
        />
        <div
          id="show_password"
          class="password_icon"
          @click="toggleShowPassword"
        >
          <i class="fas fa-eye-slash" v-if="!password_showed"></i>
          <i class="fas fa-eye" v-if="password_showed"></i>
        </div>
      </div>
      <!-- Nouveau mot de passe -->
      <div class="password_box">
        <label for="new_password">Entrez votre nouveau mot de passe</label>
        <input
          @input="isPasswordChangeValid(this.new_password, 'new_password')"
          class="input_password"
          id="new_password"
          type="password"
          v-model="new_password"
        />
        <div
          id="show_new_password"
          class="password_icon"
          @click="toggleShowNewPassword"
        >
          <i class="fas fa-eye-slash" v-if="!new_password_showed"></i>
          <i class="fas fa-eye" v-if="new_password_showed"></i>
        </div>
      </div>
      <!-- Confirmation du nouveau mot de passe -->
      <div class="password_box">
        <label for="confirm_new_password"
          >Confirmez votre nouveau mot de passe</label
        >
        <input
          @input="
            isPasswordChangeValid(
              this.confirm_new_password,
              'confirm_new_password'
            )
          "
          class="input_password"
          id="confirm_new_password"
          type="password"
          v-model="confirm_new_password"
        />
        <div
          id="show_confirm_password"
          class="password_icon"
          @click="toggleShowConfirmNewPassword"
        >
          <i class="fas fa-eye-slash" v-if="!confirm_new_password_showed"></i>
          <i class="fas fa-eye" v-if="confirm_new_password_showed"></i>
        </div>
      </div>
      <div class="password_submit">
        <transition name="fadeButton">
          <UserButton
            id="modify_password"
            v-if="!confirm_password_change"
            buttonClass="formButton"
            buttonText="Modifier"
            disabled
          />
        </transition>
        <div class="password_change_result">
          <transition name="successAppear">
            <span class="confirmed" v-if="confirm_password_change"
              >Mot de passe modifié</span
            >
          </transition>
          <transition name="errorAppear">
            <span class="errorPassword" v-if="showErrorPassword">{{
              errorPassword
            }}</span>
          </transition>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import UserButton from "@/components/UserButton";
import { isPasswordChangeValid } from "../functions/formCheck.js";
import { requestUpdatePasswordFromAPI } from "@/functions/fetchUser.js";

export default {
  name: "ModifyComment",
  components: {
    UserButton,
  },
  data() {
    return {
      password: "",
      new_password: "",
      confirm_new_password: "",
      password_showed: "",
      new_password_showed: "",
      confirm_new_password_showed: "",
      confirm_password_change: false,
      showErrorPassword: false,
      errorPassword: "",
    };
  },
  methods: {
    isPasswordChangeValid,
    requestUpdatePasswordFromAPI,
    toggleShowPassword() {
      if (!this.password_showed) {
        this.password_showed = true;
        document.getElementById("password").setAttribute("type", "text");
      } else {
        this.password_showed = false;
        document.getElementById("password").setAttribute("type", "password");
      }
    },
    toggleShowNewPassword() {
      if (!this.new_password_showed) {
        this.new_password_showed = true;
        document.getElementById("new_password").setAttribute("type", "text");
      } else {
        this.new_password_showed = false;
        document
          .getElementById("new_password")
          .setAttribute("type", "password");
      }
    },
    toggleShowConfirmNewPassword() {
      if (!this.confirm_new_password_showed) {
        this.confirm_new_password_showed = true;
        document
          .getElementById("confirm_new_password")
          .setAttribute("type", "text");
      } else {
        this.confirm_new_password_showed = false;
        document
          .getElementById("confirm_new_password")
          .setAttribute("type", "password");
      }
    },
    async changePassword() {
      this.showErrorPassword = false;
      if (this.new_password != this.confirm_new_password) {
        this.showErrorPassword = true;
        this.errorPassword = "Veuillez reconfirmez votre nouveau mot de passe";
        return;
      }
      let reponse = await requestUpdatePasswordFromAPI(
        localStorage.getItem("userId"),
        this.password,
        this.confirm_new_password
      );
      if (!reponse.error) {
        this.confirm_password_change = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
        return;
      }
      this.showErrorPassword = true;
      this.errorPassword = reponse.error;
    },
  },
};
</script>

<style scoped lang="scss">
.password_container {
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 15px;
}
.password_change {
  display: flex;
  position: relative;
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.password_box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    width: 300px;
    height: 30px;
    margin-bottom: 15px;
    border-radius: 5px;
    margin-top: 3px;
  }
}
.password_icon {
  position: absolute;
  right: 32px;
  margin-top: 25px;
  font-size: 20px;
}
.password_submit {
  width: 95%;
  margin-top: 20px;
  margin-bottom: 50px;
  position: relative;
}
#modify_password {
  position: absolute;
  right: 50px;
}
.password_change_result {
  height: 30px;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.confirmed {
  color: green;
  position: absolute;
  right: 48px;
  bottom: 35px;
  font-weight: bold;
  font-size: 20px;
}

.errorPassword {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: red;
  font-size: 20px;
  height: 50px;
  margin-top: 20px;
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
