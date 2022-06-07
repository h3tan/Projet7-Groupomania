<template>
  <div class="user_card" data-id_user="id_user">
    <router-link :to="`users/${nickname}`">
      <div class="avatar_box">
        <UserAvatar :avatar="avatar" />
      </div>
      <div class="nickname">{{ nickname }}</div>
    </router-link>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";

export default {
  name: "UserCard",
  props: ["id_user", "avatar", "nickname"],
  components: {
    UserAvatar,
  },
};
</script>

<style scoped lang="scss">
.user_card {
  width: 160px;
  border: 2px solid red;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: white;
}
.avatar_box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 20px;
}
.avatar_container {
  overflow: hidden;
  border-radius: 10%;
  width: 120px;
  height: 120px;
}
.nickname {
  padding-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}
</style>
