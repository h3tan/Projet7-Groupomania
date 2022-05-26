<template>
  <div class="comment_section" :data-comment_for="$route.params.id" v-if="show_comment">
    <div class="title">
      <i class="fas fa-comments"></i>
      <h3>Commentaires</h3>
    </div>
    <div class="comment_container">
      <div
        class="comment-card"
        :data-id_comment="comment.id_comment"
        v-for="comment in comments"
        :key="comment.id_comment"
      >
        <div class="commented_by">
          <UserAvatar :avatar="`${comment.picture}`"  />
          <p>{{ comment.nickname }}</p>
        </div>
        <div class="comment_text">
          <p>{{ comment.comment_message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";
import { requestAllCommentsFromAPI } from "@/functions/fetchComment.js";

export default {
  name: "CommentBox",
  data() {
    return {
      comments: [],
      show_comment: false
    };
  },
  components: {
    UserAvatar
  },
  methods: {
    requestAllCommentsFromAPI,
    async showAllComments() {
      let reponse = await requestAllCommentsFromAPI(this.$route.params.id);
      if (reponse.length != 0) {
        this.show_comment = true;
      }
      this.comments = reponse;
    },
  },
  created() {
    this.showAllComments();
  },
};
</script>

<style scoped lang="scss">
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

.comment-card {
  margin: auto;
  margin-top: 20px;
  border-bottom: 1px dotted red;
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
