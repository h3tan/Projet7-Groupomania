<template>
  <div class="write_post">
    <isLogged />
    <h1>Ecrire un nouveau post</h1>
    <div id="write_post_container">
      <WritePost />
    </div>
  </div>
</template>

<script>
import IsLogged from "@/components/IsLogged.vue";
import WritePost from "@/components/WritePost.vue";

export default {
  name: "WritePostView",
  components: {
    IsLogged,
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
