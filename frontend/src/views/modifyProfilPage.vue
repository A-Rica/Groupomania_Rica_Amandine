<template>
  <section class="section-membersPage">
    <label for="name">Nom:</label>
    <input
      v-model="users.name"
      id="name"
      type="text"
      placeholder="Votre nom ici"
    />
    <label for="lastname">Prenom: </label>
    <input
      v-model="users.lastname"
      id="lastname"
      type="text"
      placeholder="Votre prénom ici"
    />
    <label for="email">Email:</label>
    <input
      v-model="users.email"
      id="email"
      name="email"
      type="email"
      placeholder="Votre adresse mail: nom@hotmail.fr"
    />
    <label for="password">Mot de passe: </label>
    <input
      v-model="users.password"
      id="password"
      name="password"
      type="password"
      placeholder="Entrez ici votre mot de passe"
    />
    <label for="file">Votre image de profil:</label>
    <input
      @change="onFileChange"
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
      users: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        image: "",
        // file: null,
        id: localStorage.getItem("userId"),
      },
      submitted: true,
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
      //   this.users.file = this.$refs.file.files[0];
      this.users.image = this.$refs.file.files[0];
      //   this.users.images = URL.createObjectURL(this.users.file);
    },
    updateProfil() {
      this.submitted = true;

      const formData = new FormData();
      console.log(this.users.image);
      formData.append("image", this.users.image);
      formData.append("name", this.users.name);
      formData.append("lastname", this.users.lastname);
      formData.append("password", this.users.password);
      formData.append("email", this.users.email);

      axios
        .put(
          "http://localhost:3000/api/profil/" + localStorage.getItem("userId"),

          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          const confimration = confirm(
            "Désirez vous vraiment modifier votre profil?"
          );
          if (confimration) {
            alert("Votre profil à bien été modifié.");
          } else {
            alert("Demande de modification annulé.");
          }
          location.reload();
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.section-membersPage {
  display: flex;
  flex-direction: column;
  background-color: #c4c4fd;
  background-image: url("../assets/Pattern-Transparent-Background.png");
  background-size: cover;
  box-shadow: 1px 2px 5px #635c9b;
  width: 50%;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
}
</style>