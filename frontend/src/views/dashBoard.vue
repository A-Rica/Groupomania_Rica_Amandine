<template>
<section>
    <div class="section-homePage">
     <h2>Les Membres</h2>
    <div class="displayRow"> <div class="formMembers" v-for="user in users" v-bind:key="user.id">
     <div class="textFormMembers"><img v-bind:src="user.image" class="imgAvatarMembers"/>
     <span><b>{{user.name}} {{user.lastname}}</b>
     {{ user.email }},<br>
     {{ user.role }}</span> 
     <span class="icon-Menue" @click="showNavBarSwitch(user.id)"
      ><i class="fa-solid fa-bars"></i
    ></span>

    <div class="menueMembers" v-if="showNavBarId == user.id">
    <ul>
      <li>liste 1</li>
      <li> liste 2</li>
    </ul></div>
    </div></div> 
     </div>
     <h2>Les Messages</h2>
     <h2>Les Commentaires</h2>
    </div>
</section>
</template>
<script>
 import axios from "axios";
import moment from "moment";
export default {
  name: "PageMembers",
  data: function () {
    return {
      showNavBar: false,
      showNavBarId: null,
      users: [],

    };
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
showNavBarSwitch(userId) {
     this.showNavBarId = userId;
     this.showNavBar = !this.showNavBar;
      // alert(!this.showNavBar);
    },
 }
}
</script>
<style lang="scss" scoped>
.section-homePage {
  display: flex;
  flex-direction: column;
  float: right;
  background-color: #c4c4fd;
  background-image: url("../assets/Pattern-Transparent-Background.png");
  background-size: cover;
  box-shadow: 1px 2px 5px #635c9b;
  width: 70%;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  margin-right: 30px;
  h2{
      margin-left: 5%;
      color: #565363;
      text-shadow: 2px 1px 0px white;
  }
}
.displayRow{
    display: flex;
    flex-direction: row;
}
.formMembers{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
   .textFormMembers{
       display: inline-flex;
       flex-direction: row;
       margin-top: 10px;
           background-color: white; 
    border-radius: 20px;
       margin-left: auto;
    margin-right: auto;
    width: 300px;
    .imgAvatarMembers{
    display:block;
    width: 70px;
    border-radius: 20px;
}
span{
// height: 70px;
font-size: 13px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 10px;
    b{
        font-size: 15px;
    }
}
.icon-Menue{
    margin-left: auto;
    margin-right: auto;
    margin-top: 25px;
    font-size: 17px;
}
   }
   .menueMembers {
     position:absolute;
    z-index: 1;
    margin-top: 50px;
    margin-left: 12%;
    padding-left: 10px;
    padding-right: 10px;
    // width: 12%;
    min-height: 100px;
    ul {
      list-style: none;
      margin-top: -0%;
      // margin-left: -15%;
      li {
        display: flex;
        padding: 10px;
        background-color: white;
        transition: all 0.5s ease-out;
        cursor: pointer;
        &:hover {
          color: white;
          background-color: #635c9b;
        }
      }
    }
   }
}
</style>