<template>
  <div
    class="input_modify_comment"
    :data-id_post="id_post"
    :data-id_comment="id_comment"
  >
    <textarea
      class="input_modify_comment__area"
      v-model="comment_message"
    ></textarea>
    <div class="input_modify_comment__buttons">
      <button class="send_update_comment_button" @click="updateComment">
        Modifier
      </button>
    </div>
  </div>
</template>

<script>
import { requestUpdateCommentFromAPI } from "@/functions/fetchComment.js";

export default {
  name: "ModifyComment",
  data() {
    return {
      comment_message: this.text, // Permet de passer outre l'impossibilité de muter une props avec v-model
    };
  },
  props: {
    id_post: String,
    id_comment: Number,
    text: String,
  },
  methods: {
    requestUpdateCommentFromAPI,
    async updateComment() {
      let reponse = await requestUpdateCommentFromAPI(
        this.id_post,
        this.id_comment,
        this.comment_message
      );
      if (!reponse.error) {
        // On transmet à CommentSection.vue le fait qu'on a mis à jour le commentaire
        // Afin qu'il puisse mettre à jour l'affichage
        this.$emit('update_comment');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.input_modify_comment {
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  border: 1px solid #FD2D01;
  &__area {
    min-width: 95%;
    max-width: 95%;
    max-height: 300px;
    min-height: 150px;
    margin: auto;
    margin-top: 15px;
  }
  &__buttons {
    margin: auto;
    display: flex;
    width: 95%;
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
