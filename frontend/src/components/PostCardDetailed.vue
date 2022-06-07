<template>
  <div id="post_card" :data-id_post="id_post" :data-id_user="post_id_user">
    <div class="posted">
      <div class="posted__by_user">
        <UserAvatar :avatar="post_user_picture" />
        <h2 id="nickname">{{ post_user_nickname }}</h2>
      </div>
    </div>
    <div class="post_body">
      <div class="post_body__picture" v-if="post_image != null">
        <img alt="Image posté par l'utilisateur" :src="post_image" />
      </div>
      <div class="post_body__text_container">
        <p>{{ post_text }}</p>
      </div>
    </div>
    <DateComponent
      :date_created_prop="post_date_created"
      :date_updated_prop="post_date_updated"
    />
  </div>
</template>

<script>
import DateComponent from "@/components/DateComponent";
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "PostCardDetailed",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      privilege: localStorage.getItem("privilege"),
      fileChosen: false,
      file_name: "",
      file_type: "",
      file_upload: "",
      type_of_add: "Ajouter une image",
      confirm_add: "Ajouter",
      requestedUserliked: "",
      requestedNumLikes: "",
    };
  },
  props: [
    "id_post",
    "post_id_user",
    "post_user_picture",
    "post_title",
    "post_image",
    "post_text",
    "post_user_nickname",
    "post_date_created",
    "post_date_updated",
  ],
  components: {
    DateComponent,
    UserAvatar,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
#post_card {
  background-color: white;
  border: 2px solid #fd2d01;
  border-radius: 10px;
}
h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  margin-top: 0;
  margin-bottom: 0;
}
.posted {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #fd2d01;
  padding-left: 5px;
  padding-right: 10px;
  height: 60px;

  &__by_user {
    display: flex;
    height: 100%;
    align-items: center;
  }
}
#nickname {
  margin-left: 5px;
  margin-top: 0;
  margin-bottom: 0;
}
.avatar_container {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
h3 {
  font-size: 16px;
}
.post_body {
  &__picture {
    margin: auto;
    margin-top: 30px;
    max-width: 95%;
    border-radius: 5px;
    overflow: hidden;
    padding: 5px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      object-fit: cover;
    }
  }
  &__text_container {
    overflow-wrap: break-word;
    text-align: left;
    padding: 10px;
    font-size: 18px;
  }
}
label {
  width: 80%;
  text-align: start;
}
h4 {
  margin-top: 20px;
  margin-bottom: 5px;
}
</style>
