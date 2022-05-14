<template>
  <Login msg="Veuillez vous connecter"/>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'LoginView',
  components: {
    Login
  }
}
</script>

<style lang="scss">
img {
    width: 300px;
}
</style>