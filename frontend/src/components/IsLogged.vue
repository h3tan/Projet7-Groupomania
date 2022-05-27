<template>
  <div class="nav_menu" @click="toggleNav" v-if="$store.state.logState == true">
    <div class="nav_menu__user">
      <h4>{{ nickname }}</h4>
      <UserAvatar :avatar="avatar" v-if="$store.state.logState == true"/>
    </div>
    <nav id="logged">
      <router-link to="/userinfos">Vos Informations</router-link>
      <router-link to="/whatsnew">Quoi de neuf</router-link>
    </nav>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

export default {
  name: "IsLogged",
  data() {
    return {
      nickname: "",
      avatar: ""
    };
  },
  components: {
    UserAvatar,
  },
  created() {
    this.nickname = localStorage.getItem("nickname");
    this.avatar = localStorage.getItem("avatar");
  }
};
</script>

<style scoped lang="scss">
.nav_menu {
  display: flex;
  h3 {
    margin-right: 15px;
  }
  &__user {
    display: flex;
    align-items: center;
    h4 {
      margin-right: 10px;
    }
  }
  &__icon {
    font-size: 25px;
    width: 50px;
    height: 60px;
    padding-top: 15px;
    border-bottom: 1px solid red;
  }
}

i {
  position: absolute;
  right: 28px;
}

nav {
  padding: 10px;
  right: 0px;
  display: flex;
  position: absolute;
  flex-direction: column;
  text-align: start;
  top: 60px;
  line-height: 30px;
  background-color: #333;

  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
}
</style>
