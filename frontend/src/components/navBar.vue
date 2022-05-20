<template>
  <nav id="navBar" v-if="authenficated">
    <span class="icon-Menue" @click="showNavBarSwitch" v-if="!showNavBar"
      ><i class="fa-solid fa-bars"></i
    ></span>
    <span class="icon-Menue" @click="showNavBarSwitch" v-else
      ><i class="fa-solid fa-x"></i
    ></span>
    <div class="menue-profil" v-if="showNavBar">
      <ul>
        <li @click="getHome">
          <span>Homes <i class="fa-solid fa-house"></i></span>
        </li>
        <li @click="getUsers">
          <span>Membres <i class="fa-solid fa-user-group"></i></span>
        </li>

        <li @click="getdashboard" v-if="administrator == 'administrateur' ">
          <span>Dashboard <i class="fa-solid fa-folder-open"></i></span>
        </li>

        <li @click="signout">
          <span>Déconnexion<i class="fa-solid fa-right-from-bracket"></i></span>
        </li>
      </ul>
    </div>
    <span class="welcomeUser">Bienvenue {{ lastname }} </span>
    <img src="../assets/icon-left-font-monochrome-white.png" />
  </nav>
</template>
<script>
// import de la map Getters et Action ainsi qu'Axios
import { mapGetters, mapActions } from "vuex";

export default {
  name: "navBar",
  data: function () {
    return {
      showNavBar: false,
      currentUser: null,
      name: "",
      lastname: "",
      administrator: false
    };
  },
  computed: {
    // utilisation de mapGetters afin d'avoir l'information si l'utilisateur est connecté ou non afin d'affiché ou non la navbar
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),
   
  },
  // utilisation d'une fonction afin de lire les données de l'utilisateur et ainsi les réutiliser pour afficher le noms et prénom de l'utilisateur
  created: function () {

  let userInfos = JSON.parse(localStorage.getItem('user'))
console.log(userInfos);
  this.lastname = userInfos.lastname
  },
  methods: {
    // mise en place d'une fonction avec map Action pour la déconnection de l'utilisateur et ainsi le renvoyé vers la page connexion
    ...mapActions({ signoutAction: "auth/signout" }),
    signout() {
      this.signoutAction().then(() => {
        this.$router.replace({
          name: "connexion",
        });
      });
    },
    // Mise en place d'un bouton pour envoyé l'utilisateur vers la page membres. Utilisation un switch mode pour afficher le menue
    getUsers() {
      this.$router.push({ name: "members" });
    },
    showNavBarSwitch() {
      this.showNavBar = !this.showNavBar;
      // alert(!this.showNavBar);
    },
    getHome() {
      this.$router.push({ name: "home" });
    },
    getdashboard() {
      this.$router.push({
       path: '/dashboard/' + localStorage.getItem('userId')
      });
    }
  },
  
};
</script>
<style lang="scss" scoped>
#navBar {
  display: flex;
  background-color: #565363;
  height: 50px;
  img {
    margin-left: auto;
    display: block;
    height: 50px;
    margin-right: 20px;
  }
  .icon-Menue {
    color: white;
    font-size: 27px;
    margin-top: 10px;
    margin-left: 50px;
    transition: all 0.2s ease-out;
    cursor: pointer;
    &:active {
      transform: translate(5px, 0);
      opacity: 0;
    }
  }
  .welcomeUser {
    color: white;
    font-size: 20px;
    margin-left: 20px;
    margin-top: auto;
    margin-bottom: auto;
  }
  .menue-profil {
    z-index: 1;
    margin-top: 50px;
    margin-left: -90px;
    padding-left: 10px;
    padding-right: 10px;
    // width: 12%;
    min-height: 100px;
    ul {
      list-style: none;
      margin-top: -0%;
      margin-left: -15%;
      li {
        display: flex;
        height: 47px;
        background-color: white;
        transition: all 0.5s ease-out;
        cursor: pointer;
        &:hover {
          color: white;
          background-color: #635c9b;
        }
        span {
          margin-left: auto;
          margin-right: auto;
          margin-top: 10px;
          font-size: 16px;
          text-decoration: none;
          .color-link {
            text-decoration: none;
            color: black;
            &:hover {
              color: white;
            }
          }
          .fa-user {
            margin-left: 10px;
          }
          .fa-right-from-bracket {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style> 