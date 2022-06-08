<template>
  <div id="error_page">
    <NavButton link="/whatsnew" nav_button_name="Revenir à la page d'accueil"/>
    <h1>Erreur, impossible de retrouver les données</h1>
  </div>
</template>

<script>
import NavButton from "@/components/NavButton";

export default {
  name: "ErrorPageView",
  components: {
    NavButton,
  },
};
</script>

<style scoped lang="scss">
#error_page {
  padding-top: 50px;
  h1 {
    margin-top: 150px;
  }
}
</style>
