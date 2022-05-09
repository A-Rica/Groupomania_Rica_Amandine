<template>
  <section><div class="section-membersPage" v-if="authenficated">
    <div class="center-block">
      <div v-for="user in users" v-bind:key="user.id" class="block-members">
        <img v-bind:src="user.image" class="img-members" />
        <h3>{{ user.name }} {{ user.lastname }}</h3>
        <p>
          {{ user.role }}<br />
          {{ user.email }}
        </p>
      </div>
    </div>
    </div>
    <div class="section-membersPage" v-else>
         <img classe ="imgEnTete" src="../assets/icon-left-font-monochrome-black.png" />
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
    </div>
  </section>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "PageMembers",
  data: function () {
    return {
      users: [],
    };
  },
  computed: {
    // // comme pour la navbar utilisation de mapGetter afin d'afficher ou non le profil en cas de connexion ou non
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),
  },
  created: function () {
    axios
      .get("http://localhost:3000/api/profil/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((users) => {
        console.log(users.data);
        this.users = users.data;
        this.users.createdAt = moment(users.data.createdAt).format(
          "DD/MM/YYYY"
        );
      });
  },
  methods: {
         redirection() {
      this.$router.push({ name: "connexion" });
    },
  }
};
</script>
<style lang="scss" scoped>
.section-membersPage {
  display: flex;
  flex-direction: row;
  background-color: #c4c4fd;
  background-image: url("../assets/Pattern-Transparent-Background.png");
  background-size: cover;
  box-shadow: 1px 2px 5px #635c9b;
  width: 70%;
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
  .center-block {
    width: 100%;
    margin-left: 25px;
    .block-members {
      float: left;
      display: flex;
      flex-direction: column;
      background-color: #565363;
      width: 30%;
      margin-left: 15px;
      border-radius: 20px;
      box-shadow: 1px 2px 5px #635c9b;
      .img-members {
        width: 40%;
        border-radius: 100px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5px;
      }
      h3 {
        color: white;
        text-align: center;
      }
      p {
        color: white;
        text-align: center;
        margin-top: -10px;
      }
    }
  }
}
</style>