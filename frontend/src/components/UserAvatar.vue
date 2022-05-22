<template>
  <div class="avatar_container">
    <img :src="avatar" />
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    avatar: String,
  },
};
</script>

<style lang="scss">
.avatar_container {
  overflow: hidden;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
  }
}
</style>
