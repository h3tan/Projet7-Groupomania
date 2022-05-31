<template>
  <div id="main_vue">
    <transition name="toggleNavBar">
      <header>
        <div id="navbar">
          <div id="logo_not_logged" v-if="$store.state.logState == false">
            <img id="logo"
              alt="Groupomania logo"
              src="./assets/Groupomania-logo-red.png"
            />
          </div>
          <div id="logo_logged" v-if="$store.state.logState == true">
          </div>
          <NotLogged v-if="$store.state.logState == false" />
          <IsLogged v-if="$store.state.logState == true" />
        </div>
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
#logo {
  width: 100px;
}
body {
  margin: 0;
  margin-top: 100px;
}
main {
  min-height: 800px;
  max-width: 1000px;
  margin: auto;
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
  z-index: 5;
  background-color: white;
  transition: top 0.3s;
}
#navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: auto;
}
#logo_not_logged {
  height: 50px;
}

#logo_logged {
  img {
    width: 50px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

footer {
  height: 160px;
  margin-top: 40px;
  width: 100%;
  background-color: grey;
}
</style>
