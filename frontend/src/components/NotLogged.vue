<template>
  <header>
    <nav id="loginSign">
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/signup">Création de compte</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NotLogged",
};
</script>

<style scoped lang="scss">
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
