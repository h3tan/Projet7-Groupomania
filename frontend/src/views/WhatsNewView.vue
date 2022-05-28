<template>
  <div class="whatsnew">
    <div id="cards_container">
      <div class="post_card" v-for="post in posts" :key="post.id_post">
        <router-link :to="`/post/${post.id_post}`">
          <h3>{{ post.title }}</h3>
        </router-link>
        <div class="posted">
          <div class="posted__by_user">
            <UserAvatar :avatar="`${post.picture}`" />
            <h4>{{ post.nickname }}</h4>
          </div>
          <span>{{ post.date_post }}</span>
        </div>
        <div>{{ post.count_comments }} commentaires</div>
      </div>
    </div>
    <router-link to="/newpost">Poster un nouveau message</router-link>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";
import { getAllPostsFromAPI } from "@/functions/fetchPost";
import { requestCountCommentsPostFromAPI } from "@/functions/fetchComment";

export default {
  name: "WhatsNewView",
  data() {
    return {
      posts: [],
      comments: [],
      count_comments: "",
    };
  },
  components: {
    UserAvatar,
  },
  methods: {
    getAllPostsFromAPI,
    async showAllPosts() {
      let reponse = await getAllPostsFromAPI();
      for (let i = 0; i < reponse.length; i++) {
        let count = await requestCountCommentsPostFromAPI(reponse[i].id_post);
        reponse[i].count_comments = count.value; // Création d'une clé count_comments pour affecter le nombre de commentaires
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
.whatsnew {
  width: 95%;
  margin: auto;
  margin-bottom: 50px;
}
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
h4 {
  font-weight: lighter;
  margin-left: 5px;
}
.posted {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 10px;
  height: 60px;

  &__by_user {
    display: flex;
    height: 100%;
  }
}
.avatar_container {
  margin-top: 5px;
}
span {
  margin-left: 5px;
}
</style>
