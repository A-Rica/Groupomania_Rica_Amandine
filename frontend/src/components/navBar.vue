<template>
  <nav id="navBar">
    <img src="../assets/icon-left-font-monochrome-white.png" />
    <span class="icon-Menue" @click="showNavBarSwitch"
      ><i class="fa-solid fa-bars"></i
    ></span>
    <div class="menue-profil" v-if="showNavBar"></div>
  </nav>
</template>
<script>
export default {
  name: "navBar",
  data: function () {
    return {
      showNavBar: false,
    };
  },
  methods: {
    showNavBarSwitch() {
      this.showNavBar = !this.showNavBar;
      // alert(!this.showNavBar);
    },
  },
};
</script>
<style lang="scss" scoped>
#navBar {
  display: flex;
  background-color: #565363;
  height: 50px;
  img {
    height: 50px;
    margin-left: 20px;
  }
  .icon-Menue {
    color: white;
    font-size: 30px;
    margin-top: 8px;
    margin-left: 65%;
    cursor: pointer;
  }
  .menue-profil {
    margin-top: 50px;
    margin-left: -27%;
    background-color: white;
    width: 30%;
    height: 100px;
  }
}
</style> 
