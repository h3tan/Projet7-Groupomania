<template>
  <form id="new_post_form" v-on:submit.prevent="publishPost">
    <label for="post_title"><h4>Titre du post</h4></label>
    <input id="post_title" name="post_title" type="text" v-model="post_title" />
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
      <button @click="cancelFileChosen" v-if="fileChosen">Annuler</button>
    </div>
    <label for="post_text"><h4>Texte du post</h4></label>
    <textarea id="post_text" name="post_text" type="text" v-model="post_text" />
    <button class="send" >Publier</button>
    <p>{{ result }}</p>
  </form>
</template>

<script>
import { sendNewPostToAPI } from "@/functions/fetchPost.js";

export default {
  name: "WritePost",
  data() {
    return {
      post_title: "",
      post_text: "",
      fileChosen: false,
      file_name: "",
      file_type: "",
      file_upload: "",
      result: "",
    };
  },
  methods: {
    sendNewPostToAPI,
    handleFileUpload(e) {
      this.fileChosen = false;
      if (e.target.files[0]) {
        this.file_name = e.target.files[0].name;
        this.file_type = e.target.files[0].type;
        this.file_upload = e.target.files[0];
        this.fileChosen = true;
      }
    },
    cancelFileChosen() {
      this.fileChosen = false;
    },
    async publishPost() {
      this.post_title = this.post_title.replace(/'/g, "''"); // Permet d'autoriser les apostrophes dans la requête
      this.post_text = this.post_text.replace(/'/g, "''");
      let reponse = await sendNewPostToAPI(
        parseInt(localStorage.getItem("userId")),
        this.post_title,
        this.post_text,
        this.file_upload
      );
      if (!reponse.error) {
        this.result = "Message posté !";
        setTimeout(() => {
          this.$router.push(`/whatsnew`);
        }, 1000);
      } else {
        this.result = reponse.error;
        return;
      }
      return reponse;
    },
  },
};
</script>

<style scoped>
#new_post_form {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
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
  display: inline-block;
  margin-bottom: 11px;
  padding: 0px 23px 0px;
  border: 1px solid;
  border-radius: 4px;
  text-align: center;
  font-weight: 400;
  cursor: pointer;
}
.send {
  width: 100px;
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
</style>
