<template>
  <div class="like_or_delete">
    <div class="like" v-if="!user">
      <div class="like_icons" @click="modifyLike">
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
import { getLikeFromAPI } from "@/functions/fetchLike.js";
import { sendLikeToAPI } from "@/functions/fetchLike.js";

export default {
  name: "LikeSection",
  props: {
    user: Boolean,
  },
  data() {
    return {
      liked: "",
      num_likes: 0,
    };
  },
  methods: {
    // Récupère le nombre de likes du post ainsi que si l'utilisateur connecté a liké ce post
    async assignLike() {
      let isLiked = await getLikeFromAPI(
        this.$route.params.id,
        localStorage.getItem("userId")
      );
      this.num_likes = isLiked.countLikes;
      if (isLiked.isLiked == 1) {
        this.liked = true;
      }
    },
    // Demande à l'API de modifier le like de l'utilisateur connecté
    async modifyLike() {
      let reponse = await sendLikeToAPI(
        this.$route.params.id,
        localStorage.getItem("userId")
      );
      if (reponse.message == "post liké!") {
        this.liked = true;
        this.num_likes++;
        return;
      }
      this.liked = false;
      this.num_likes--;
    },
  },
  created() {
    this.assignLike();
  },
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
