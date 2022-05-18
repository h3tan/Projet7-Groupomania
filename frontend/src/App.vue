<template>
  <div id="vue">
    <nav v-show="!isLogged" id="loginSign">
      <router-link to="/login/">Connexion</router-link> |
      <router-link to="/signup">Création de compte</router-link>
    </nav>
    <nav v-show="isLogged" id="logged">
      <router-link to="/userinfos/">Vos Informations</router-link> |
      <router-link to="/whatsnew">Quoi de neuf</router-link>
    </nav>
      <router-view />
  </div>
</template>

<script>
import { userLogged } from "./functions/fetchUser.js";

export default {
  data() {
    return {
      isLogged: userLogged(),
    };
  },
  methods: {
    userLogged,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  margin-top: 0;
  color: red;
}

nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #e72113;
    }
  }
}
button {
  height: 30px;
  width: 100px;
}
img {
  width: 300px;
}
</style>
