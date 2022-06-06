<template>
  <div id="post_section" :data-id_post="id_post" :data-id_user="post_id_user">
    <div class="nav">
      <navButton link="/whatsnew" nav_button_name="Retour" />
      <!-- <router-link to="/whatsnew">Back</router-link> -->
    </div>
    <div class="title_container">
      <h1>{{ post_title }}</h1>
    </div>
    <PostCardDetailed
      :id_post="id_post"
      :post_id_user="post_id_user"
      :post_user_picture="post_user_picture"
      :post_title="post_title"
      :post_image="post_image"
      :post_text="post_text"
      :post_user_nickname="post_user_nickname"
      :post_date_created="post_date_created"
      :post_time_created="post_time_created"
    />
    <PostPanel
      v-if="post_id_user == userId || privilege == 'admin'"
      :id_post="id_post"
      :post_id_user="post_id_user"
      :post_title="post_title"
      :post_text="post_text"
      :post_image="post_image"
      @requestUpdatePostInfosInView="assignPostInformations"
    />
    <LikeSection
      :id_post="id_post"
      :post_id_user="post_id_user"
      :liked="requestedUserliked"
      :num_likes="requestedNumLikes"
      @likeUpdated="assignPostInformations"
    />
    <CommentSection />
  </div>
</template>

<script>
import NavButton from "@/components/NavButton";
import PostCardDetailed from "@/components/PostCardDetailed";
import LikeSection from "@/components/LikeSection";
import CommentSection from "@/components/CommentSection";
import PostPanel from "@/components/PostPanel";
import { getPostFromAPI } from "@/functions/fetchPost.js";

export default {
  name: "PostAndCommentsView",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      privilege: localStorage.getItem("privilege"),
      id_post: "",
      post_id_user: "",
      post_user_picture: "",
      post_title: "",
      post_image: "",
      post_text: "",
      post_user_nickname: "",
      post_date_created: "",
      post_time_created: "",
      sameUser: false,
      requestedUserliked: "",
      requestedNumLikes: "",
    };
  },
  components: {
    NavButton,
    LikeSection,
    PostCardDetailed,
    CommentSection,
    PostPanel,
  },
  methods: {
    getPostFromAPI,
    // Récupère les informations du post de l'API pour les afficher
    async assignPostInformations() {
      let post = await getPostFromAPI(this.$route.params.id);
      if (!post.error) {
        this.requestedNumLikes = post.numLikes;
        this.requestedUserliked = post.isLiked;
        this.id_post = post.id_post;
        this.post_id_user = post.id_user;
        if (post.id_user == this.userId) {
          this.post_user_nickname = "Vous";
        } else {
          this.post_user_nickname = post.nickname;
        }
        this.post_title = post.title;
        this.post_user_picture = post.picture;
        this.post_image = post.image;
        this.post_text = post.post_text;
        this.modify_title = this.post_title;
        this.modify_text = this.post_text;
        let date = new Date(post.date_created);
        this.post_date_created = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        this.post_time_created = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        if (parseInt(this.userId) == parseInt(this.post_userId)) {
          this.sameUser = true;
          return;
        }
        return;
      }
      this.$router.push("/whatsnew"); // Redirection lorsque le post n'existe pas
    },
    // Prépare le post pour l'envoyer à l'API puis redirige vers whatsnew
    updatePostPage() {
      this.assignPostInformations();
    },
  },
  created() {
    this.assignPostInformations();
  },
};
</script>

<style scoped lang="scss">
#post_section {
  margin: auto;
  width: 90%;
  margin-top: 30px;
  padding-top: 40px;
}
#post_card {
  background-color: white;
  border: 2px solid #fd2d01;
  border-radius: 10px;
}
.title_container {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 40px;
  border: 2px solid red;
  margin-bottom: 20px;
  border-radius: 50px;
  background-color: white;
  h1 {
    margin: 0;
  }
}
</style>
