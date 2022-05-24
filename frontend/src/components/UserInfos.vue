<template>
  <div class="infos">
    <div class="img_container">
      <img :src="picture" />
    </div>
    <form class="modify_avatar">
      <label id="label_avatar" for="input_avatar">Choisir</label>
      <input
        type="file"
        id="input_avatar"
        name="avatar"
        accept="image/png, image/jpeg"
        @change="handleFileUpload($event)"
      />
      <div class="picture_choosen" v-if="pictureChosen">
        <div id="image_name">{{ image_name }}</div>
        <div id="image_type">{{ image_type }}</div>
      </div>
      <div class="profile_buttons">
        <button @click="modifyProfilePicture" v-if="pictureChosen">
          Modifier l'image
        </button>
        <button @click="cancelProfilePictureChosen" v-if="pictureChosen">
          Annuler
        </button>
      </div>
    </form>
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

export default {
  name: "UserInfos",
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
    handleFileUpload(e) {
      if (e.target.files[0]) {
        this.image_name = e.target.files[0].name;
        this.image_type = e.target.files[0].type;
        this.picture_upload = e.target.files[0];
        this.pictureChosen = true;
      }
    },
    async assignUserInfos() {
      let reponse = await requestUserInfos(localStorage.getItem("userId"));
      this.nickname = reponse[0].nickname;
      this.email = reponse[0].email;
      this.privilege = reponse[0].privilege;
      this.picture = reponse[0].picture ? reponse[0].picture : this.picture;
    },
    async modifyProfilePicture() {
      let reponse = await sendProfilePictureToAPI(
        localStorage.getItem("userId"),
        this.picture_upload,
        this.picture
      );
      if (!reponse.error) {
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

<style lang="scss">
.infos {
  text-align: start;
  margin-top: 20px;
  border: 1px solid red;
  border-radius: 20px;
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
.picture_choosen {
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
}
</style>
