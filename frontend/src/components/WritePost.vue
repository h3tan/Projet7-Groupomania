<template>
  <form id="new_post_form">
    <label for="post_title"><h4>Titre du post</h4></label>
    <input id="post_title" name="post_title" type="text" v-model="post_title" />
    <label for="post_text"><h4>Texte du post</h4></label>
    <textarea id="post_text" name="post_text" type="text" v-model="post_text" />
    <button class="send">Publier</button>
  </form>
</template>

<script>
export default {
    name: "WritePost",
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

#post_title {
    height: 30px;
}
#post_text {
    height: 100px;
    margin-bottom: 20px;
}
</style>
