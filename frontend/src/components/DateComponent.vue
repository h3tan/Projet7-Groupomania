<template>
  <div class="date_container">
    <div class="date_container__created">
      <span>Créé: {{ setDateCreated }}</span>
      <span>à: {{ setTimeCreated }}</span>
    </div>
    <div class="date_container__updated">
      <span>Mis à jour: {{ setDateUpdated }}</span>
      <span>à: {{ setTimeUpdated }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateComponent",
  data() {
    return {
    };
  },
  props: ["date_created_prop", "date_updated_prop"],
  computed: {
    setDateCreated() {
      let date = new Date(this.date_created_prop);
      let day =
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      let date_created_formatted = `${day}/${month}/${date.getFullYear()}`;
      return date_created_formatted;
    },
    setTimeCreated() {
      let time = new Date(this.date_created_prop);
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
    setDateUpdated() {
      let date = new Date(this.date_updated_prop);
      let day =
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      let date_updated_formatted = `${day}/${month}/${date.getFullYear()}`;
      return date_updated_formatted;
    },
    setTimeUpdated() {
      let time = new Date(this.date_updated_prop);
      return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    },
  },
};
</script>

<style scoped lang="scss">
.date_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-top: 2px solid red;
  padding-left: 10px;
  padding-right: 10px;
  &__created,
  &__updated {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 175px;
  }
}
</style>
