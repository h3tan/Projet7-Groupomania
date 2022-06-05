<template>
  <div class="infos">
    <h2>{{ nickname }}</h2>
    <h3 id="privilege">{{ privilege }}</h3>
    <UserButton
      @click="goToSignUp"
      buttonClass="logoutButton"
      buttonText="Supprimer ce compte"
    />
    <div class="avatar_section">
      <div class="avatar_box">
        <UserAvatar :avatar="`${picture}`" />
      </div>
      <form class="modify_avatar" v-on:submit.prevent="modifyProfilePicture">
        <label id="label_avatar" for="input_avatar">Choisir</label>
        <input
          type="file"
          id="input_avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          @change="handleFileUpload($event)"
        />
        <div class="picture_chosen" v-if="pictureChosen">
          <div id="image_name">{{ image_name }}</div>
          <div id="image_type">{{ image_type }}</div>
        </div>
        <div class="profile_buttons">
          <button v-if="pictureChosen">Modifier l'image</button>
          <button @click="cancelPictureChosen" v-if="pictureChosen">
            Annuler
          </button>
        </div>
      </form>
    </div>
    <div class="user_infos">
      <div class="email">
        <h4>E-mail</h4>
        <p>{{ email }}</p>
      </div>
      <form id="change_user_infos" v-on:submit.prevent="changeUserInfos" :key="profileChanged">
      <h4>Modifier vos informations</h4>
        <label for="last_name">Nom</label>
        <input
          @input="isLastNameValid(this.last_name, 'last_name')"
          class="input_form"
          id="last_name"
          type="last_name"
          v-model="last_name"
        />
        <label for="first_name">Prénom</label>
        <input
          @input="isFirstNameValid(this.first_name, 'first_name')"
          class="input_form"
          id="first_name"
          type="first_name"
          v-model="first_name"
        />
        <div class="modify_button">
          <UserButton
            id="modify_user_infos"
            buttonClass="formButton"
            buttonText="Modifier"
            disabled
          />
        </div>
      </form>
      <ModifyPassword />
    </div>
  </div>
</template>

<script>
import { requestUserInfos } from "../functions/fetchUser.js";
import { sendProfilePictureToAPI } from "../functions/fetchUser.js";
import { isNicknameValid } from "../functions/formCheck.js";
import { isPasswordValid } from "../functions/formCheck.js";
import { isFirstNameValid } from "../functions/formCheck.js";
import { isLastNameValid } from "../functions/formCheck.js";
import { isEmailValid } from "../functions/formCheck.js";
import { requestUpdateUserFromAPI } from "@/functions/fetchUser.js";
import { requestDeleteUserFromAPI } from "@/functions/fetchUser.js";
import UserAvatar from "@/components/UserAvatar";
import UserButton from "@/components/UserButton";
import ModifyPassword from "@/components/ModifyPassword";
//require('../assets/No-Image.png')

export default {
  name: "UserInfos",
  components: {
    UserAvatar,
    UserButton,
    ModifyPassword,
  },
  data() {
    return {
      image_name: "nom image",
      image_type: "type image",
      picture_upload: "",
      pictureChosen: false,
      nickname: "",
      last_name: "",
      first_name: "",
      email: "",
      privilege: "",
      picture: "",
      profileChanged: 0
    };
  },
  methods: {
    isNicknameValid,
    isLastNameValid,
    isFirstNameValid,
    isEmailValid,
    isPasswordValid,
    sendProfilePictureToAPI,
    requestUpdateUserFromAPI,
    requestDeleteUserFromAPI,
    async goToSignUp() {
      let result = await requestDeleteUserFromAPI(
        localStorage.getItem("userId")
      );
      localStorage.clear();
      this.$store.dispatch("changeLogState");
      this.$router.push("/signup");
      return result;
    },
    // Récupération des informations d'image pour changer un avatar
    handleFileUpload(e) {
      this.pictureChosen = false;
      if (e.target.files[0]) {
        this.image_name = e.target.files[0].name;
        this.image_type = e.target.files[0].type;
        this.picture_upload = e.target.files[0];
        this.pictureChosen = true;
      }
    },
    // Initialisation des informations de l'utilisateur connecté
    async assignUserInfos() {
      let userInfos = await requestUserInfos(localStorage.getItem("userId"));
      this.nickname = userInfos.nickname;
      this.last_name = userInfos.last_name;
      this.first_name = userInfos.first_name;
      this.email = userInfos.email;
      this.privilege = userInfos.privilege;
      this.picture = userInfos.picture ? userInfos.picture : this.picture;
      if (this.privilege == "normal") {
        this.privilege = "Membre";
        document.getElementById("privilege").style.color = "green";
        return;
      }
      if (this.privilege == "admin") {
        this.privilege = "Modérateur";
        document.getElementById("privilege").style.color = "#FD2D01";
      }
    },
    // Met à jour la page lorsque l'avatar est modifié
    async modifyProfilePicture() {
      let reponse = await sendProfilePictureToAPI(
        localStorage.getItem("userId"),
        this.picture_upload,
        this.picture
      );
      if (!reponse.error) {
        localStorage.setItem("avatar", reponse.imageUrl);
        this.cancelPictureChosen();
        this.assignUserInfos();
        this.$emit("sendUpdateAvatarToView");
      }
    },
    cancelPictureChosen() {
      this.pictureChosen = false;
    },
    async changeUserInfos() {
      this.profileChanged = 0;
      let reponse = await requestUpdateUserFromAPI(
        localStorage.getItem("userId"),
        this.last_name,
        this.first_name
      );
      if (!reponse.error) {
        this.profileChanged = 1;
        this.assignUserInfos();
      }
      return reponse;
    },
  },
  created() {
    this.assignUserInfos();
  },
};
</script>

<style scoped lang="scss">
.infos {
  margin: auto;
  border: 1px solid #FD2D01;
  border-radius: 20px;
  width: 95%;
}

.avatar_section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.avatar_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 20px;
  border: 1px solid #FD2D01;
  margin-bottom: 20px;
}
.avatar_container {
  overflow: hidden;
  border-radius: 10%;
  width: 120px;
  height: 120px;
}
.modify_avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
}
#input_avatar {
  display: none;
}
#label_avatar {
  display: inline-block;
  margin-bottom: 11px;
  padding: 0px 23px 0px;
  border: 1px solid;
  border-radius: 4px;
  line-height: 25px;
  font-weight: 400;
  cursor: pointer;
}
.img_container {
  margin: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  overflow: hidden;
  border: 1px solid #FD2D01;
  border-radius: 15px;
  width: 40%;
  height: 40%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
  }
}
.picture_chosen {
  display: flex;
  width: 250px;
  height: 30px;
  align-items: center;
  justify-content: space-around;
  border: 1px solid grey;
  margin-bottom: 10px;
}
#image_name {
  overflow: hidden;
  padding-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#image_type {
  border-left: 1px solid grey;
  padding-left: 15px;
  padding-right: 15px;
}
.profile_buttons {
  display: flex;
  justify-content: space-around;
  width: 200px;
}
.user_infos {
  width: 95%;
  margin: auto;
}
.email {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
  margin-bottom: 20px;
  row-gap: 10px;
  padding-left: 20px;
  font-style: italic;
  h4 {
    margin: 0;
  }
  p {
    margin: 0;
  }
}
#change_user_infos {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 15px;
}
#nickname,
#last_name,
#first_name,
#email {
  width: 95%;
  height: 30px;
  margin-top: 3px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.modify_button {
  width: 90%;
  margin: auto;
  margin: 20px;
}
#modify_user_infos {
  margin: auto;
}
</style>
