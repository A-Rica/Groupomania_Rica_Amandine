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
    <Form class="formulaire" v-if="mode == 'login'" @submit="submit()">
     
   <label for="email">Email: </label>
      <Field
        v-model="user.email"
        id="email"
        name="email"
        type="email"
        placeholder="Votre adresse mail: nom@hotmail.fr" :rules="isRequired" 
      />
      <!-- message indiquant que le champs est vide -->
<ErrorMessage name="email" class="errorMessage"/>
      <label class="label-password" for="password">Mot de passe: </label>
      <Field
        v-model="user.password"
        id="password"
        name="password"
        type="password"
        placeholder="Entrez ici votre mot de passe" :rules="isRequired"
      />
         <!-- message indiquant que le champs est vide -->
 <ErrorMessage name="password" class="errorMessage"/>
      <button id="connexion" class="connexion" name="connexion" type="submit">
        Connexion
      </button>
    </form>
    <!-- formulaire inscription avec les mêmes champs que connexion mais avec le noms et prenom -->
    <!-- Ne pas oublier mettre message avertissement quand le formulaire est mal rempli -->
    <Form class="formulaire" v-else @submit.prevent="createdUser()">
 
     <label for="email">Email: </label>
      <Field
        v-model="user.email"
        id="email"
        name="email"
        type="email"
        placeholder="Votre adresse mail: nom@hotmail.fr" :rules="isRequired"
      />
    <ErrorMessage name="email" class="errorMessage"/>
    <label class="label-lastname" for="lastname">Prénom: </label>
      <Field
        v-model="user.lastname"
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Ici votre prénom" :rules="isRequired"
      />
      
      <label class="label-name" for="name">Nom: </label>
      <Field
        v-model="user.name"
        id="name"
        name="name"
        type="text"
        placeholder="Ici votre nom"  :rules="isRequired" 
      />
<span class="positionErrorMessage"><ErrorMessage name="lastname" class="errorMessage"/> <ErrorMessage name="name" class="errorMessageName"/></span>
      <label class="label-password" for="password">Mot de passe: <b>(doit contenir lettre en majuscule et minuscule et 2 chiffres avec un minimum de 5 lettres)</b> </label>
      <Field
        v-model="user.password"
        id="password"
        name="password"
        type="password"
        placeholder="Entrez ici votre mot de passe" :rules="isRequired"
      />
  <ErrorMessage name="password" class="errorMessage"/>
      <button class="connexion" id="subscribe" name="subscribe" type="submit">
        Inscription
      </button>
    </form>
  </section>
</template>
<script>
// import depuis le store des données lié à l'authentification avec en data le mode pour switcher et les données de l'utilisateur
import { mapActions, mapState } from "vuex";
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  name: "MyUser",
  // importation des composant lier au plugin vee validate
   components: {
    Field,
    Form,
    ErrorMessage,
  }, 
 data: function () {
    return {
      mode: "login",
      // data lier aux information envoyer lors de l'inscription et la connexion
         user: {
             email: "",
        name: "",
        lastname: "",
        password: "",
        image: "http://localhost:3000/pardefaut.png1647426103961.png",
        role: "utilisateur",}
    }
    },
 
  // La methode pour switcher entre l'inscription et la connexion
  methods: {
    // condition if Is Required, indiquand que le message d'erreur  doit s'afficher quand les champs ne sont pas rempli
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }

      return 'Ce champs est requis';
    },
// fonction permettant de switcher d'un mode à l'autre. Login et inscription
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
    submit( ) {
   this.signin(this.user);  
      },
  
    // Fonction ayant le même but que submit, sauf que c'est pour l'enregistrement d'un utilisateur
    createdUser( ) {  
  
    this.signup(this.user);
        
       
      }
 
  },
};
</script>
<style scoped lang="scss">
// Lier à la page de connexion et inscription
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
  // redimension de l'image
  img {
    margin-left: auto;
    margin-right: auto;
    width: 35%;
  }
  // format du titre H1
  h1 {
    font-size: 25px;
    text-align: center;
    color: black;
  }
  // format du titre h2
  h2 {
    font-size: 15px;
    text-align: center;
    color: black;
    margin-top: -10px;
    // mise en forme du lien
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
// Css lier au formulaire
.formulaire {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  label {
    margin-left: 10px;
    b{
      font-size: 12.5px;
    }
  }

  input {
    width: 98%;
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
  
  margin-left: 50%;
    height: 19.5px;
    width: 49%;
  }
  .errorMessage{
    color: black;
    font-size: 13px;
    font-weight: bold;
  }

  .positionErrorMessage{
    display: flex;
    flex-direction: row;
  }
    .errorMessageName{
    color: black;
    font-size: 13px;
    margin-left: 36%;
    font-weight: bold;
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