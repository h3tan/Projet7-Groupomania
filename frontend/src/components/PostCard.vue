<template>
  <div id="post_card">
    <div class="title_container">
      <h2>{{ post_title }}</h2>
    </div>
    <div class="post_informations">
      <div class="posted">
        <div class="posted__by_user">
          <UserAvatar :avatar="`${post_pictureUser}`" />
          <h4 id="nickname">{{ post_nickname }}</h4>
        </div>
        <span>{{ post_date }}</span>
      </div>
      <div class="post_body">
        <div class="post_body__picture" v-if="pictureExists">
          <img :src="`${post_picture}`" />
        </div>
        <div class="post_body__text_container">
          <p>{{ post_message }}</p>
        </div>
      </div>
      <div class="comment_container" v-if="comment_container">
        <h3>Commentaires:</h3>
        <CommentBox
          v-for="comment in comments"
          :key="comment.id_comment"
          :id_comment="comment.id_comment"
          :comment_nickname="`${comment.nickname}`"
          :comment_message="comment.comment_message"
        />
      </div>
      <!-- affichage des commentaire du post -->
    </div>
    <transition name="input_collapse">
      <div class="input_container" v-if="input_container">
        <transition name="appear">
          <div class="input_box">
            <!-- Affichage de la zone pour modifier ou commenter un post -->
            <label for="modify_title" v-if="sameUser"
              ><h4>Modifier le titre</h4></label
            >
            <input
              class="modify_title"
              name="modify_title"
              v-model="modify_title"
              v-if="sameUser"
            />
            <label for="input_area" v-if="!sameUser"
              ><h4>Votre commentaire</h4></label
            >
            <label for="input_area" v-if="sameUser"
              ><h4>Modifier le texte</h4></label
            >
            <textarea
              class="input_area"
              name="input_area"
              v-model="modify_text"
              v-if="sameUser"
            ></textarea>
            <textarea
              class="input_area"
              name="input_area"
              v-model="post_comment"
              v-if="!sameUser"
            ></textarea>
            <button @click="postComment" v-if="!sameUser">Publier</button>
            <button @click="updatePost" v-if="sameUser">Modifier</button>
          </div>
        </transition>
      </div>
    </transition>
    <transition name="slide_interaction">
      <div class="show_interaction">
        <div class="show_interaction_buttons">
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
            </div>
            <button @click="deletePost" v-if="sameUser">Supprimer</button>
          </div>
          <div class="toggle_input_box">
            <button @click="toggleCommentArea" v-if="!sameUser">
              {{ commentButton }}
            </button>
            <button @click="toggleModifyPost" v-if="sameUser">
              {{ modifyButton }}
            </button>
          </div>
        </div>
        <div class="like_and_comment">
          <span class="num_likes">{{ num_likes }} likes</span>
          <span class="num_comments">{{ num_comments }} commentaires</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CommentBox from "@/components/CommentBox.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { getPostFromAPI } from "@/functions/fetchPost.js";
import { requestUpdatePostFromAPI } from "@/functions/fetchPost.js";
import { requestDeletePostFromAPI } from "@/functions/fetchPost.js";
import { getLikeFromAPI } from "@/functions/fetchLike.js";
import { sendLikeToAPI } from "@/functions/fetchLike.js";
import { sendNewCommentToAPI } from "@/functions/fetchComment.js";
import { requestAllCommentsFromAPI } from "@/functions/fetchComment.js";

export default {
  name: "PostCard",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      post_id: "",
      post_userId: "",
      post_pictureUser: "",
      post_title: "",
      post_picture: "",
      post_message: "",
      post_nickname: "",
      post_comment: "",
      post_date: "",
      comment_container: false,
      commentButton: "Commenter",
      modify_title: "",
      modify_text: "",
      modifyButton: "Modifier",
      input_container: false,
      pictureExists: false,
      sameUser: false,
      liked: "",
      num_likes: 0,
      num_comments: 0,
      id_comment: "",
      comment_nickname: "",
      comment_message: "",
      comments: [],
    };
  },
  components: {
    UserAvatar,
    CommentBox,
  },
  methods: {
    getPostFromAPI,
    requestDeletePostFromAPI,
    requestUpdatePostFromAPI,
    sendNewCommentToAPI,
    requestAllCommentsFromAPI,
    async showAllComments() {
      let reponse = await requestAllCommentsFromAPI(this.$route.params.id);
      if (reponse.length != 0) {
        this.comment_container = true;
      }
      this.comments = reponse;
    },
    // Demande à l'API de supprimer le post dans la base de données
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
        this.post_date = dateSQL[0];
        if (parseInt(this.userId) == parseInt(this.post_userId)) {
          this.sameUser = true;
          return;
        }
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
      this.$router.push("/whatsnew");
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
    // Demande à l'API de créer un commentaire
    async postComment() {
      console.log(this.post_comment);
      let reponse = await sendNewCommentToAPI(
        this.post_id,
        this.post_comment,
        this.userId
      );
      return reponse;
    },
    toggleCommentArea() {
      if (this.commentButton == "Annuler") {
        this.input_container = false;
        this.commentButton = "Commenter";
      } else {
        this.input_container = true;
        this.commentButton = "Annuler";
      }
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
    this.showAllComments();
    this.assignLike();
  },
};
</script>

<style scoped lang="scss">
#post_card {
  margin: auto;
  width: 90%;
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
  }
}
#nickname {
  font-weight: lighter;
  margin-left: 5px;
}
.avatar_container {
  margin-top: 5px;
}
h3 {
  font-size: 16px;
}
.post_body {
  &__picture {
    margin: auto;
    margin-top: 30px;
    width: 250px;

    border: 1px solid red;
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
    text-align: justify;
    padding: 10px;
  }
}
.like_and_comment {
  display: flex;
  justify-content: space-around;
  height: 20px;
  margin-top: 5px;
  margin-bottom: 8px;
  font-size: 14px;

  span {
    margin-left: 35px;
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
}
.show_interaction_buttons {
  display: flex;
  height: 50px;
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
  margin: auto;
  width: 50%;
}
.toggle_input_box {
  margin: auto;
  width: 50%;
  width: 50%;
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

  span {
    position: absolute;
    margin-top: -6px;
  }
}
.like_icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 27%;
  margin-top: -12px;
  height: 30px;
  position: absolute;
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
// Animation du conteneur pour modifier
.input_collapse-enter-active,
.input_collapse-leave-active {
  transition: transform 0.5s ease;
}
.input_collapse-enter-from,
.input_collapse-leave-to {
  transform: scaleY(0);
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

// Animation pour le conteneur des likes et du bouton pour afficher le conteneur de modification
.slide_interaction-enter-active,
.slide_interaction-leave-active {
  transition: transform 0.5s;
}
.slide_interaction-enter-from,
.slide_interaction-leave-to {
  transform: translateY(0px);
}
.slide_interaction-enter-to,
.slide_interaction-leave-from {
  transform: translateY(258px);
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
