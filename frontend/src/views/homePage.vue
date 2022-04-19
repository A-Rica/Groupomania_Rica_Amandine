<template >
  <section v-if="authenficated" class="section-homePage">testi test</section>
  <section v-else class="section-homePage2">
    <img src="../assets/icon-left-font-monochrome-black.png" />
    Merci de vous reconnecter afin d'accéder aux réseaux Groupomania;
    <button
      id="connexion"
      class="connexion"
      name="connexion"
      type="submit"
      @click="redirection"
    >
      Redirection vers la page connexion.
    </button>
  </section>
</template>
<script>
// import de la map Getters
import { mapGetters } from "vuex";

export default {
  name: "Wall-post",

  computed: {
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),
  },

  methods: {
    // fonction de redirection en cas ou l'utilisateur est déconnecté, visant à le renvoyé à la page connexion
    redirection() {
      this.$router.push({ name: "connexion" });
    },
  },
};
</script>
<style lang="scss">
.section-homePage {
  display: flex;
  flex-direction: column;
  background-color: #c4c4fd;
  box-shadow: 1px 2px 5px #635c9b;
  width: 70%;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
}

.section-homePage2 {
  display: flex;
  flex-direction: column;
  background-color: #c4c4fd;
  box-shadow: 1px 2px 5px #635c9b;
  border-radius: 20px;
  width: 43%;
  height: 50%;
  padding: 15px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  img {
    margin-left: auto;
    margin-right: auto;
    height: 50px;
  }
}
.connexion {
  width: 40%;
  height: 25px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  color: white;
  background-color: #7272a5;
  &:hover {
    background-color: darken(#7272a5, 10%);
  }
}
</style>
