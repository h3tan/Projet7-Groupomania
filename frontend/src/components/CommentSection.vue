<template>
  <div class="comment_page">
    <div class="comment_section" :data-comment_for="$route.params.id">
      <div class="title">
        <h3>
          <i class="fas fa-comments"></i><span>{{ title_comment }}</span>
        </h3>
        <span>{{ count_comments }}</span>
      </div>
      <form id="input_comment" v-on:submit.prevent="postComment">
        <label for="input_comment__area"><h4>Ajouter un commentaire</h4></label>
        <textarea
          id="input_comment__area"
          name="input_comment__area"
          placeholder="Dites quelque chose..."
          v-model="post_comment"
        ></textarea>
        <button id="post_comment">Publier</button>
      </form>
      <div class="comment_container" v-if="show_comment">
        <div
          class="comment_card"
          :data-id_comment="comment.id_comment"
          :data-id_user="comment.id_user"
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
          <div class="comment_interactions">
            <div
              class="modify_comment"
              v-if="
                (userId == comment.id_user || privilege == 'admin') &&
                comment_box != comment.id_comment
              "
            >
              <button
                class="modify_comment_button"
                @click="toggleModifyCommentBox(comment.id_comment)"
              >
                Modifier
              </button>
              <button
                class="delete_comment_button"
                @click="deleteComment($route.params.id, comment.id_comment)"
              >
                Supprimer
              </button>
            </div>
            <div
              class="modify_container"
              v-if="
                (userId == comment.id_user || privilege == 'admin') &&
                comment_box == comment.id_comment
              "
            >
              <ModifyComment
                :id_post="$route.params.id"
                :id_comment="comment.id_comment"
                :text="comment.comment_message"
                @update_comment="updateCommentSection"
              />
              <button id="cancel_modify" @click="cancelUpdateComment">
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";
import ModifyComment from "@/components/ModifyComment";
import { requestAllCommentsFromAPI } from "@/functions/fetchComment.js";
import { requestDeleteCommentFromAPI } from "@/functions/fetchComment.js";
import { sendNewCommentToAPI } from "@/functions/fetchComment.js";

export default {
  name: "CommentSection",
  data() {
    return {
      comments: [],
      show_comment: false,
      title_comment: "Pas de commentaires",
      post_comment: "",
      comment_message: "",
      new_comment: false,
      count_comments: "",
      userId: localStorage.getItem("userId"),
      comment_box: "",
      privilege: localStorage.getItem("privilege"),
    };
  },
  components: {
    UserAvatar,
    ModifyComment,
  },
  methods: {
    requestAllCommentsFromAPI,
    requestDeleteCommentFromAPI,
    sendNewCommentToAPI,
    async showAllComments() {
      let reponse = await requestAllCommentsFromAPI(this.$route.params.id);
      if (reponse.length == 0) {
        this.title_comment = "Pas de commentaires";
        this.count_comments = 0;
      }
      this.count_comments = reponse.length;
      this.show_comment = true;
      this.title_comment = "Commentaires";
      this.comments = reponse;
      for (let i = 0; i < reponse.length; i++) {
        if (this.comments[i].id_user == this.userId) {
          this.comments[i].nickname = "Vous";
        }
      }
    },
    // Demande à l'API de créer un commentaire
    async postComment() {
      this.show_comment = false;
      let reponse = await sendNewCommentToAPI(
        this.$route.params.id,
        this.post_comment,
        localStorage.getItem("userId")
      );
      if (!reponse.error) {
        // Mettre à jour le DOM sans actualiser la page
        // 1: Appeler showAllComments
        // 2: $forceupdate()
        this.showAllComments();
      }
      return reponse;
    },
    async deleteComment(id_post, id_comment) {
      let reponse = await requestDeleteCommentFromAPI(id_post, id_comment);
      if (!reponse.error) {
        this.showAllComments();
      }
    },
    // id_comment en paramètres permet de pointer l'élément qu'on veut modifier
    // Sinon le container pour modifier apparaîtrait pour tous les commentaires qu'a posté l'utilisateur
    toggleModifyCommentBox(id_comment) {
      if (this.comment_box != id_comment) {
        this.comment_box = id_comment;
      }
    },
    cancelUpdateComment() {
      if (this.comment_box) {
        this.comment_box = false;
      }
    },
    // Méthode appelé pour mettre à jour les commentaires après qu'un des commentaires a été modifié
    updateCommentSection() {
      this.showAllComments();
      this.comment_box = false;
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
  justify-content: space-between;
  border-bottom: 2px solid red;
  padding-right: 20px;

  h3 {
    margin-left: 10px;

    span {
      margin-left: 5px;
    }
  }

  span {
    font-size: 18px;
    font-weight: bold;
  }
}
#input_comment {
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
.comment_card {
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

#cancel_modify {
  margin-top: 10px;
}
.comment_text {
  background-color: rgb(77, 71, 71);
  font-size: 18px;
  width: 90%;
  color: white;
  padding: 10px;
  margin: auto;
  border-radius: 5px;
  margin-bottom: 8px;
}

.modify_comment {
  width: 90%;
  margin: auto;
  text-align: start;
}

.modify_comment_button,
.delete_comment_button {
  font-weight: lighter;
  height: 30px;
  font-size: 16px;
}

.delete_comment_button {
  margin-left: 10px;
}
</style>
