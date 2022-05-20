<template>
  <div id="post_card">
    <h2>{{ post_title }}</h2>
    <div class="posted_by">
      <h3>{{ post_nickname }}</h3>
      <p>{{ post_date }}</p>
    </div>
    <div class="post_text">{{ post_message }}</div>
    <div class="comment_box" v-if="comment_box"></div>
    <!-- affichage des commentaire du post -->
    <div class="input_box" v-if="input_box">
      <!-- Affichage de la zone pour modifier ou commenter un post -->
      <textarea
        class="input_area"
        placeholder="Entrez votre commentaire"
      ></textarea>
      <button v-if="sameUser == false">Publier</button>
      <button @click="goToWhatsNew" v-if="sameUser == true">Modifier</button>
    </div>
    <div class="interact">
      <div class="like" v-if="sameUser == false">
        <p>Like</p>
      </div>
      <div @click="deletePost" class="delete_post" v-if="sameUser == true">
        <p>Supprimer</p>
      </div>
      <div class="comment" v-if="sameUser == false">
        <p @click="toggleCommentArea">{{ commentButton }}</p>
      </div>
      <div class="modify_post" v-if="sameUser == true">
        <p @click="toggleModifyPost">{{ modifyButton }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostFromAPI } from "@/functions/fetchPost.js";
import { requestDeletePostFromAPI } from "@/functions/fetchPost.js";

export default {
  name: "PostCard",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      post_id: "",
      post_userId: "",
      post_title: "",
      post_nickname: "",
      post_message: "",
      post_date: "",
      comment_box: false,
      commentButton: "Commenter",
      modifyButton: "Modifier",
      input_box: false,
      sameUser: false,
    };
  },
  methods: {
    getPostFromAPI,
    requestDeletePostFromAPI,
    async deletePost() {
      let result = await requestDeletePostFromAPI(this.$route.params.id);
      this.$router.push('/whatsnew');
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
        let dateSQL = post[0].date_post.split("T");
        this.post_date = dateSQL[0];
        if (parseInt(this.userId) == parseInt(this.post_userId)) {
          this.sameUser = true;
          return;
        }
      }
    },
    toggleCommentArea() {
      if (this.input_box == true) {
        this.input_box = false;
        this.commentButton = "Commenter";
      } else {
        this.input_box = true;
        this.commentButton = "Annuler";
      }
    },
    toggleModifyPost() {
      if (this.input_box == true) {
        this.input_box = false;
        this.modifyButton = "Modifier";
      } else {
        this.input_box = true;
        this.modifyButton = "Annuler";
      }
    },
  },
  created() {
    this.assignPostInformations();
  },
};
</script>

<style scoped>
#post_card {
  margin: auto;
  margin-top: 50px;
  border: 1px solid red;
  border-radius: 20px;
  width: 90%;
}
h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: 1px solid red;
}
.posted_by {
  border-bottom: 1px solid red;
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
.like,
.delete_post {
  margin: auto;
  width: 50%;
}
.input_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid red;
  padding-bottom: 20px;
}
.comment,
.modify_post {
  margin: auto;
  width: 50%;
  border-left: 1px solid red;
  width: 50%;
}
.input_area {
  margin-top: 30px;
  resize: vertical;
  width: 80%;
  height: 100px;
  max-height: 200px;
  margin-bottom: 10px;
  padding-left: 5px;
}
</style>
