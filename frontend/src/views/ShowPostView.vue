<template>
  <div class="post_page" :data-id="$route.params.id">
    <router-link to="/whatsnew">Back</router-link>
    <PostCard />
    <CommentSection />
  </div>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import CommentSection from "@/components/CommentSection.vue";

export default {
  name: "ShowPostView",
  data() {
    return {};
  },
  components: {
    PostCard,
    CommentSection,
  },
};
</script>

<style scoped></style>
