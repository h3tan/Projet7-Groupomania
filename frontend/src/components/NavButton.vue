<template>
  <router-link class="nav_button" :to="link">{{ nav_button_name }}</router-link>
</template>

<script>
export default {
    name: "NavButton",
    props: {
        link: String,
        nav_button_name: String
    }
}
</script>

<style scoped lang="scss">
.nav_button {
  height: 30px;
  background-color: #4E5166;
  cursor: pointer;
  font-size: 18px;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  &:focus {
    outline: none !important;
    border: 2px solid black;
  }
}
a {
    text-decoration: none;
}
</style>
