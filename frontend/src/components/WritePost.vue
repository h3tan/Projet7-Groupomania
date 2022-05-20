<template>
  <form id="new_post_form" v-on:submit.prevent="publishPost">
    <label for="post_title"><h4>Titre du post</h4></label>
    <input id="post_title" name="post_title" type="text" v-model="post_title" />
    <label for="post_text"><h4>Texte du post</h4></label>
    <textarea id="post_text" name="post_text" type="text" v-model="post_text" />
    <button class="send">Publier</button>
    <p>{{ result }}</p>
  </form>
</template>

<script>
import { sendPost } from "@/functions/fetchPost.js";

export default {
  name: "WritePost",
  data() {
    return {
      post_title: "",
      post_text: "",
      result: "",
    };
  },
  methods: {
    sendPost,
    async publishPost() {
      let reponse = await sendPost(this.post_title, this.post_text);
      if (!reponse.error) {
        setTimeout(() => {
          this.result = "Message posté !";
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
