<template>
  <Signup msg="Veuillez créer un compte"/>
</template>

<script>
// @ is an alias to /src
import Signup from '@/components/SignUp.vue'

export default {
  name: 'SignUpView',
  components: {
    Signup
  }
}
</script>

<style lang="scss">
img {
    width: 300px;
}
</style>