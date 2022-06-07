<template>
  <div id="confirm_box">
    <h2>{{ confirm_message }}</h2>
    <div id="confirm_box__buttons">
      <PostButton
        @click.prevent="confirm(true)"
        post_button_name="Confirmer"
        class="confirm_button"
      />
      <PostButton
        @click.prevent="confirm(false)"
        post_button_name="Annuler"
        class="confirm_button"
      />
    </div>
  </div>
</template>

<script>
import PostButton from "@/components/PostButton";

export default {
  name: "ConfirmBox",
  props: ["confirm_message"],
  components: {
    PostButton,
  },
  methods: {
    confirm(bool) {
      this.$emit("confirm", { result_confirm: bool });
    },
  },
};
</script>

<style scoped lang="scss">
#confirm_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  z-index: 5;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 100px;
  height: 240px;
  text-align: center;
  color: white;
  background-color: #4e5166;
  border: 3px solid black;
  border-radius: 10px;
  padding: 20px;
  h2 {
    margin-bottom: 30px;
  }
  &__buttons {
    display: flex;
    justify-content: center;
    column-gap: 20px;
    row-gap: 0px;
    cursor: pointer;
  }
}
.confirm_button {
  width: 150px;
}
</style>
