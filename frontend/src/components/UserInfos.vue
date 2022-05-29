<template>
  <div class="infos">
    <div class="avatar_section">
      <div class="avatar_box">
        <UserAvatar :avatar="`${picture}`" />
      </div>
      <form class="modify_avatar" @click="cancelProfilePictureChosen">
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
          <button @click="modifyProfilePicture" v-if="pictureChosen">
            Modifier l'image
          </button>
          <button @click="cancelProfilePictureChosen" v-if="pictureChosen">Annuler</button>
        </div>
      </form>
    </div>
    <div class="user_infos">
      <h3>
        Pseudo: <span>{{ nickname }}</span>
      </h3>
      <h3>
        E-mail: <span>{{ email }}</span>
      </h3>
      <h3>
        Privilège: <span>{{ privilege }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
import { requestUserInfos } from "../functions/fetchUser.js";
import { sendProfilePictureToAPI } from "../functions/fetchUser.js";
import UserAvatar from "@/components/UserAvatar";
//require('../assets/No-Image.png')

export default {
  name: "UserInfos",
  components: {
    UserAvatar,
  },
  data() {
    return {
      image_name: "nom image",
      image_type: "type image",
      picture_upload: "",
      pictureChosen: false,
      nickname: "",
      email: "",
      privilege: "",
      picture: "",
    };
  },
  methods: {
    sendProfilePictureToAPI,
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
      let reponse = await requestUserInfos(localStorage.getItem("userId"));
      this.nickname = localStorage.getItem("nickname");
      this.email = reponse[0].email;
      this.privilege = reponse[0].privilege;
      this.picture = reponse[0].picture ? reponse[0].picture : this.picture;
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
        location.reload();
      }
    },
    cancelProfilePictureChosen() {
      this.pictureChosen = false;
    },
  },
  created() {
    this.assignUserInfos();
  },
};
</script>

<style scoped lang="scss">
.infos {
  margin-top: 20px;
  border: 1px solid red;
  border-radius: 20px;
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
  border: 1px solid red;
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
  border: 1px solid red;
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
  padding-left: 10px;
  text-align: start;
}
</style>
