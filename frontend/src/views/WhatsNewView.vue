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
          <h4>Posté par :<span>{{ post.nickname }}</span></h4>

          <span>{{ post.date_post }}</span>
        </div>
      </div>
    </div>
    <router-link to="/newpost">Poster un nouveau message</router-link>
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
      for (let i = 0; i < reponse.length; i++) {
        let dateSQL = reponse[i].date_post.split("T");
        reponse[i].date_post = dateSQL[0];
      }
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
  margin-bottom: 30px;
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
h4 > span {
  font-weight: lighter;
}
.posted_by {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
  height: 30px;
}
span {
  margin-left: 5px;
}
</style>
