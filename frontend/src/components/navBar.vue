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
        <li @click="getUser">
          <span>Profil<i class="fa-solid fa-user"></i></span>
        </li>
        <li @click="signout">
          <span>Déconnexion<i class="fa-solid fa-right-from-bracket"></i></span>
        </li>
      </ul>
    </div>
    <img src="../assets/icon-left-font-monochrome-white.png" />
  </nav>
</template>
<script>
// import profilDataService from "../services/profilDataService";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "navBar",
  data: function () {
    return {
      showNavBar: false,
      currentUser: null,
    };
  },
  computed: {
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({ signoutAction: "auth/signout" }),

    signout() {
      this.signoutAction().then(() => {
        this.$router.replace({
          name: "connexion",
        });
      });
    },

    getUser() {
      this.$router.push({ name: "profil" });
      console.log(mapActions);
    },
    showNavBarSwitch() {
      this.showNavBar = !this.showNavBar;
      // alert(!this.showNavBar);
    },
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
  .menue-profil {
    z-index: 0;
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
