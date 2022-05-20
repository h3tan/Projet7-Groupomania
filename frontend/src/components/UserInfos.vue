<template>
  <div class="infos">
    <h3>
      Pseudo: <span>{{ nickname }}</span>
    </h3>
    <h3>
      E-mail: <span>{{ email }}</span>
    </h3>
    <h3>
      Privilège: <span>{{ privilege }}</span>
    </h3>
  </div>
</template>

<script>
import { requestUserInfos } from "../functions/fetchUser.js";

export default {
  name: "UserInfos",
  data() {
    return {
      nickname: "",
      email: "",
      privilege: "",
    };
  },
  methods: {
    async assignUserInfos() {
      let reponse = await requestUserInfos(localStorage.getItem("userId"));
      this.nickname = reponse[0].nickname;
      this.email = reponse[0].email;
      this.privilege = reponse[0].privilege;
    },
  },
  created() {
    this.assignUserInfos();
  },
};
</script>

<style>
.infos {
  text-align: start;
  margin-top: 60px;
  border: 1px solid red;
  border-radius: 20px;
  padding-left: 10px;
}
</style>
