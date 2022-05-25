<template>
  <div class="write_post">
    <h1>Ecrire un nouveau post</h1>
    <div id="write_post_container">
      <WritePost />
    </div>
  </div>
</template>

<script>
import WritePost from "@/components/WritePost.vue";

export default {
  name: "WritePostView",
  components: {
    WritePost,
  },
};
</script>

<style lang="scss">
h1 {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
}
#write_post_container {
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 80%;
}
</style>
