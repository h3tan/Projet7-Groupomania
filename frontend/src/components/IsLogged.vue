<template>
  <header>
    <nav id="logged">
      <router-link to="/userinfos">Vos Informations</router-link> |
      <router-link to="/whatsnew">Quoi de neuf</router-link> |
    </nav>
  </header>
</template>

<script>
export default {
  name: "IsLogged",
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
