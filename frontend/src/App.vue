<template>
  <div id="app">
    <nav>
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/signup">Création de compte</router-link>
    </nav>
    <div class="login">
      <img alt="Groupomania logo" src="./assets/Groupomania-logo-red.png" />
      <h1>Réseau Social Interne</h1>
      <router-view />
    </div>
  </div>
</template>

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
</style>
