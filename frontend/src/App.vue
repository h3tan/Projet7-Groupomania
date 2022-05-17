<template>
  <div id="app">
    <nav v-if="isLogged == false" id="loginSign">
      <router-link to="/login/">Connexion</router-link> |
      <router-link to="/signup">Création de compte</router-link>
    </nav>
    <nav v-if="isLogged == true" id="logged">
      <router-link to="/userinfos">Vos Informations</router-link> |
      <router-link to="/whatsnew">Quoi de neuf</router-link>
    </nav>
    <div v-if="isLogged == false" class="title">
      <img alt="Groupomania logo" src="./assets/Groupomania-logo-red.png" />
      <h1>Réseau social interne</h1>
    </div>
    <router-view />
  </div>
</template>

<script>
import { userLogOut } from "./functions/fetchUser.js";
import { userLogged } from "./functions/fetchUser.js";

export default {
  data() {
    return {
      isLogged: userLogged(),
    };
  },
  methods: {
    userLogOut,
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

img {
  width: 300px;
}
</style>
