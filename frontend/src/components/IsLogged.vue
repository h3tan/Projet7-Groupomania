<template>
  <div class="nav_menu" @click="toggleNav" v-if="$store.state.logState == true">
    <div class="nav_menu__user" @click="toggleUserMenu">
      <h4>{{ nickname }}</h4>
      <div class="avatar_box">
        <UserAvatar :avatar="avatar" v-if="$store.state.logState == true" />
      </div>
    </div>
    <transition name="SlideNav">
      <nav id="logged" v-if="show_nav">
        <router-link to="/userinfos">Vos Informations</router-link>
        <router-link to="/whatsnew">Quoi de neuf</router-link>
      </nav>
    </transition>
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
      show_nav: false,
    };
  },
  components: {
    UserAvatar,
  },
  methods: {
    toggleUserMenu() {
      if (!this.show_nav) {
        this.show_nav = true;
        document.querySelector(".avatar_box").style.backgroundColor = "red";
      } else {
        this.show_nav = false;
        document.querySelector(".avatar_box").style.backgroundColor = "white";
      }}
    },
  created() {
    this.nickname = localStorage.getItem("nickname");
    this.avatar = localStorage.getItem("avatar");
  },
   mounted() {
    document.addEventListener("click", (event) => {
      // If the clicked element is not a child of #sideNav..
      if (event.target.closest("#navbar") === null) {
        this.show_nav = false;
        document.querySelector(".avatar_box").style.backgroundColor = "white";
      }
    });
  },
};
</script>

<style scoped lang="scss">
.nav_menu {
  display: flex;
  h3 {
    margin-right: 15px;
  }
  &__user {
    display: flex;
    align-items: center;
    h4 {
      margin-right: 10px;
    }
  }
  &__icon {
    font-size: 25px;
    position: relative;
    width: 50px;
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid red;
  }
}
.avatar_box {
  display: flex;
  border-bottom: 1px solid red;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
}
i {
  position: absolute;
  top: 15px;
}

nav {
  padding: 10px;
  right: 0px;
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
