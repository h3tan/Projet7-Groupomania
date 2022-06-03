<template>
  <div class="like_or_delete">
    <div class="like" v-if="!user">
      <div class="like_icons" @click="updateLike">
        <transition name="cancel_like">
          <i id="empty_heart" class="far fa-heart" v-if="!liked"></i>
        </transition>
        <transition name="display_like">
          <i id="filled_heart" class="fas fa-heart" v-if="liked"></i>
        </transition>
      </div>
      <span>J'aime</span>
    </div>
    <button id="delete_button" @click="deletePost" v-if="user">
      Supprimer
    </button>
    <span class="num_likes">{{ num_likes }} likes</span>
  </div>
</template>

<script>
import { requestDeletePostFromAPI } from "@/functions/fetchPost.js";
import { requestDeleteLikeFromAPI } from "@/functions/fetchLike.js";
import { requestInsertLikeFromAPI } from "@/functions/fetchLike.js";

export default {
  name: "LikeSection",
  props: ["user", "liked", "num_likes"],
  methods: {
    requestDeletePostFromAPI,
    // Récupère le nombre de likes du post ainsi que si l'utilisateur connecté a liké ce post
    async updateLike() {
      console.log(this.$route.params)
      if (this.liked == true) {
        let reponse = await requestDeleteLikeFromAPI(
          this.$route.params.id,
        );
        if (reponse.message == "Annulation du like") {
          this.$emit('likeUpdated');
        }
        return;
      }
      if (this.liked == false) {
        let reponse = await requestInsertLikeFromAPI(
          this.$route.params.id,
        );
        if (reponse.message == "Post liké") {
          this.$emit('likeUpdated');
        }
        return;
      }
    },
    async deletePost() {
      let result = await requestDeletePostFromAPI(this.$route.params.id);
      this.$router.push("/whatsnew");
      return result;
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
.like_or_delete {
  width: 50%;
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.like {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30%;

  span {
    margin-top: -15px;
    margin-left: 10px;
  }
}

.like_icons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: -12px;
  height: 30px;
  width: 30px;

  i {
    color: red;
    font-size: 25px;
    background: red;
    background-clip: text;
    -webkit-background-clip: text;
    position: absolute;
  }
  #empty_heart {
    color: black;
  }
}
#delete_button {
  margin-bottom: 10px;
}

// Animation des coeurs
.display_like-enter-from,
.display_like-leave-to {
  transform: scale(0);
}
.display_like-enter-active,
.display_like-leave-active {
  transition: all 0.5s ease;
}

.cancel_like-enter-from,
.cancel_like-leave-to {
  transform: scale(0);
}
.cancel_like-enter-active,
.cancel-like-leave-active {
  transition: all 0.5s ease;
}
</style>
