<template>
  <div id="post_card">
    <h2>{{ post_title }}</h2>
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
        <label for="modify_title" v-if="sameUser"><h4>Modifier le titre</h4></label>
        <input
          class="modify_title"
          name="modify_title"
          v-model="post_title"
          v-if="sameUser == true"
        />
        <label for="input_area" v-if="!sameUser"
          ><h4>Votre commentaire</h4></label
        >
        <label for="input_area" v-if="sameUser"
          ><h4>Modifier le texte</h4></label
        >
        <textarea class="input_area" name="input_area" v-model="post_message" v-if="sameUser"></textarea>
        <textarea class="input_area" name="input_area" v-model="post_comment" v-if="!sameUser"></textarea>
        <button @click="modifyPost" v-if="!sameUser">Publier</button>
        <button @click="goToWhatsNew" v-if="sameUser">Modifier</button>
      </div>
    </div>
    <div class="interact">
      <div class="like" v-if="!sameUser">
        <p>Like</p>
      </div>
      <div @click="deletePost" class="delete_post" v-if="sameUser">
        <p>Supprimer</p>
      </div>
      <div class="comment" v-if="!sameUser">
        <p @click="toggleCommentArea">{{ commentButton }}</p>
      </div>
      <div class="modify_post" v-if="sameUser">
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
      post_comment: "",
      post_date: "",
      comment_container: false,
      commentButton: "Commenter",
      modifyButton: "Modifier",
      input_container: false,
      sameUser: false,
    };
  },
  methods: {
    getPostFromAPI,
    requestDeletePostFromAPI,
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
        let dateSQL = post[0].date_post.split("T");
        this.post_date = dateSQL[0];
        if (parseInt(this.userId) == parseInt(this.post_userId)) {
          this.sameUser = true;
          return;
        }
      }
    },
    toggleCommentArea() {
      if (this.input_container == true) {
        this.input_container = false;
        this.commentButton = "Commenter";
      } else {
        this.input_container = true;
        this.commentButton = "Annuler";
      }
    },
    toggleModifyPost() {
      if (this.input_container == true) {
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
.like,
.delete_post {
  margin: auto;
  width: 50%;
}
.comment,
.modify_post {
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
</style>
