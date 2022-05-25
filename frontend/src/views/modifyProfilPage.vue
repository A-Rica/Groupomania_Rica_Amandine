<template>
<!-- page pour la modification et suppression du compte utilisateur -->
  <section><div class="section-membersPage"><Form @submit="updateProfil()" >
    <label for="name">Nom:</label>
    <Field
      v-model="users.name"
      name="name"
      id="name"
      type="text"
      v-bind:placeholder="user.name" :rules="isRequired"
    />
    <ErrorMessage name="name" class="errorMessage"/><br/>
    <label for="lastname">Prenom: </label>
    <Field
      v-model="users.lastname"
      name="lastname"
      id="lastname"
      type="text"
      v-bind:placeholder="user.lastname" :rules="isRequired"
    />
    <ErrorMessage name="lastname" class="errorMessage"/><br/>
    <label for="email">Email:</label>
    <Field
      v-model="users.email"
      id="email"
      name="email"
      type="email"
      v-bind:placeholder="user.email" :rules="isRequired"
    />
    <ErrorMessage name="email" class="errorMessage"/><br/>
    <label for="password">Mot de passe: </label>
    <Field
      v-model="users.password"
      id="password"
      name="password"
      type="password"
      placeholder="Entrez ici votre mot de passe" :rules="isRequired"
    />
    <ErrorMessage name="password" class="errorMessage"/><br/>
    <label for="image">Votre image de profil:</label>
    <input
      @change="onFileChange"
      type="file"
      ref="file"
      name="image"
      id="image"
      accept=".jpg, .jpeg, .gif, .png"
    />
    <div class="positionButton"><button
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
    </div>
   </Form></div>
  </section>
</template>
<script>
// import d'axios et du map Getters. Mise en place de la data.
import axios from "axios";
import { mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from 'vee-validate';


export default {
  name: "ModifyProfilPage",
   components: {
    Field,
    Form,
    ErrorMessage,
  }, 
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
     isRequired(value) {
      if (value && value.trim()) {
        return true;
      }

      return 'Champs obligatoire';
    },
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
  form{
     display: flex;
  flex-direction: column;
  }
  .imgEntete {
    margin-left: auto;
    margin-right: auto;
    height: 50px;
  }
  .errorMessage{
    color: black;
    font-size: 13px;
    font-weight: bold;
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
@media screen and (max-width: 992px)
{
.section-membersPage {
  width: 90%;
  margin-top: 70%;
}
}
</style>