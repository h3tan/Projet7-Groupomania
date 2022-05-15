<template>
  <div class="login">
    <h2>{{ msg }}</h2>
    <form id="login">
      <label for="nickname">Nom d'utilisateur</label>
      <input id="nickname" type="text" v-model="nickname" />
      <label for="password">Mot de passe</label>
      <input id="password" type="password" v-model="password" />
      <formButton @click="sendLoginForm" buttonName="Se Connecter" />
    </form>
  </div>
</template>

<script>
import formButton from "./SubmitFormButton.vue";

export default {
  name: "LogIn",
  data() {
    return {
    nickname: "",
    password: "",
    }
  },
  components: {
    formButton,
  },
  props: {
    msg: String,
  },
  methods: {
      async sendLoginForm() {
      try {
        let signUpFormJson = await fetch(
          "http://localhost:3000/api/auth/login",
          {
            mode: "cors",
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nickname: `${this.nickname}`,
              password: `${this.password}`,
            }),
          }
        );
        let reponse = await signUpFormJson.json();
        console.log(reponse);
      } catch (err) {
        let message = `Impossible de trouver l'API`;
        throw new Error(message);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  margin-top: 40px;
}

h2 {
  font-size: 22px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
}

h2::after {
  background-color: lightgrey;
  content: "";
  display: block;
  height: 1px;
  margin-top: 2px;
  width: 100%;
}

#login {
  width: 90%;
  margin: auto;
}

label {
  display: flex;
  margin-top: 20px;
  font-weight: bold;
  font-size: 17px;
}

input {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 30px;
  padding-left: 5px;

  &:focus {
    background-color: lightblue;
  }
}
</style>
