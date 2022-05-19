<template>
  <div class="whatsnew">
    <isLogged />
    <div id="cards_container">
      <div class="post_card" v-for="post in posts" :key="post.id">
        <router-link :to="`/post/${post.id}`">
          <h3>{{ post.title }}</h3>
        </router-link>
        <!-- <div class="img_box">
        <span>Image</span>
    </div> -->
        <div class="posted_by">
          <h4>Posté par :</h4>
          <span>{{ post.user_id }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IsLogged from "@/components/IsLogged.vue";
import { getAllPostsFromAPI } from "@/functions/fetchPost";

export default {
  name: "WhatsNewView",
  data() {
    return {
      posts: [],
    };
  },
  components: {
    IsLogged,
  },
  methods: {
    getAllPostsFromAPI,
    async showAllPosts() {
      let reponse = await getAllPostsFromAPI();
      this.posts = reponse;
    },
  },
  created() {
    this.showAllPosts();
  },
};
</script>

<style scoped lang="scss">
#cards_container {
  margin-top: 30px;
}

.post_card {
  border: 1px solid red;
  margin-top: 10px;
}
h3 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: 1px solid red;
}
a {
  text-decoration: none;

  &:visited {
    color: red;
  }
}

.posted_by {
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 30px;
}
span {
  margin-left: 20px;
}
</style>
