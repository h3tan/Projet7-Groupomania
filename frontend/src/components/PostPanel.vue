<template>
  <div id="post_panel">
    <ModifyPost
      v-if="show_modify_post"
      @cancelPost="toggleModifyPost"
      @postUpdated="requestUpdatePostInfosInView"
      :id_post="id_post"
      :post_id_user="post_id_user"
      :post_title="post_title"
      :post_text="post_text"
      :post_image="post_image"
    />
    <PostButton post_button_name="Modifier" @click="toggleModifyPost" />
    <PostButton post_button_name="Supprimer" @click="deletePost" />
  </div>
</template>

<script>
import ModifyPost from "@/components/ModifyPost";
import PostButton from "@/components/PostButton";
import { requestDeletePostFromAPI } from "@/functions/fetchPost";

export default {
  name: "PostPanel",
  data() {
    return {
      show_modify_post: false,
    };
  },
  props: ["id_post", "post_id_user", "post_title", "post_text", "post_image"],
  components: {
    PostButton,
    ModifyPost,
  },
  methods: {
    requestDeletePostFromAPI,
    async deletePost() {
        let reponse = await requestDeletePostFromAPI(this.id_post);
        if (!reponse.error) {
            this.$router.push(`/whatsnew/`);
        }
    },
    toggleModifyPost() {
      if (!this.show_modify_post) {
        this.show_modify_post = true;
      } else {
        this.show_modify_post = false;
      }
    },
    requestUpdatePostInfosInView() {
        this.$emit("requestUpdatePostInfosInView");
    }
  },
};
</script>

<style scoped lang="scss">
#post_panel {
  border: 2px solid red;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  column-gap: 10px;
  height: 80px;
  margin-top: 15px;
}
</style>
