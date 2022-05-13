<template>
  <div id="app">
    <navBar />
    <profil />
<router-view />
    
  </div>
</template>
<script>
import navBar from "./components/navBar.vue";
import profil from "./components/profil.vue";

export default {
  name: "App",
  components: {
    navBar,
    profil,
  },
};
</script>
<style lang="scss">
body {
  background-color: #e0e0e0;
  margin: 0;
  padding: 0;
}
</style>
