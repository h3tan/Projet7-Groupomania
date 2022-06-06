<template>
  <div id="post_card" :data-id_post="id_post" :data-id_user="post_id_user">
    <div class="posted">
      <div class="posted__by_user">
        <UserAvatar :avatar="`${post_user_picture}`" />
        <h2 id="nickname">{{ post_user_nickname }}</h2>
      </div>
      <div class="post_date_created">
        <span>{{ post_date_created }}</span>
        <span>{{ post_time_created }}</span>
      </div>
    </div>
    <div class="post_body">
      <div class="post_body__picture" v-if="post_image != null">
        <img alt="Image posté par l'utilisateur" :src="post_image" />
      </div>
      <!-- Changement de l'image du post -->
      <div id="add_file" v-if="sameUser || privilege == 'admin'">
        <label id="label_file" for="input_file" v-if="sameUser">{{
          type_of_add
        }}</label>
        <input
          type="file"
          id="input_file"
          name="file"
          accept="image/png, image/jpeg, image/gif"
          @change="handleFileUpload($event)"
          v-if="sameUser"
        />
        <button
          @click="modifyPostPicture('delete')"
          v-if="
            !fileChosen &&
            post_image != null &&
            (sameUser || privilege == 'admin')
          "
        >
          Supprimez l'image
        </button>
        <div class="picture_chosen" v-if="fileChosen">
          <div id="image_name">{{ file_name }}</div>
          <div id="image_type">{{ file_type }}</div>
        </div>
        <div class="picture_buttons">
          <button @click="modifyPostPicture('modify')" v-if="fileChosen">
            {{ confirm_add }}
          </button>
          <button @click="cancelFileChosen" v-if="fileChosen">Annuler</button>
        </div>
      </div>
      <div class="post_body__text_container">
        <p>{{ post_text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";
import { requestModifyPostPictureToAPI } from "@/functions/fetchPost";

export default {
  name: "PostCard",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      privilege: localStorage.getItem("privilege"),
      sameUser: "",
      fileChosen: false,
      file_name: "",
      file_type: "",
      file_upload: "",
      type_of_add: "Ajouter une image",
      confirm_add: "Ajouter",
      requestedUserliked: "",
      requestedNumLikes: "",
    };
  },
  props: [
    "id_post",
    "post_id_user",
    "post_user_picture",
    "post_title",
    "post_image",
    "post_text",
    "post_user_nickname",
    "post_date_created",
    "post_time_created",
  ],
  components: {
    UserAvatar,
  },
  methods: {
    handleFileUpload(e) {
      this.fileChosen = false;
      if (e.target.files[0]) {
        this.file_name = e.target.files[0].name;
        this.file_type = e.target.files[0].type;
        this.file_upload = e.target.files[0];
        this.fileChosen = true;
      }
    },
    cancelFileChosen() {
      this.fileChosen = false;
    },
    async modifyPostPicture(request) {
      if (request == "delete") {
        this.file_upload = "";
      }
      let reponse = await requestModifyPostPictureToAPI(
        this.id_post,
        this.file_upload,
        this.post_image
      );
      if (!reponse.error) {
        if (!reponse.imageUrl) {
          this.pictureExists = false;
          this.type_of_add = "Ajouter une image";
          this.confirm_add = "Ajouter";
        }
        this.fileChosen = false;
        this.assignPostInformations();
      }
    },
  },
  created() {
    if (this.post_id_user == this.userId) {
      this.sameUser = true;
    }
  },
};
</script>

<style scoped lang="scss">
#post_card {
  background-color: white;
  border: 2px solid #fd2d01;
  border-radius: 10px;
}
.post_date_created {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 3px;
}
#add_file {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
}
#input_file {
  display: none;
}
#label_file {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 11px;
  border: 1px solid;
  border-radius: 4px;
  margin-top: 20px;
  font-weight: 400;
  width: 170px;
  cursor: pointer;
  height: 30px;
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
.picture_buttons {
  display: flex;
  column-gap: 10px;
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
.title_container {
  padding-top: 5px;
  padding-bottom: 5px;
}
h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-top: 0;
  margin-bottom: 0;
}
.posted {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #fd2d01;
  padding-left: 5px;
  padding-right: 10px;
  height: 60px;

  &__by_user {
    display: flex;
    height: 100%;
    align-items: center;
  }
}
#nickname {
  font-weight: lighter;
  margin-left: 5px;
  margin-top: 0;
  margin-bottom: 0;
}
.avatar_container {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
h3 {
  font-size: 16px;
}
.post_body {
  &__picture {
    margin: auto;
    margin-top: 30px;
    max-width: 80%;
    border-radius: 5px;
    overflow: hidden;
    padding: 5px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      object-fit: cover;
    }
  }
  &__text_container {
    overflow-wrap: break-word;
    text-align: left;
    padding: 10px;
  }
}
label {
  width: 80%;
  text-align: start;
}
h4 {
  margin-top: 20px;
  margin-bottom: 5px;
}
</style>
