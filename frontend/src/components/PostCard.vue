<template>
  <div id="post_section">
    <div class="title_container">
      <h1>{{ post_title }}</h1>
    </div>
    <div id="post_card" :data-id_post="id_post">
      <div class="post_informations">
        <div class="posted">
          <div class="posted__by_user">
            <UserAvatar :avatar="`${post_pictureUser}`" />
            <h2 id="nickname">{{ post_nickname }}</h2>
          </div>
          <span>{{ post_date_created }}</span>
        </div>
        <div class="post_body">
          <div class="post_body__picture" v-if="pictureExists">
            <img alt="Image posté par l'utilisateur" :src="`${post_image}`" />
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
                pictureExists &&
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
              <button @click="cancelFileChosen" v-if="fileChosen">
                Annuler
              </button>
            </div>
          </div>
          <div class="post_body__text_container">
            <p>{{ post_text }}</p>
          </div>
        </div>
      </div>
      <!-- Modifier un post -->
      <div class="input_container">
        <transition name="appear">
          <div class="input_box" v-if="input_container">
            <!-- Affichage de la zone pour modifier un post -->
            <label for="modify_title"><h4>Modifier le titre</h4></label>
            <input
              class="modify_title"
              name="modify_title"
              v-model="modify_title"
            />
            <label for="input_area"><h4>Modifier le texte</h4></label>
            <textarea
              class="input_area"
              name="input_area"
              v-model="modify_text"
            ></textarea>
            <button @click="updatePost">Modifier</button>
          </div>
        </transition>
      </div>
      <div class="show_interaction">
        <LikeSection
          :user="sameUser"
          :liked="requestedUserliked"
          :num_likes="requestedNumLikes"
          @likeUpdated="updateInfos"
        />
        <div class="show_interaction_buttons">
          <button id="modify_button" @click="toggleModifyPost" v-if="sameUser">
            {{ modifyButton }}
          </button>
          <button
            id="moderation_button"
            @click="toggleModifyPost"
            v-if="privilege == 'admin'"
          >
            {{ modifyButton }}
          </button>
          <button @click="deletePost" v-if="privilege == 'admin'">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";
import LikeSection from "@/components/LikeSection";
import { getPostFromAPI } from "@/functions/fetchPost.js";
import { requestUpdatePostFromAPI } from "@/functions/fetchPost.js";
import { requestDeletePostFromAPI } from "@/functions/fetchPost.js";
import { requestModifyPostPictureToAPI } from "@/functions/fetchPost.js";

export default {
  name: "PostCard",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      privilege: localStorage.getItem("privilege"),
      id_post: "",
      post_id_user: "",
      post_pictureUser: "",
      post_title: "",
      post_image: "",
      post_text: "",
      post_nickname: "",
      post_date_created: "",
      modify_title: "",
      modify_text: "",
      modifyButton: "Modifier",
      input_container: false,
      pictureExists: false,
      sameUser: false,
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
  components: {
    UserAvatar,
    LikeSection,
  },
  methods: {
    getPostFromAPI,
    requestDeletePostFromAPI,
    requestUpdatePostFromAPI,
    // Demande à l'API de supprimer le post dans la base de données
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
    async deletePost() {
      let result = await requestDeletePostFromAPI(this.$route.params.id);
      this.$router.push("/whatsnew");
      return result;
    },
    // Récupère les informations du post de l'API pour les afficher
    async assignPostInformations() {
      let post = await getPostFromAPI(this.$route.params.id);
      if (post.post_picture) {
        this.pictureExists = true;
        this.type_of_add = "Modifier";
        this.confirm_add = "Modifier";
      }
      if (!post.error) {
        this.requestedNumLikes = post.numLikes;
        this.requestedUserliked = post.isLiked;
        this.id_post = post.id_post;
        this.post_id_user = post.id_user;
        if (post.id_user == this.userId) {
          this.post_nickname = "Vous";
        } else {
          this.post_nickname = post.nickname;
        }
        this.post_title = post.title;
        this.post_pictureUser = post.picture;
        this.post_image = post.image;
        this.post_text = post.post_text;
        this.modify_title = this.post_title;
        this.modify_text = this.post_text;
        let dateSQL = post.date_created.split("T");
        let dateFr = new Date(dateSQL[0]);
        this.post_date_created = dateFr.toLocaleDateString("fr");
        if (parseInt(this.userId) == parseInt(this.post_userId)) {
          this.sameUser = true;
          return;
        }
      }
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
    // Prépare le post pour l'envoyer à l'API puis redirige vers whatsnew
    async updatePost() {
      //this.modify_title = this.modify_title.replace(/'/g, "''");
      //this.modify_text = this.modify_text.replace(/'/g, "''");
      let reponse = await requestUpdatePostFromAPI(
        this.$route.params.id,
        this.modify_title,
        this.modify_text
      );
      this.assignPostInformations();
      this.input_container = false;
      if (this.privilege == "admin") {
        this.modifyButton = "Modérer";
        return;
      }
      this.modifyButton = "Modifier";
      return reponse;
    },
    toggleModifyPost() {
      if (this.modifyButton == "Annuler") {
        this.input_container = false;
        if (this.privilege == "admin") {
          this.modifyButton = "Modérer";
          return;
        }
        this.modifyButton = "Modifier";
      } else {
        this.input_container = true;
        this.modifyButton = "Annuler";
      }
    },
    updateInfos() {
      this.assignPostInformations();
    },
  },
  created() {
    this.assignPostInformations();
  },
};
</script>

<style scoped lang="scss">
#post_section {
  margin: auto;
  width: 90%;
}
#post_card {
  background-color: white;
  border: 2px solid #FD2D01;
  border-radius: 10px;
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
  margin-top: 30px;
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
  border-bottom: 2px solid #FD2D01;
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
.show_interaction {
  border-top: 2px solid #FD2D01;
  margin-top: -2px;
  display: flex;
  height: 100px;
}
.show_interaction_buttons {
  display: flex;
  width: 50%;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  align-items: center;
}

#modify_button {
  margin-bottom: 25px;
}
#moderation_button {
  margin-bottom: 0;
}
label {
  width: 80%;
  text-align: start;
}
h4 {
  margin-top: 20px;
  margin-bottom: 5px;
}
.input_container {
  width: 100%;
  margin: auto;
  border-left: 2px solid #FD2D01;
  border-right: 2px solid #FD2D01;
  transform-origin: top;
}

.input_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}
.toggle_input_box {
  button {
    width: 100px;
  }
}
.modify_title {
  width: 80%;
}
.input_area {
  resize: vertical;
  width: 80%;
  height: 100px;
  max-height: 200px;
  margin-bottom: 10px;
  padding-left: 5px;
}
// Animation pour les inputs de la modification ou du commentaire
.appear-enter-active {
  transition-delay: 1s;
}
.appear-enter-from,
.appear-leave-to {
  opacity: 0;
}
.appear-enter-active,
.appear-leave-active {
  transition: opacity 1s ease;
}
</style>
