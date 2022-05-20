<template>
<!-- page pour la modification et suppression du compte utilisateur -->
  <section><div class="section-membersPage">
    <label for="name">Nom:</label>
    <input
      v-model="users.name"
      id="name"
      type="text"
      v-bind:placeholder="user.name"
    />
    <label for="lastname">Prenom: </label>
    <input
      v-model="users.lastname"
      id="lastname"
      type="text"
      v-bind:placeholder="user.lastname"
    />
    <label for="email">Email:</label>
    <input
      v-model="users.email"
      id="email"
      name="email"
      type="email"
      v-bind:placeholder="user.email"
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
    <div class="positionButton"><button
      @click="updateProfil"
      class="update"
      id="update"
      name="update"
      type="submit"
    >
      Modifier
    </button> <button @click="suppressionCompte" class="delete"
      id="delete"
      name="delete"
      type="submit">Suppression du compte</button>
    </div></div>
   
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
      // data lier à la modification de l'utilisateur
      users: {
        name: "",
        lastname: "",
        email: "",
        password: "",
        image: "",
        // file: null,
        id: localStorage.getItem("userId"),
      },
      user: [],
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
    axios
      .get("http://localhost:3000/api/profil/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((user) => {
        this.user = user.data
        this.users.id = user.data.id;
      });
  },

  methods: {
// recupération des information de l'image envoit via l'input
    onFileChange() {
      this.users.image = this.$refs.file.files[0];
    
    },
    updateProfil() {
      this.submitted = true;
// recupération des données entrée par l'utilisateur
      const formData = new FormData();
      console.log(this.users.image);
      formData.append("image", this.users.image);
      formData.append("name", this.users.name);
      formData.append("lastname", this.users.lastname);
      formData.append("password", this.users.password);
      formData.append("email", this.users.email);
// envoit des données dans la base de donnée
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
          // confirmation
          const confirmation = confirm(
            "Désirez vous vraiment modifier votre profil?"
          );
          if (confirmation) {
            alert("Votre profil à bien été modifié.");
          }
          location.reload();
        });
    },

    // Suppression du compte

    suppressionCompte() {
  // suppression du compte de l'utilisateur
axios.delete('http://localhost:3000/api/profil/' + localStorage.getItem("userId"),  {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
          )
          .then(()=>{
            // confirmation
   const confirmation = confirm(
            "Désirez vous vraiment supprimer ce profil?"
          );
          if (confirmation) {
            alert("Ce profil à bien été supprimé.");
          }
          location.reload();
        });
          
    }
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
  .imgEntete {
    margin-left: auto;
    margin-right: auto;
    height: 50px;
  }
  .positionButton{
    
display:flex;
flex-direction: row;
margin-top: 20px;
width: 100%;
  .update{
    width: 40%;
    height: 25px;
    color: white;
   margin-left: auto;
margin-right: auto; 
background-color: #7272a5;
    &:hover {
      background-color: darken(#7272a5, 10%);
    }
  }
  .delete{
     margin-left: auto;
margin-right: auto; 
    width: 40%;
    height: 25px;
    color: white;
    background-color: #7272a5;
    &:hover {
      background-color: darken(#7272a5, 10%);
    }
  } 
   }
}
</style>