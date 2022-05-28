<template>
  <div
    class="nav_menu"
    @click="toggleNav"
  >
    <transition name="textAppear">
      <h3 v-if="!show_nav">Menu</h3>
    </transition>
    <transition name="SlideNav">
      <nav id="login_sign" v-if="show_nav">
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
      show_nav: false,
      rotateIcon: false,
    };
  },
  methods: {
    toggleNav() {
      if (!this.show_nav) {
        this.show_nav = true;
        document.querySelector(".nav_menu__icon").style.backgroundColor = "red";
        this.rotateIcon = true;
      } else {
        this.show_nav = false;
        document.querySelector(".nav_menu__icon").style.backgroundColor = "white";
        this.rotateIcon = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.nav_menu {
  display: flex;
  h3 {
    margin-right: 15px;
  }
  &__icon {
    font-size: 25px;
    width: 50px;
    height: 60px;
    padding-top: 15px;
    border-bottom: 1px solid red;
  }
}

i {
  position: absolute;
  right: 28px;
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
