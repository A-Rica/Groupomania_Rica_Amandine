<template >
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
    <form class="formulaire" v-if="mode == 'login'" @submit.prevent="submit">
      <label for="email">Email: </label>
      <input
        v-model="user.email"
        id="email"
        name="email"
        type="email"
        placeholder="Votre adresse mail: nom@hotmail.fr"
      />

      <label class="label-password" for="password">Mot de passe: </label>
      <input
        v-model="user.password"
        id="password"
        name="password"
        type="password"
        placeholder="Entrez ici votre mot de passe"
      />
      <button id="connexion" class="connexion" name="connexion" type="submit">
        Connexion
      </button>
    </form>
    <!-- formulaire inscription avec les mêmes champs que connexion mais avec le noms et prenom -->
    <!-- Ne pas oublier mettre message avertissement quand le formulaire est mal rempli -->
    <form class="formulaire" v-else @submit.prevent="createdUser()">
      <label for="email">Email: </label>
      <input
        v-model="user.email"
        id="email"
        name="email"
        type="email"
        placeholder="Votre adresse mail: nom@hotmail.fr"
      />
      <label class="label-lastname" for="lastname">Prénom: </label>
      <input
        v-model="user.lastname"
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Ici votre prénom"
      />
      <label class="label-name" for="name">Nom: </label>
      <input
        v-model="user.name"
        id="name"
        name="name"
        type="text"
        placeholder="Ici votre nom"
      />

      <label class="label-password" for="password">Mot de passe: </label>
      <input
        v-model="user.password"
        id="password"
        name="password"
        type="password"
        placeholder="Entrez ici votre mot de passe"
      />
      <button class="connexion" id="subscribe" name="subscribe" type="submit">
        Inscription
      </button>
    </form>
  </section>
</template>
<script>
// import depuis le store des données lié à l'authentification avec en data le mode pour switcher et les données de l'utilisateur
import { mapActions, mapState } from "vuex";

export default {
  name: "MyUser",
  data: function () {
    return {
      mode: "login",
      user: {
        email: "",
        name: "",
        lastname: "",
        password: "",
        image: "http://localhost:3000/pardefaut.png1647426103961.png",
        role: "utilisateur",
      },
      submitted: false,
    };
  },
  // La methode pour switcher entre l'inscription et la connexion
  methods: {
    switchCreateUser: function () {
      this.mode = "create";
    },
    switchLogin: function () {
      this.mode = "login";
    },
    // l'utilisation des données lier à la map state et actions.
    computed: {
      ...mapState(["user"]),
    },
    ...mapActions({
      signin: "auth/signin",
      signup: "auth/signup",
    }),
    // fonction permettant de mettre en lien le store et la page, avec auth/signin et la map user. Pour ensuite faire une redirection vers la page Home
    submit() {
      this.signin(this.user);
      this.$router.push({ name: "home" });
    },
    // Fonction ayant le même but que submit, sauf que c'est pour l'enregistrement d'un utilisateur
    createdUser() {
      this.signup(this.user);
    },
  },
};
</script>
<style scoped lang="scss">
.section-connectPage {
  display: flex;
  flex-direction: column;
  background-color: #c4c4fd;
  background-image: url("../assets/Pattern-Transparent-Background.png");
  background-size: cover;
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