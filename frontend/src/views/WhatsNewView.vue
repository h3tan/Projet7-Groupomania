<template>
  <div id="whatsnew">
    <h1>Sujet récents</h1>
    <button id="write_post__button" @click="displayWritePost">
      Poster un nouveau message
    </button>
    <WritePost
      v-show="writePostDisplayed"
      @cancelPost="cancelDisplayWritePost"
      @postPublished="updateWhatsNew"
    />
    <div id="cards_container">
      <transition-group name="fade">
        <PostCardMin
          :count_post="count"
          :id_post="post.id_post"
          :post_title="post.title"
          :user_picture="post.picture"
          :nickname="post.nickname"
          :date_post="post.date_post"
          :count_comments="comments"
          v-for="post in posts"
          :key="post.id_post"
          @postPublished="updateWhatsNew"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { getAllPostsFromAPI } from "@/functions/fetchPost";
import WritePost from "@/components/WritePost";
import PostCardMin from "@/components/PostCardMin";

export default {
  name: "WhatsNewView",
  data() {
    return {
      posts: [],
      writePostDisplayed: false,
    };
  },
  components: {
    PostCardMin,
    WritePost,
  },
  methods: {
    getAllPostsFromAPI,
    displayWritePost() {
      if (this.writePostDisplayed == false) {
        this.writePostDisplayed = true;
        document.getElementById("write_post__button").style.visibility =
          "hidden";
        return;
      }
      this.writePostDisplayed = false;
      document.getElementById("write_post__button").style.visibility =
        "visible";
    },
    cancelDisplayWritePost() {
      this.writePostDisplayed = false;
      document.getElementById("write_post__button").style.visibility =
        "visible";
    },
    async showAllPosts() {
      let reponse = await getAllPostsFromAPI();
      console.log(reponse);
      for (let i = 0; i < reponse.length; i++) {
        this.total_post = reponse.length;
        let dateSQL = reponse[i].date_post.split("T");
        reponse[i].date_post = dateSQL[0];
      }
      this.posts = reponse;
      for (let i in this.posts) {
        if (this.posts[i].user_id == localStorage.getItem("userId")) {
          this.posts[i].nickname = "Vous";
        }
      }
    },
    updateWhatsNew() {
      this.showAllPosts();
    },
  },
  created() {
    this.showAllPosts();
  },
  mounted() {
    document.addEventListener("click", (event) => {
      if (document.getElementById("write_post") != null) {
        if (
          event.target.closest("#write_post") === null &&
          event.target.closest("#write_post__button") === null &&
          event.target.closest("#cancel_file") === null
        ) {
          this.writePostDisplayed = false;
          document.getElementById("write_post__button").style.visibility =
            "visible";
        }
      }
    });
  },
};
</script>

<style scoped lang="scss">
#whatsnew {
  margin: auto;
  margin-bottom: 50px;
  padding-top: 1px;
  z-index: 1;
}
#cards_container {
  margin-top: 30px;
  margin-bottom: 30px;
  width: 95%;
  margin: auto;
  margin-top: 30px;
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
