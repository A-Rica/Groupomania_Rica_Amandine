<template>
<!-- mise en place de l'affichage des membres inscrit sur le site 
rajout plus tard de la possibilité de voir les messages, le nombre de message et commentaire -->
  <section><div class="section-membersPage">
    <div class="center-block">
      <div v-for="user in users" v-bind:key="user.id" class="block-members">
        <img v-bind:src="user.image" class="img-members" alt="image de profil"/>
      <span class="displayInfos">  <h3>{{ user.name }} {{ user.lastname }}</h3>
        <p>
          {{ user.role }}<br />
          {{ user.email }}
        </p>
        </span>
      </div>
    </div>
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
      // data lier aux utilisateur en array
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
    // visualisation des données des utilisateur présent dans la base de données
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
      margin-top: 10px;
      border-radius: 20px;
      box-shadow: 1px 2px 5px #635c9b;
      .img-members {
        width: 100px;
        height: 100px;
        object-fit: cover;
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
@media screen and (max-width: 992px)
{
  .section-membersPage {
position: absolute;
  width: 85%;
 top: 50%;
 left: 5%;
 .center-block {
 
    margin-left: 5px;
   .block-members { 
      margin-top: 10px;
      flex-direction: row;
      width: 95%;
      padding: 5px;
      margin-left: 0px;
    
      .displayInfos{
        margin-right: 10px;
      }
      .img-members {
        width: 30%;
      }
   }
   }
}
}
</style>