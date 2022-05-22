<template>
  <div id="post_card">
    <div class="id_container">
      <h2>{{ post_title }}</h2>
    </div>
    <div class="posted">
      <div class="posted__by_user">
        <UserAvatar :avatar="`${post_pictureUser}`" />
        <h4 id="nickname">{{ post_nickname }}</h4>
      </div>
      <span>{{ post_date }}</span>
    </div>
    <div class="post_text_container">
      <p>{{ post_message }}</p>
    </div>
    <div class="comment_container" v-if="comment_container"></div>
    <!-- affichage des commentaire du post -->
    <div class="input_container" v-if="input_container">
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
    </div>
    <div class="show_interaction">
      <div class="show_interaction_buttons">
        <div class="like_or_delete">
          <div class="like" v-if="!sameUser">
            <div class="like_icons" @click="modifyLike">
              <i class="far fa-heart" v-if="!liked"></i>
              <i class="fas fa-heart" v-if="liked"></i>
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
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";
import { getPostFromAPI } from "@/functions/fetchPost.js";
import { requestUpdatePostFromAPI } from "@/functions/fetchPost.js";
import { requestDeletePostFromAPI } from "@/functions/fetchPost.js";
import { getLikeFromAPI } from "@/functions/fetchLike.js";
import { sendLikeToAPI } from "@/functions/fetchLike.js";

export default {
  name: "PostCard",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      post_id: "",
      post_userId: "",
      post_pictureUser: "",
      post_title: "",
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
      sameUser: false,
      liked: "",
      num_likes: 0,
      num_comments: 0,
    };
  },
  components: {
    UserAvatar,
  },
  methods: {
    getPostFromAPI,
    requestDeletePostFromAPI,
    requestUpdatePostFromAPI,
    async deletePost() {
      let result = await requestDeletePostFromAPI(this.$route.params.id);
      this.$router.push("/whatsnew");
      return result;
    },
    async assignPostInformations() {
      let post = await getPostFromAPI(this.$route.params.id);
      if (!post.error) {
        this.post_id = post[0].id_post;
        this.post_userId = post[0].user_id;
        this.post_pictureUser = post[0].picture;
        this.post_title = post[0].title;
        this.post_nickname = post[0].nickname;
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
    async updatePost() {
      this.modify_title = this.modify_title.replace(/'/g, "''");
      this.modify_text = this.modify_text.replace(/'/g, "''");
      let result = await requestUpdatePostFromAPI(
        this.$route.params.id,
        this.modify_title,
        this.modify_text
      );
      this.$router.push("/whatsnew");
      return result;
    },
    async assignLike() {
      let isLiked = await getLikeFromAPI(this.$route.params.id, this.userId);
      this.num_likes = isLiked.countLikes;
      if (isLiked.isLiked == 1) {
        this.liked = true;
      }
    },
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
    this.assignLike();
  },
};
</script>

<style scoped lang="scss">
#post_card {
  margin: auto;
  margin-top: 50px;
  border: 1px solid red;
  border-radius: 20px;
  width: 90%;
}
.id_container {
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid red;
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
.post_text_container {
  border-top: 1px solid red;
  border-bottom: 1px solid red;
  overflow-wrap: break-word;
  text-align: justify;
  padding: 10px;
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
}

.input_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid red;
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
    margin-top: -8px;
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
    color: black;
    font-size: 25px;
  }

  i:nth-child(1) {
    transition: all 500ms;
  }

  i:nth-child(2) {
    background: red;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    position: absolute;
    transform: scale(0);
    transition: all 500ms;
  }
  /* linear-gradient(to top left, #9356dc, #ff79da) */
  &:active > i:nth-child(1) {
    transform: scale(0);
    transition: all 500ms;
  }

  &:active > i:nth-child(2) {
    transform: scale(1);
  }
}
</style>
