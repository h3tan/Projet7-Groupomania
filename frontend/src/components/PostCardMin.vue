<template>
  <div class="post_card" :data-id_post="id_post" :data-count="count_post">
    <div class="post_title">
      <router-link :to="`/post/${id_post}`">
        <h2>{{ post_title }}</h2>
      </router-link>
    </div>
    <div class="posted">
      <div class="posted__by_user">
        <UserAvatar :avatar="`${user_picture}`" />
        <h3>{{ nickname }}</h3>
      </div>
    </div>
    <DateComponent
      :date_created_prop="date_post"
      :date_updated_prop="date_updated"
    />
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";
import DateComponent from "@/components/DateComponent";

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
    "date_updated"
  ],
  components: {
    UserAvatar,
    DateComponent,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.post_card {
  border: 2px solid #fd2d01;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
}
.post_title {
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 2px solid #fd2d01;
  padding: 15px;
  h2 {
    color: black;
    margin: 0;
  }
}
a {
  text-decoration: none;

  &:visited {
    color: #fd2d01;
  }
}
h3 {
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
  span {
    display: flex;
    justify-content: flex-end;
  }
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
