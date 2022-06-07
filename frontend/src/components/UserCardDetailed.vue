<template>
  <div class="user_card" :data-id_user="id_user">
    <div class="avatar_box">
      <UserAvatar :avatar="avatar" />
    </div>
    <div class="nickname">{{ nickname }}</div>
    <div class="real_names">
      <p>Nom: {{ last_name }}</p>
      <p>Prénom: {{ first_name }}</p>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";

export default {
  name: "UserCardDetailed",
  props: ["id_user", "avatar", "nickname", "last_name", "first_name"],
  components: {
    UserAvatar,
  },
};
</script>

<style scoped lang="scss">
.user_card {
  width: 70%;
  border: 2px solid red;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;
  padding-bottom: 20px;
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
.real_names {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  p {
      margin: 5px;
  }
}
</style>
