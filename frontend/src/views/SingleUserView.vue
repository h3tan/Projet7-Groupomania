<template>
  <div id="user" :data-nickname="$route.params.nickname">
    <navButton link="/users" nav_button_name="Retour" />
    <div class="title_container">
      <h1>Informations utilisateur</h1>
    </div>
    <UserCardDetailed
      :id_user="id_user"
      :avatar="picture"
      :nickname="$route.params.nickname"
      :last_name="last_name"
      :first_name="first_name"
    />
  </div>
</template>

<script>
import NavButton from "@/components/NavButton";
import UserCardDetailed from "@/components/UserCardDetailed";
import { requestAnotherUserInfosFromAPI } from "@/functions/fetchUser";

export default {
  name: "SingleUserView",
  data() {
    return {
      id_user: "",
      picture: "",
      nickname: "",
      last_name: "",
      first_name: "",
    };
  },
  components: {
    UserCardDetailed,
    NavButton,
  },
  methods: {
    requestAnotherUserInfosFromAPI,
    async assignUserInfos() {
      let reponse = await requestAnotherUserInfosFromAPI(
        this.$route.params.nickname
      );
      if (!reponse.err) {
        this.id_user = reponse.id_user;
        this.picture = reponse.picture;
        this.last_name =
          reponse.last_name == null ? "Non Renseigné" : reponse.last_name;
        this.first_name =
          reponse.first_name == null ? "Non Renseigné" : reponse.first_name;
      }
    },
  },
  beforeCreate() {
    if (this.$store.state.logState == false) {
      this.$router.push("/login");
    }
  },
  created() {
    this.assignUserInfos();
  },
};
</script>

<style scoped lang="scss">
#user {
  padding-top: 50px;
}
.title_container {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
