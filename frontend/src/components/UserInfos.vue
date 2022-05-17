<template>
  <div class="infos">
    <h3>Id: <span>{{id }}</span></h3>
    <h3>e-mail: <span>{{ email }}</span></h3>
  </div>
</template>

<script>
export default {
  name: "UserInfos",
  data() {
    return {
      id: 3,
      email: "Pendragon@Avalon.com"
    }
  }
}
</script>

<style scoped>
.infos {
  text-align: start;
  margin-top: 60px;
  border: 1px solid red;
  border-radius: 20px;
  padding-left: 10px;
}


</style>