<template>
  <div id="main_vue">
    <transition name="toggleNavBar">
      <header id="navbar">
        <div id="logo">
          <img alt="Groupomania logo" src="./assets/Groupomania-logo-red.png" />
        </div>
        <IsLogged v-if="$store.state.logState == true" />
        <NotLogged v-if="$store.state.logState == false" />
      </header>
    </transition>
    <main>
      <router-view />
    </main>
    <footer></footer>
  </div>
</template>

<script>
import IsLogged from "./components/IsLogged.vue";
import NotLogged from "./components/NotLogged.vue";
export default {
  data() {
    return {};
  },
  components: {
    NotLogged,
    IsLogged,
  },
  methods: {
    toggleHeaderOnScroll() {
      var prevScrollpos = window.pageYOffset;
      window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
          document.getElementById("navbar").style.top = "0";
        } else {
          document.getElementById("navbar").style.top = "-60px";
        }
        prevScrollpos = currentScrollPos;
      };
    },
  },
  beforeCreate() {
    this.$store.dispatch("changeLogState");
  },
   mounted() {
    this.toggleHeaderOnScroll();
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  margin-top: 100px;
}
header {
  display: flex;
  height: 60px;
  position: fixed;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  border-bottom: 2px solid red;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 5;
  background-color: white;
  transition: top 0.3s;
}

#logo {
  height: 50px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
img {
  width: 100px;
}
footer {
  height: 160px;
  margin-top: 40px;
  background-color: grey;
}
</style>
