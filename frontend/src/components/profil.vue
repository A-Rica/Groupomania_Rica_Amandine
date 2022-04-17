<template>
  <section class="section-profil" v-if="authenficated">
    <img
      src="https://i44.servimg.com/u/f44/17/45/43/58/pardef10.png"
      class="image-profil"
    />
    <h2>{{ lastname }} {{ name }}</h2>
  </section>
</template>
<style lang="scss">
.section-profil {
  display: flex;
  flex-direction: column;
  float: left;
  background-color: #c4c4fd;
  box-shadow: 1px 2px 5px #635c9b;
  border-radius: 20px;
  width: 250px;
  padding: 15px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: auto;
  .image-profil {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 100px;
  }
  h2 {
    text-align: center;
  }
}
</style>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "MyProfil",
  data: function () {
    return {
      image: "",
      name: "",
      lastname: "",
    };
  },
  computed: {
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),
  },
  created: function () {
    axios.get("http://localhost:3000/api/profil/me").then((user) => {
      this.image = user.data.image;
      this.name = user.data.name;
      this.lastname = user.data.lastname;
    });
  },
};
</script>