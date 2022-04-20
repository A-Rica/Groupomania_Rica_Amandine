<template>
  <section class="section-membersPage">
    <label for="name">Nom:</label>
    <input v-model="name" id="name" type="text" placeholder="Votre nom ici" />
    <label for="lastname">Prenom: </label>
    <input
      v-model="lastname"
      id="lastname"
      type="text"
      placeholder="Votre prénom ici"
    />
    <label for="email">Email:</label>
    <input
      v-model="email"
      id="email"
      name="email"
      type="email"
      placeholder="Votre adresse mail: nom@hotmail.fr"
    />
    <label for="password">Mot de passe: </label>
    <input
      v-model="password"
      id="password"
      name="password"
      type="password"
      placeholder="Entrez ici votre mot de passe"
    />
    <label for="file">Votre image de profil:</label>
    <input
      @change="onFileChange()"
      type="file"
      ref="file"
      name="image"
      id="file"
      accept=".jpg, .jpeg, .gif, .png"
    />
    <button
      @click="updateProfil"
      class="connexion"
      id="subscribe"
      name="subscribe"
      type="submit"
    >
      Modifier
    </button>
  </section>
</template>
<script>
// import d'axios et du map Getters. Mise en place de la data.
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ModifyProfilPage",
  data: function () {
    return {
      user: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        newImage: "./backend/images_default/image-default-user.png",
        file: null,
        id: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),
  },
  // fonction pour lire l'id de l'utilisateurs pour pouvoir ensuite l'upgrade. Fonction update à revoir.
  created: function () {
    axios.get("http://localhost:3000/api/profil/me").then((user) => {
      this.id = user.data.id;
    });
  },

  methods: {
    onFileChange() {
      this.file = this.$refs.file.files[0];
      this.newImage = URL.createObjectURL(this.file);
    },
    updateProfil() {
      this.submitted = true;
      const formData = new FormData();
      // console.log(this.file);
      console.log(
        "http://localhost:3000/api/profil/" +
          this.$router.currentRoute.value.params.id
      );

      formData.append("image", this.file);
      axios.put(
        "http://localhost:3000/api/profil/" +
          this.$router.currentRoute.value.params.id,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.section-membersPage {
  display: flex;
  flex-direction: column;
  background-color: #c4c4fd;
  box-shadow: 1px 2px 5px #635c9b;
  width: 50%;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
}
</style>