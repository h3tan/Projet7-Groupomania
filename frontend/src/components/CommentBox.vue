<template>
  <div class="comment-card" :data-id_comment="id_comment">
    <p>{{ comment_message }}</p>
    <p>Posté par: {{ comment_nickname }}</p>
  </div>
</template>

<script>
//import { requestAllCommentsFromAPI } from "@/functions/fetchComment.js";

export default {
  name: "CommentBox",
  props: ["id_comment", "comment_message", "comment_nickname"],
};
</script>

<style scoped lang="scss">
#comment-box {
  width: 90%;
  border: 1px solid red;
}
</style>
