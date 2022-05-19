<template>
  <div id="post_card">
    <h2>Titre du post</h2>
    <div class="post_text">Texte du post</div>
    <div class="interact">
      <div class="like">
        <p>ici on va liker</p>
      </div>
      <div class="comment">
        <p>ici on va commenter</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCard",
};
</script>

<style scoped>
#post_card {
  margin: auto;
  margin-top: 50px;
  border: 1px solid red;
  border-radius: 20px;
  width: 80%;
}
h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: 1px solid red;
}
.post_text {
  border-bottom: 1px solid red;
  overflow-wrap: break-word;
  text-align: justify;
  padding: 10px;
}
.interact {
  display: flex;
  height: 50px;
}
.like {
  margin: auto;
  width: 50%;
}
.comment {
  display: flex;
  align-items: center;
  border-left: 1px solid red;
  width: 50%;
}
p {
  margin: 0;
}
</style>
