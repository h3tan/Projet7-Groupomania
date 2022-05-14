<template>
  <div class="login">
    <h1>{{ msg }}</h1>
    <form id="login">
      <label for="nickname">Nom d'utilisateur</label>
      <input id="nickname" />
      <label for="password">Mot de passe</label>
      <input id="password" />
      <formButton buttonName="Se Connecter"/>
    </form>
  </div>
</template>

<script>
import formButton from './SubmitForm.vue';

export default {
  name: "LogIn",
  components: {
      formButton
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.signup {
  margin-top: 20px;
}

h1 {
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
}

h1::after {
    background-color: lightgrey;
    content : "";
    display: block;
    height: 1px;
    margin-top: 2px;
    width: 100%;
  }

#signup {
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

  &:focus {
      background-color: lightblue;
  }
}
</style>