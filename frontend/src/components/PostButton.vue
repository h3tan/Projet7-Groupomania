<template>
  <button>{{ post_button_name }}</button>
</template>

<script>
export default {
  name: "PostButton",
  data() {
    return {};
  },
  props: {
    post_button_name: String,
  },
};
</script>

<style scoped lang="scss">
button {
  background-color: #fd2d01;
  padding: 10px;
  opacity: 1;
  cursor: pointer;
  font-size: 22px;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bolder;
  &:focus {
    outline: none !important;
    border: 2px solid black;
  }
}
</style>
