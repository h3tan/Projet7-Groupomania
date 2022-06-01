<template>
  <div id="post_card">
    <div class="title_container">
      <h1>{{ post_title }}</h1>
    </div>
    <div class="post_informations">
      <div class="posted">
        <div class="posted__by_user">
          <UserAvatar :avatar="`${post_pictureUser}`" />
          <h2 id="nickname">{{ post_nickname }}</h2>
        </div>
        <span>{{ post_date }}</span>
      </div>
      <div class="post_body">
        <div class="post_body__picture" v-if="pictureExists">
          <img alt="Image posté par l'utilisateur" :src="`${post_picture}`" />
        </div>
        <!-- Changement de l'image du post -->
        <div id="add_file">
          <label id="label_file" for="input_file" v-if="sameUser || privilege == 'admin'" >{{ type_of_add }}</label>
          <input
            type="file"
            id="input_file"
            name="file"
            accept="image/png, image/jpeg, image/gif"
            @change="handleFileUpload($event)"
          />
          <div class="picture_chosen" v-if="fileChosen">
            <div id="image_name">{{ file_name }}</div>
            <div id="image_type">{{ file_type }}</div>
          </div>
          <div class="picture_buttons">
            <button @click="modifyPostPicture" v-if="fileChosen">
              {{ confirm_add }}
            </button>
            <button @click="cancelFileChosen" v-if="fileChosen">Annuler</button>
          </div>
        </div>
        <div class="post_body__text_container">
          <p>{{ post_message }}</p>
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
      <div class="like_or_delete">
        <div class="like" v-if="!sameUser">
          <div class="like_icons" @click="modifyLike">
            <transition name="cancel_like">
              <i id="empty_heart" class="far fa-heart" v-if="!liked"></i>
            </transition>
            <transition name="display_like">
              <i id="filled_heart" class="fas fa-heart" v-if="liked"></i>
            </transition>
          </div>
          <span>J'aime</span>
          <span class="num_likes">{{ num_likes }} likes</span>
        </div>
        <button id="delete_button" @click="deletePost" v-if="sameUser">Supprimer</button>
      </div>
      <div class="show_interaction_buttons">
        <div class="toggle_input_box">
          <button
            @click="toggleModifyPost"
            v-if="sameUser || privilege == 'admin'"
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
import { getPostFromAPI } from "@/functions/fetchPost.js";
import { requestUpdatePostFromAPI } from "@/functions/fetchPost.js";
import { requestDeletePostFromAPI } from "@/functions/fetchPost.js";
import { getLikeFromAPI } from "@/functions/fetchLike.js";
import { sendLikeToAPI } from "@/functions/fetchLike.js";
import { requestModifyPostPictureToAPI } from "@/functions/fetchPost.js";

export default {
  name: "PostCard",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      privilege: localStorage.getItem("privilege"),
      post_id: "",
      post_userId: "",
      post_pictureUser: "",
      post_title: "",
      post_picture: "",
      post_message: "",
      post_nickname: "",
      post_date: "",
      modify_title: "",
      modify_text: "",
      modifyButton: "Modifier",
      input_container: false,
      pictureExists: false,
      sameUser: false,
      liked: "",
      num_likes: 0,
      fileChosen: false,
      file_name: "",
      file_type: "",
      file_upload: "",
      type_of_add: "Ajouter une image",
      confirm_add: "Ajouter"
    };
  },
  components: {
    UserAvatar,
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
      if (post[0].post_picture) {
        this.pictureExists = true;
        this.type_of_add = "Modifier";
        this.confirm_add = "Modifier";
      }
      if (!post.error) {
        this.post_id = post[0].id_post;
        this.post_userId = post[0].user_id;
        this.post_nickname = post[0].nickname;
        this.post_pictureUser = post[0].picture;
        this.post_title = post[0].title;
        this.post_picture = post[0].post_picture;
        this.post_message = post[0].message;
        this.modify_title = this.post_title;
        this.modify_text = this.post_message;
        let dateSQL = post[0].date_post.split("T");
        let dateFr = new Date(dateSQL[0]);
        this.post_date = dateFr.toLocaleDateString("fr");
        if (parseInt(this.userId) == parseInt(this.post_userId)) {
          this.sameUser = true;
          return;
        }
      }
    },
    async modifyPostPicture() {
      let reponse = await requestModifyPostPictureToAPI(
        this.post_id,
        this.file_upload,
        this.post_picture
      );
      if (!reponse.error) {
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
      this.modifyButton = "Modifier";
      return reponse;
    },
    // Récupère le nombre de likes du post ainsi que si l'utilisateur connecté a liké ce post
    async assignLike() {
      let isLiked = await getLikeFromAPI(this.$route.params.id, this.userId);
      this.num_likes = isLiked.countLikes;
      if (isLiked.isLiked == 1) {
        this.liked = true;
      }
    },
    // Demande à l'API de modifier le like de l'utilisateur connecté
    async modifyLike() {
      let reponse = await sendLikeToAPI(this.$route.params.id, this.userId);
      if (reponse.message == "post liké!") {
        this.liked = true;
        this.num_likes++;
        return;
      }
      this.liked = false;
      this.num_likes--;
    },
    toggleModifyPost() {
      if (this.modifyButton == "Annuler") {
        this.input_container = false;
        this.modifyButton = "Modifier";
      } else {
        this.input_container = true;
        this.modifyButton = "Annuler";
      }
    },
  },
  created() {
    this.assignPostInformations();
    this.assignLike();
  },
};
</script>

<style scoped lang="scss">
#post_card {
  margin: auto;
  width: 90%;
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
.post_informations {
  margin-top: 50px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 2px solid red;
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
  border-bottom: 2px solid red;
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
  border-top: 2px solid red;
  border-left: 2px solid red;
  border-right: 2px solid red;
  border-bottom: 2px solid red;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-top: -2px;
  display: flex;
  height: 100px;
}
.show_interaction_buttons {
  display: flex;
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
  border-left: 2px solid red;
  border-right: 2px solid red;
  transform-origin: top;
}

.input_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
}
.like_or_delete {
  width: 50%;
}
.toggle_input_box {
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;

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
.like {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .num_likes {
    bottom: 15px;
    position: absolute;
  }
  span {
    margin-top: -15px;
    margin-left: 10px;
  }
}
.like_icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  //margin-left: 27%;
  margin-top: -12px;
  height: 30px;
  //position: absolute;
  width: 30px;

  i {
    color: red;
    font-size: 25px;
    background: red;
    background-clip: text;
    -webkit-background-clip: text;
    position: absolute;
  }
  #empty_heart {
    color: black;
  }
}
#delete_button {
  margin-top: 38px;
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

// Animation des coeurs
.display_like-enter-from,
.display_like-leave-to {
  transform: scale(0);
}
.display_like-enter-active,
.display_like-leave-active {
  transition: all 0.5s ease;
}

.cancel_like-enter-from,
.cancel_like-leave-to {
  transform: scale(0);
}
.cancel_like-enter-active,
.cancel-like-leave-active {
  transition: all 0.5s ease;
}
</style>
