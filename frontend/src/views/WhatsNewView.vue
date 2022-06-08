<template>
  <div id="whatsnew">
    <h1>Sujet récents</h1>
    <PostButton
      id="write_post__button"
      @click="displayWritePost"
      post_button_name="Poster un nouveau message"
    />
    <WritePost
      v-show="writePostDisplayed"
      @cancelPost="cancelDisplayWritePost"
      @postPublished="updateWhatsNew"
    />
    <div class="sort_by_date" @click="sortByDate">
      <span>{{ sort_message }}</span>
      <div class="sort_by_date__icon">
        <i class="fas fa-exchange-alt"></i>
      </div>
    </div>
    <div id="cards_container">
      <div class="no_posts" v-if="posts.length == 0">
        <h2>Aucun post à afficher</h2>
      </div>
      <transition-group name="fade">
        <PostCardMin
          :id_post="post.id_post"
          :post_title="post.title"
          :user_picture="post.picture"
          :nickname="post.nickname"
          :date_post="post.date_created"
          :date_updated="post.date_updated"
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
import PostButton from "@/components/PostButton.vue";

export default {
  name: "WhatsNewView",
  data() {
    return {
      posts: [],
      writePostDisplayed: false,
      sorted: "newest",
      sort_message: "Du plus récent au plus ancien"
    };
  },
  components: {
    PostCardMin,
    WritePost,
    PostButton,
  },
  methods: {
    getAllPostsFromAPI,
    sortByDate() {
      if (this.sorted == 'newest') {
        this.sort_message = "Du plus ancien au plus récent"
        this.sorted = 'oldest'
        document.getElementById("cards_container").style.flexDirection = "column-reverse";
        return;
      }
      this.sort_message = "Du plus récent au plus ancien"
      this.sorted = "newest"
      document.getElementById("cards_container").style.flexDirection = "column";
    },
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
      this.total_post = reponse.length;
      this.posts = reponse;
      for (let i in this.posts) {
        if (this.posts[i].id_user == localStorage.getItem("userId")) {
          this.posts[i].nickname = "Vous";
        }
      }
    },
    updateWhatsNew() {
      this.showAllPosts();
    },
  },
  beforeCreate() {
    if (this.$store.state.logState == false) {
      this.$router.push('/login');
    }
  },
  created() {
    this.showAllPosts();
  },
};
</script>

<style scoped lang="scss">
#whatsnew {
  margin: auto;
  margin-bottom: 40px;
  padding-top: 1px;
  z-index: 1;
  h1 {
    margin-bottom: 40px;
  }
}
.sort_by_date {
  width: 95%;
  margin: auto;
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
  cursor: pointer;
  span {
    font-size: 16px;
    margin-right: 5px;
  }
  &__icon {
    font-size: 25px;
    transform: rotate(90deg);
  }
}
#cards_container {
  width: 95%;
  margin: auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
}
.no_posts {
  margin-top: 150px;
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
