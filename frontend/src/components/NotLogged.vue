<template>
  <div class="nav_menu" @click="toggleNav">
    <transition name="textAppear">
      <h3 v-if="!show_nav_menu">Menu</h3>
    </transition>
    <transition name="SlideNav">
      <nav id="login_sign" v-if="show_nav_menu">
        <router-link to="/login">Connexion</router-link>
        <router-link to="/signup">S'inscrire</router-link>
      </nav>
    </transition>
    <div class="nav_menu__icon">
      <transition name="showMenu">
        <i class="fas fa-angle-left" v-if="!rotateIcon"></i>
      </transition>
      <transition name="hideMenu">
        <i class="fas fa-angle-down" v-if="rotateIcon"></i>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotLogged",
  data() {
    return {
      show_nav_menu: false,
      rotateIcon: false,
    };
  },
  methods: {
    toggleNav() {
      if (!this.show_nav_menu) {
        this.show_nav_menu = true;
        document.querySelector(".nav_menu__icon").style.backgroundColor = "#FD2D01";
        this.rotateIcon = true;
      } else {
        this.show_nav_menu = false;
        document.querySelector(".nav_menu__icon").style.backgroundColor =
          "white";
        this.rotateIcon = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", (event) => {
      if (document.querySelector(".nav_menu__icon") != null) {
        // If the clicked element is not a child of #sideNav..
        if (event.target.closest("#header") === null) {
          this.show_nav = false;
          this.rotateIcon = false;
          document.querySelector(".nav_menu__icon").style.backgroundColor =
            "white";
        }
      }
    });
  },
};
</script>

<style scoped lang="scss">
.nav_menu {
  display: flex;
  position: relative;
  cursor: pointer;
  h3 {
    margin-right: 15px;
  }
  &__icon {
    font-size: 25px;
    display: flex;
    width: 50px;
    justify-content: center;
    height: 60px;
    padding-top: 15px;
    border-bottom: 2px solid #FD2D01;
    i {
      position: absolute;
    }
  }
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

    /* &.router-link-exact-active {
      color: #e72113;
    } */
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

.showMenu-enter-active,
.showMenu-leave-active {
  transition: transform 0.5s;
}
.showMenu-enter-from,
.showMenu-leave-to {
  transform: rotate(-90deg);
  transform-origin: center;
}

.hideMenu-enter-active {
  transition-delay: 0.5s;
}
.hideMenu-enter-from,
.hideMenu-leave-to {
  opacity: 0;
}

.textAppear-enter-active,
.textAppear-leave-active {
  transition: all 0.5s;
}
.textAppear-enter-from,
.textAppear-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
