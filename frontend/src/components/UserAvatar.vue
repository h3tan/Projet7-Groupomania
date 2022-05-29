<template>
  <div class="avatar_container">
    <img alt="avatar" :src="avatar" />
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
