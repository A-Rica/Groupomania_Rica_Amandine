<template>
  <div id="app">
    <navBar />
    <router-view />
  </div>
</template>
<script>
import navBar from "./components/navBar.vue";
export default {
  name: "App",
  components: {
    navBar,
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
