<template>
  <div id="vue">
    <nav
      id="loginSign"
      v-if="
        $route.path == '/signup/' ||
        $route.path == '/signup' ||
        $route.path == '/login' ||
        $route.path == '/login/'
      "
    >
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/signup">Création de compte</router-link>
    </nav>
    <nav
      id="logged"
      v-if="
        $route.path == '/userinfos' ||
        $route.path == '/userinfos/' ||
        $route.path == '/whatsnew' ||
        $route.path == '/whatsnew/'
      "
    >
      <router-link to="/userinfos">Vos Informations</router-link> |
      <router-link to="/whatsnew">Quoi de neuf</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>
