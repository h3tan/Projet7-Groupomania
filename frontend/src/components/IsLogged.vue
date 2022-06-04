<template>
  <div
    class="nav_section"
    @click="toggleNav"
    v-if="$store.state.logState == true"
  >
    <div class="nav_section__post" @click="togglePostMenu">
      <img id="logo" alt="Groupomania logo" src="../assets/icon.png" />
      <div class="nav_section__post__bar">
        <i class="fas fa-bars"></i>
      </div>
      <transition name="SlideNav">
        <nav class="nav_section__post__menu" v-if="show_nav_post">
          <router-link to="/whatsnew">Sujets récents</router-link>
          <router-link to="/newcomments">Commentaires récents</router-link>
          <router-link to="/newpost">Poster un nouveau message</router-link>
        </nav>
      </transition>
    </div>
    <div class="nav_section__user" @click="toggleUserMenu">
      <h4>{{ nickname }}</h4>
      <div class="avatar_box">
        <UserAvatar :avatar="avatar" v-if="$store.state.logState == true" />
      </div>
      <transition name="SlideNav">
        <nav class="nav_section__user__menu" v-if="show_nav_user">
          <router-link to="/userinfos">Vos Informations</router-link>
          <div class="logout">
            <i class="fas fa-sign-out-alt"></i>
            <router-link class="logout__link" to="/login" @click="logOut"
              >Se déconnecter</router-link
            >
          </div>
        </nav>
      </transition>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "IsLogged",
  data() {
    return {
      nickname: "",
      avatar: "",
      show_nav_user: false,
      show_nav_post: false,
    };
  },
  components: {
    UserAvatar,
  },
  methods: {
    toggleUserMenu() {
      if (document.querySelector(".avatar_box")) {
        if (!this.show_nav_user) {
          this.show_nav_user = true;
          document.querySelector(".avatar_box").style.backgroundColor = "red";
        } else {
          this.show_nav_user = false;
          document.querySelector(".avatar_box").style.backgroundColor = "white";
        }
      }
    },
    togglePostMenu() {
      if (!this.show_nav_post) {
        this.show_nav_post = true;
      } else {
        this.show_nav_post = false;
      }
    },
    logOut() {
      localStorage.clear();
      this.$store.dispatch("changeLogState");
      this.$router.push("/login");
    },
  },
  created() {
    this.nickname = localStorage.getItem("nickname");
    this.avatar = localStorage.getItem("avatar");
  },
  mounted() {
    document.addEventListener("click", (event) => {
      if (document.querySelector(".avatar_box") != null) {
        // If the clicked element is not a child of #sideNav..
        if (event.target.closest("#header") === null) {
          this.show_nav_user = false;
          this.show_nav_post = false;
          document.querySelector(".avatar_box").style.backgroundColor = "white";
        }
      }
    });
  },
};
</script>

<style scoped lang="scss">
#logo {
  width: 50px;
}
.nav_section {
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  margin: auto;

  &__post {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &__post__bar {
    width: 30px;
    font-size: 25px;
    height: 30px;
  }
  &__post__menu {
    padding: 10px;
    left: 0%;
    width: 200px;
    display: flex;
    position: absolute;
    flex-direction: column;
    text-align: start;
    top: 60px;
    line-height: 30px;
    background-color: #333;

    a {
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
  }

  &__user {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 170px;
    position: relative;
    h4 {
      margin-right: 10px;
      width: 100px;
    }
    &__menu {
      padding: 10px;
      right: 0;
      display: flex;
      position: absolute;
      flex-direction: column;
      text-align: start;
      top: 60px;
      line-height: 30px;
      background-color: #333;

      a {
        font-weight: bold;
        color: white;
        text-decoration: none;
      }
    }
  }
  /*   &__icon {
    font-size: 25px;
    position: relative;
    width: 50px;
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid red;
  } */
}

.avatar_box {
  display: flex;
  border-bottom: 2px solid red;
  width: 60px;
  height: 59px;
  justify-content: center;
  align-items: center;
}
.avatar_container {
  overflow: hidden;
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.logout {
  display: flex;
  align-items: center;
  color: white;
  &__link {
    margin-left: 5px;
  }
}

.SlideNav-enter-active,
.SlideNav-leave-active {
  transition: all 0.5s;
}
.SlideNav-enter-from,
.SlideNav-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: top;
}
.SlideNav-enter-to,
.SlideNav-leave-from {
  transform: scale(1);
  transform-origin: top;
}
</style>
