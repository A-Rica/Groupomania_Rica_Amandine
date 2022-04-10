<template>
  <section class="section-connectPage">
    <h1>Bienvenue sur le réseau social de l'entreprise Groupomania.</h1>
    <!-- titre switchant vers l'inscription -->
    <h2 v-if="mode == 'login'">
      Si vous n'avez toujours pas de compte chez nous, merci de bien vouloir
      vous
      <span class="lien-inscription" @click="switchCreateUser()">inscrire</span>
    </h2>
    <!-- titre switchant vers la connexion -->
    <h2 v-else>
      Si vous avez déjà un compte chez nous, merci de bien vouloir vous
      <span class="lien-inscription" @click="switchLogin()">connecter</span>
    </h2>
    <!-- formulaire connexion contenant l'email et le mot de passe -->
    <form class="formulaire" v-if="mode == 'login'">
      <label for="email">Email: </label>
      <input
        v-model="email"
        id="email"
        name="email"
        type="email"
        placeholder="Votre adresse mail: nom@hotmail.fr"
      />

      <label class="label-password" for="password">Mot de passe: </label>
      <input
        v-model="password"
        id="password"
        name="password"
        type="password"
        placeholder="Entrez ici votre mot de passe"
      />
      <input
        id="connexion"
        class="connexion"
        name="connexion"
        type="button"
        @click="connectedUser()"
        value="Connexion"
      />
    </form>
    <!-- formulaire inscription avec les mêmes champs que connexion mais avec le noms et prenom -->
    <form class="formulaire" v-else>
      <label for="email">Email: </label>
      <input
        v-model="email"
        id="email"
        name="email"
        type="email"
        placeholder="Votre adresse mail: nom@hotmail.fr"
      />
      <label class="label-lastname" for="lastname">Prénom: </label>
      <input
        v-model="lastname"
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Ici votre prénom"
      />
      <label class="label-name" for="name">Nom: </label>
      <input
        v-model="name"
        id="name"
        name="name"
        type="text"
        placeholder="Ici votre nom"
      />

      <label class="label-password" for="password">Mot de passe: </label>
      <input
        v-model="password"
        id="password"
        name="password"
        type="password"
        placeholder="Entrez ici votre mot de passe"
      />

      <input
        class="connexion"
        id="subscribe"
        name="subscribe"
        type="button"
        @click="createdUser()"
        value="S'inscrire"
      />
    </form>
  </section>
</template>

<style scoped lang="scss">
.section-connectPage {
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
  img {
    margin-left: auto;
    margin-right: auto;
    width: 35%;
  }
  h1 {
    font-size: 25px;
    text-align: center;
    color: black;
  }
  h2 {
    font-size: 15px;
    text-align: center;
    color: black;
    margin-top: -10px;
    .lien-inscription {
      color: #525273;
      cursor: pointer;
      &:hover {
        color: darken(#525273, 10%);
        text-decoration: underline;
      }
    }
  }
}

.formulaire {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  label {
    margin-left: 10px;
  }
  input {
    height: 20px;
    border-radius: 5px;
  }
  .label-lastname {
    margin-top: 10px;
  }
  .label-password {
    margin-top: 10px;
  }
  #lastname {
    width: 47%;
  }

  .label-name {
    margin-top: -43.5px;
    margin-left: 51%;
  }
  #name {
    // margin-top: -43px;
    margin-left: 50%;
    height: 19.5px;
    width: 49%;
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

  #subscribe {
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
}
</style>
<script>
import connectDataService from "../service/connectDataService";
import { mapState } from "vuex";

export default {
  name: "MyUser",
  data: function () {
    return {
      mode: "login",
      email: "",
      name: "",
      lastname: "",
      password: "",
      submitted: false,
    };
  },

  methods: {
    switchCreateUser: function () {
      this.mode = "create";
    },
    switchLogin: function () {
      this.mode = "login";
    },
    computed: {
      ...mapState(["user"]),
    },
    createdUser() {
      const data = {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        image: "http://localhost:3000/pardefaut.png1647426103961.png",
        role: "user",
        password: this.password,
      };

      connectDataService
        .signup(data)
        .then((response) => {
          this.data;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    connectedUser() {
      const loginUser = {
        email: this.email,
        password: this.password,
      };
      // console.log(loginUser);
      connectDataService
        .login(loginUser)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "home" });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>