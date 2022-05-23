<template>
  <section v-if="authenficated">
    <div class="section-profil">
      <img :src="user.image" class="image-profil" alt="Image de votre profil" />
      <div class="hoverImage">
        <span @click="ModifProfil(user.id)">Modifier votre profil</span>
      </div>
      <h2>{{ user.lastname }} {{ user.name }}</h2>
      <span class="textMail"
        ><b>Email:</b> {{ user.email }} <br />
        <b>Date d'inscription: </b> {{  new Date(user.createdAt).toLocaleString() }} <br /><b>Vous êtes</b>
        {{ user.role }}</span
      >
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyProfil",

  computed: {
    // comme pour la navbar utilisation de mapGetter afin d'afficher ou non le profil en cas de connexion ou non
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),

  },
  
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
    margin-top: 0;
  }
  .textMail {
    
    font-size: 14px;
  }
}

@media screen and (max-width: 992px)
{
.section-profil {
  width: 80%;
  height: 250px;
  .hoverImage {
     background-color: transparent;
    position: relative;
    opacity: 0.8;
    margin-top: 0px;
    margin-left: 30%; 
      h2 {
  margin-top: -20px;
  }
  }
  }
}
</style>