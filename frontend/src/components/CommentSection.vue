<template>
  <div class="comment_page">
    <div class="comment_section" :data-comment_for="$route.params.id">
      <div class="title">
        <i class="fas fa-comments"></i>
        <h3>{{ title_comment }}</h3>
      </div>
      <form class="input_comment" v-on:submit.prevent="postComment">
        <label for="input_comment__area"><h4>Ajouter un commentaire</h4></label>
        <textarea
          class="input_comment__area"
          name="input_comment__area"
          v-model="post_comment"
        ></textarea>
        <button id="post_comment">Publier</button>
      </form>
      <div class="comment_container" v-if="show_comment">
        <div
          class="comment-card"
          :data-id_comment="comment.id_comment"
          v-for="comment in comments"
          :key="comment.id_comment"
        >
          <div class="commented_by">
            <UserAvatar :avatar="`${comment.picture}`" />
            <p>{{ comment.nickname }}</p>
          </div>
          <div class="comment_text">
            <p>{{ comment.comment_message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";
import { requestAllCommentsFromAPI } from "@/functions/fetchComment.js";
import { sendNewCommentToAPI } from "@/functions/fetchComment.js";

export default {
  name: "CommentBox",
  data() {
    return {
      comments: [],
      show_comment: false,
      post_comment: "Dites quelque chose...",
      title_comment: "Pas de commentaires",
      new_comment: false,
    };
  },
  components: {
    UserAvatar,
  },
  methods: {
    requestAllCommentsFromAPI,
    sendNewCommentToAPI,
    async showAllComments() {
      let reponse = await requestAllCommentsFromAPI(this.$route.params.id);
      if (reponse.length != 0) {
        this.show_comment = true;
        this.title_comment = "Commentaires";
      }
      this.comments = reponse;
    },
    // Demande à l'API de créer un commentaire
    async postComment() {
      this.show_comment = false;
      let reponse = await sendNewCommentToAPI(
        this.$route.params.id,
        this.post_comment,
        localStorage.getItem("userId")
      );
      // Mettre à jour le DOM sans actualiser la page
      // 1: Appeler showAllComments
      // 2: $forceupdate()
      this.showAllComments();
      return reponse;
    },
  },
  created() {
    this.showAllComments();
  },
};
</script>

<style scoped lang="scss">
.comment_empty {
  width: 90%;
  border: 2px solid red;
  border-radius: 10px;
  margin: auto;
  margin-top: 30px;
}
.comment_section {
  width: 90%;
  border: 2px solid red;
  border-radius: 10px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 100px;
  overflow: hidden;
}
.title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px solid red;
  padding-left: 15px;

  h3 {
    margin-left: 10px;
  }
}
.input_comment {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;
  margin-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  &__area {
    width: 100%;
    max-width: 100%;
    max-height: 200px;
    min-height: 100px;
    margin-bottom: 15px;
  }
}
.comment-card {
  margin: auto;
  border-top: 1px dashed red;
  padding-top: 10px;
  padding-bottom: 20px;
}
.commented_by {
  display: flex;
  align-items: center;
  width: 90%;
  margin: auto;

  p {
    font-weight: bold;
    margin-left: 10px;
  }
}
.avatar_container {
  width: 40px;
  height: 40px;
  border-radius: 3px;

  img {
    border-radius: 3px;
  }
}

.comment_text {
  background-color: grey;
  width: 90%;
  color: white;
  padding: 10px;
  margin: auto;
  border-radius: 5px;
}
</style>
