<template>
  <div class="whatsnew">
    <h1>Sujet récents</h1>
    <router-link to="/newpost">Poster un nouveau message</router-link>
    <PostCardMin />
  </div>
</template>

<script>
import PostCardMin from "@/components/PostCardMin";

export default {
  name: "WhatsNewView",
  components: {
    PostCardMin,
  },
};
</script>

<style scoped lang="scss">
.whatsnew {
  width: 95%;
  margin: auto;
  margin-bottom: 50px;
}
#cards_container {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
