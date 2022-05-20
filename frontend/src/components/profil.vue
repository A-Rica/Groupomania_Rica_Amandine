<template>
  <section v-if="authenficated">
    <div class="section-profil">
      <img :src="user.image" class="image-profil" />
      <div class="hoverImage">
        <span @click="ModifProfil(user.id)">Modifier votre profil</span>
      </div>
      <h2>{{ user.lastname }} {{ user.name }}</h2>
      <span
        ><b>Email:</b> {{ user.email }} <br />
        <b>Date d'inscription: </b> {{  new Date(user.createdAt).toLocaleString() }} <br /><b>Vous êtes</b>
        {{ user.role }}</span
      >
    </div>
  </section>
</template>

<script>
// import de mapGetters, axios et moment
import { mapGetters } from "vuex";
// import axios from "axios";
// import moment from "moment";
export default {
  name: "MyProfil",
  // data: function () {
  //   return {
  //     image: "",
  //     name: "",
  //     lastname: "",
  //     email: "",
      // inscription: moment($store.getters.user.createdAt).format("DD/MM/YYYY"),
  //     role: "",
  //   };
  // },
  computed: {
    // comme pour la navbar utilisation de mapGetter afin d'afficher ou non le profil en cas de connexion ou non
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),

  },
  // mise en place d'une fonction afin de lire les données de l'utilisateur. Utilisation du package moment afin de modifié le format de la date.
  // created: function () {
  //   axios.get("http://localhost:3000/api/profil/me").then((user) => {
  //     this.image = user.data.image;
  //     this.name = user.data.name;
  //     this.lastname = user.data.lastname;
  //     this.email = user.data.email;
  //     this.inscription = 
  //     this.role = user.data.role;
  //   });
  // },
  methods: {
    // fonction permettant de rediriger l'utilisateur vers la modification de son profil.
    ModifProfil: function (userId) {
      console.log(userId);
      this.$router.push({ path: "/profil/" + userId });
    },
  
  },

};
</script>
<style lang="scss">
.section-profil {
  display: flex;
  flex-direction: column;
  float: left;
  background-image: url("../assets/Pattern-Transparent-Background.png");
  background-size: cover;
  background-color: #c4c4fd;
  box-shadow: 1px 2px 5px #635c9b;
  border-radius: 20px;
  width: 250px;
  padding: 15px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: auto;
  .image-profil {
    width: 125px;
    height: 125px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 100px;
  }
  .hoverImage {
    display: flex;
    width: 115px;
    height: 115px;
    background-color: #a5a0bd;
    margin-top: -50%;
    margin-left: 25%;
    border-radius: 100px;
    padding: 5px;
    opacity: 0;
    transition: opacity 700ms;
    span {
      text-align: center;
      margin-top: auto;
      margin-bottom: auto;
      font-weight: bold;
      opacity: 1;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    &:hover {
      opacity: 0.8;
    }
  }
  h2 {
    text-align: center;
  }
  span {
    font-size: 14px;
  }
}
</style>