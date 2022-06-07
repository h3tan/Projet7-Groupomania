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
      :post_date_updated="post_date_updated"
    />
    <ConfirmBox
      v-if="show_confirm_box"
      :confirm_message="confirm_message"
      @confirm="deletePostConfirmed"
    />
    <PostPanel
      v-if="post_id_user == userId || privilege == 'admin'"
      :id_post="id_post"
      :post_id_user="post_id_user"
      :post_title="post_title"
      :post_text="post_text"
      :post_image="post_image"
      @requestUpdatePostInfosInView="assignPostInformations"
      @show_confirm_delete="ShowConfirmDelete"
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
import { requestDeletePostFromAPI } from "@/functions/fetchPost";
import ConfirmBox from "@/components/ConfirmBox";

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
      post_date_updated: "",
      sameUser: false,
      requestedUserliked: "",
      requestedNumLikes: "",
      show_confirm_box: "",
      show_confirm_message: "",
      confirm_message: "",
    };
  },
  components: {
    NavButton,
    LikeSection,
    PostCardDetailed,
    CommentSection,
    PostPanel,
    ConfirmBox,
  },
  methods: {
    getPostFromAPI,
    requestDeletePostFromAPI,
    async deletePost() {
      let reponse = await requestDeletePostFromAPI(this.id_post);
      if (!reponse.error) {
        this.$router.push(`/whatsnew/`);
      }
    },
    ShowConfirmDelete() {
      if (this.show_confirm_box == false) {
        this.show_confirm_box = true;
        this.confirm_message = "Voulez-vous vraiment supprimer ce post?";
      }
    },
    async deletePostConfirmed(payload) {
      if (payload.result_confirm == false) {
        this.show_confirm_box = false;
        return;
      }
      this.deletePost();
    },
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
        this.post_date_created = post.date_created;
        this.post_date_updated = post.date_updated;
        if (parseInt(this.userId) == parseInt(this.post_userId)) {
          this.sameUser = true;
          return;
        }
        return;
      }
      this.$router.push("/whatsnew"); // Redirection lorsque le post n'existe pas
    },
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
  width: 95%;
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
