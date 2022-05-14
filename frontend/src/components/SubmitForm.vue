<template>
    <button>{{ buttonName }}</button>
</template>

<script>
export default {
  name: "formButton",
  props: {
    buttonName: String,
  },
};
</script>

<style lang="scss">
$color-formButton: rgb(243, 10, 10);

button {
    margin-top: 50px;
    width: 200px;
    height: 50px;
    background-color: $color-formButton;
    font-size: 20px;
    color: white;
    border-radius: 30px;
    border: none;

    &:active {
        background-color: darken($color-formButton, 20);
    }
}
</style>