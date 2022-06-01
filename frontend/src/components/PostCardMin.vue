<template>
  <div id="cards_container">
    <transition-group name="fade">
      <div
        class="post_card"
        :data-count="post.count_post"
        v-for="post in posts"
        :key="post.id_post"
      >
        <router-link :to="`/post/${post.id_post}`">
          <h2>{{ post.title }}</h2>
        </router-link>
        <div class="posted">
          <div class="posted__by_user">
            <UserAvatar :avatar="`${post.picture}`" />
            <h3>{{ post.nickname }}</h3>
          </div>
          <span>{{ post.date_post }}</span>
        </div>
        <div>{{ post.count_comments }} commentaires</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";
import { getAllPostsFromAPI } from "@/functions/fetchPost";
import { requestCountCommentsPostFromAPI } from "@/functions/fetchComment";

export default {
  name: "PostCardMin",
  data() {
    return {
      posts: [],
      comments: [],
      count_comments: "",
      total_post: "",
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
        this.total_post = reponse.length;
        reponse[i].count_post = i + 1;
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
.post_card {
  border: 1px solid red;
  margin-top: 10px;
  border-radius: 10px;
}

h2 {
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
h3 {
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
  border-radius: 50%;
}
span {
  margin-left: 5px;
}

.fade-enter-active .post_card {
  transition-delay: 0.5s;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
