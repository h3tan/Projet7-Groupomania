<template>
  <button>{{ post_button_name }}</button>
</template>

<script>
export default {
  name: "PostButton",
  data() {
    return {
    };
  },
  props: {
      post_button_name: String
  }
};
</script>

<style scoped lang="scss">
button {
  height: 30px;
  background-color: #fd2d01;
  cursor: pointer;
  font-size: 18px;
  color: white;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none !important;
    border: 2px solid black;
  }
}
</style>
