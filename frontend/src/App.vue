<template>
  <div id="main_vue">
    <header>
      <img alt="Groupomania logo" src="./assets/Groupomania-logo-red.png" />
      <IsLogged v-if="$store.state.logState == true" />
      <NotLogged v-if="$store.state.logState == false" />
    </header>
    <router-view />
  </div>
</template>

<script>
import IsLogged from "./components/IsLogged.vue";
import NotLogged from "./components/NotLogged.vue";
export default {
  components: {
    NotLogged,
    IsLogged,
  },
  beforeCreate() {
    this.$store.dispatch("changeLogState");
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
img {
  width: 100px;
}
</style>
