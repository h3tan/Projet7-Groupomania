<template>
  <div class="post_card" :data-id_post="id_post" :data-count="count_post">
    <router-link :to="`/post/${id_post}`">
      <h2>{{ post_title }}</h2>
    </router-link>
    <div class="posted">
      <div class="posted__by_user">
        <UserAvatar :avatar="`${user_picture}`" />
        <h3>{{ nickname }}</h3>
      </div>
      <div class="date_time_post">
        <span>{{ date_post }}</span>
        <span>Heure</span>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";

export default {
  name: "PostCardMin",
  data() {
    return {};
  },
  props: [
    "count_post",
    "id_post",
    "post_title",
    "user_picture",
    "nickname",
    "date_post",
  ],
  components: {
    UserAvatar,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.post_card {
  border: 1px solid #fd2d01;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
}

h2 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: black;
  margin-top: 0;
  margin-bottom: 0;
  border-bottom: 1px solid #fd2d01;
}
a {
  text-decoration: none;

  &:visited {
    color: #fd2d01;
  }
}
h3 {
  font-weight: lighter;
  margin-left: 5px;
}
.posted {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 10px;
  height: 60px;

  &__by_user {
    display: flex;
    height: 100%;
  }
}
.date_time_post {
  display: flex;
  flex-direction: column;
}
.avatar_container {
  margin-top: 5px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
span {
  margin-left: 5px;
}
</style>
