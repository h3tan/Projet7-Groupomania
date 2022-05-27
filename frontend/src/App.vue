<template>
  <div id="main_vue">
    <header>
      <div id="logo">
        <img alt="Groupomania logo" src="./assets/Groupomania-logo-red.png" />
      </div>
      <IsLogged v-if="$store.state.logState == true" />
      <NotLogged v-if="$store.state.logState == false" />
    </header>
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
    return {
      show_nav: false,
      rotateIcon: false,
    };
  },
  components: {
    NotLogged,
    IsLogged,
  },
  methods: {
    toggleNav() {
      if (!this.show_nav) {
        this.show_nav = true;
        document.querySelector(".nav_menu__icon").style.backgroundColor =
          "rgb(27, 27, 110)";
        this.isClicked = !this.isClicked;
        this.rotateIcon = true;
      } else {
        this.show_nav = false;
        document.querySelector(".nav_menu__icon").style.backgroundColor =
          "white";
        this.rotateIcon = false;
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch("changeLogState");
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
  background-color: grey;
}
</style>
