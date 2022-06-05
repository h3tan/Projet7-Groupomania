<template>
  <div id="write_post">
    <form id="new_post_form">
      <h2>Modifiez votre post</h2>
      <label for="post_title"><h4>Titre du post</h4></label>
      <input
        id="post_title"
        name="post_title"
        type="text"
        v-model="modify_title"
      />
      <div id="add_file">
        <label id="label_file" for="input_file">Ajouter un fichier image</label>
        <input
          type="file"
          id="input_file"
          name="file"
          accept="image/png, image/jpeg, image/gif"
          @change="handleFileUpload($event)"
        />
        <div class="picture_chosen" v-if="fileChosen">
          <div id="image_name">{{ file_name }}</div>
          <div id="image_type">{{ file_type }}</div>
        </div>
        <button id="cancel_file" @click="cancelFileChosen" v-if="fileChosen">
          Annuler
        </button>
      </div>
      <label for="post_text"><h4>Texte du post</h4></label>
      <textarea
        id="post_text"
        name="post_text"
        type="text"
        v-model="modify_text"
      />
      <div class="write_post__buttons">
        <PostButton @click.prevent="updatePost" post_button_name="Modifier" />
        <PostButton @click.prevent="cancelPost" post_button_name="Annuler" />
      </div>
      <transition name="post_result_appear">
        <h3 class="post_result">{{ result }}</h3>
      </transition>
    </form>
  </div>
</template>

<script>
import { requestUpdatePostFromAPI } from "@/functions/fetchPost.js";
import PostButton from "@/components/PostButton.vue";

export default {
  name: "ModifyPost",
  data() {
    return {
      modify_title: this.post_title,
      modify_text: this.post_text,
      fileChosen: false,
      file_name: "",
      file_type: "",
      file_upload: "",
      result: "",
      showPostResult: false,
    };
  },
  props: ["id_post", "post_id_user", "post_title", "post_text", "post_image"],
  components: {
    PostButton
  },
  methods: {
    requestUpdatePostFromAPI,
    handleFileUpload(e) {
      this.fileChosen = false;
      if (e.target.files[0]) {
        this.file_name = e.target.files[0].name;
        this.file_type = e.target.files[0].type;
        this.file_upload = e.target.files[0];
        this.fileChosen = true;
      }
    },
    cancelPost() {
      this.$emit("cancelPost");
    },
    cancelFileChosen() {
      this.fileChosen = false;
    },
    async updatePost() {
      let reponse = await requestUpdatePostFromAPI(
        parseInt(localStorage.getItem("userId")),
        this.id_post,
        this.modify_title,
        this.modify_text,
        this.file_upload,
        this.post_image
      );
      if (!reponse.error) {
        this.result = "Post Modifié !";
        this.modify_title = "";
        this.modify_text = "";
        setTimeout(() => {
          this.$emit("postUpdated");
          this.$emit("cancelPost");
          this.result = "";
        }, 2000);
      } else {
        this.result = reponse.error;
        return;
      }
      return reponse;
    },
  },
};
</script>

<style scoped lang="scss">
#write_post {
  position: fixed;
  z-index: 5;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 100px;
  text-align: center;
  background-color: white;
  border: 1px solid black;
  padding: 20px;
}
#new_post_form {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
input {
  margin-bottom: 30px;
}

h4 {
  margin-top: 0;
  margin-bottom: 10px;
}
label {
  padding-left: 0;
  text-align: start;
}
#add_file {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-bottom: 10px;
}
#input_file {
  display: none;
}
#label_file {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 11px;
  padding: 0px 23px 0px;
  border: 1px solid;
  width: 220px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  font-weight: 400;
  cursor: pointer;
}
.picture_chosen {
  display: flex;
  width: 250px;
  height: 30px;
  align-items: center;
  justify-content: space-around;
  border: 1px solid grey;
  margin-bottom: 10px;
}
#image_name {
  overflow: hidden;
  padding-left: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#image_type {
  border-left: 1px solid grey;
  padding-left: 15px;
  padding-right: 15px;
}
#post_title {
  height: 30px;
}
#post_text {
  resize: vertical;
  max-height: 200px;
  height: 100px;
  margin-bottom: 20px;
}
.write_post__buttons {
  display: flex;
  column-gap: 10px;
}
.post_result {
  font-weight: bold;
  margin-top: 30px;
  color: #FD2D01;
  font-size: 25px;
}

/* Animation du message de résultat d'envoi du post */
.post_result_appear-enter-active,
.post_result_appear-leave-active {
  transition: all 0.5s;
  transition-delay: 0.5s;
}
.post_result_appear-enter-from {
  opacity: 0;
}

.post_result_appear-enter-active,
.post_result_appear-leave-active {
  transition: all 0.5s;
}
</style>
