<template>
  <div id="post_card">
    <div class="id_container">
      <h2>{{ post_title }}</h2>
    </div>
    <div class="posted_by">
      <h3>{{ post_nickname }}</h3>
      <p>{{ post_date }}</p>
    </div>
    <div class="post_text">{{ post_message }}</div>
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
    <div class="interact">
      <div class="like_or_delete">
        <div class="like" v-if="!sameUser" @click="modifyLike">
          <i class="far fa-heart" ></i>
          <i class="fas fa-heart" ></i>
        </div>
        <p @click="deletePost" v-if="sameUser">Supprimer</p>
      </div>
      <div class="toggle_input_box">
        <p @click="toggleCommentArea" v-if="!sameUser">{{ commentButton }}</p>
        <p @click="toggleModifyPost" v-if="sameUser">{{ modifyButton }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostFromAPI } from "@/functions/fetchPost.js";
import { requestUpdatePostFromAPI } from "@/functions/fetchPost.js";
import { requestDeletePostFromAPI } from "@/functions/fetchPost.js";

export default {
  name: "PostCard",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      post_id: "",
      post_userId: "",
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
      liked: false,
    };
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
        this.post_id = post[0].id;
        this.post_userId = post[0].user_id;
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
      let result = await requestUpdatePostFromAPI(
        this.$route.params.id,
        this.modify_title,
        this.modify_text
      );
      this.$router.push("/whatsnew");
      return result;
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
.posted_by {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: 1px solid red;
}
h3 {
  font-size: 16px;
}
.post_text {
  border-bottom: 1px solid red;
  overflow-wrap: break-word;
  text-align: justify;
  padding: 10px;
}
.interact {
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
  border-left: 1px solid red;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 18%;
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
