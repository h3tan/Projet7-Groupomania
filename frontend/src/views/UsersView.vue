<template>
  <div id="users">
    <h1>Utilisateurs</h1>
    <div class="users_container">
        <UserCard
          :id_user="user.id_user"
          :avatar="user.picture"
          :nickname="user.nickname"
          v-for="user in users"
          :key="user.id_user"
        />
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard";
import { requestAllUsersInfos } from "@/functions/fetchUser";

export default {
  name: "UsersView",
  data() {
    return {
      users: [],
      avatar: "",
      nickname: "",
    };
  },
  components: {
    UserCard,
  },
  methods: {
    requestAllUsersInfos,
    async assignUsersInfos() {
      let reponse = await requestAllUsersInfos();
      if (!reponse.error) {
        this.users = reponse;
      }
    },
  },
  created() {
    this.assignUsersInfos();
  },
};
</script>

<style scoped lang="scss">
#users {
  width: 100%;
  margin: auto;
  padding-top: 1px;
  padding-left: 5px;
  padding-right: 5px;
}
.users_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
