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
      <li @click="openUpdateProfil()">Modification</li>
      
      <li @click="deleteProfil(user.id)"> Suppression</li>
    </ul>
   
        <div class="blockUpdateProfil" v-if="openUpdateId"> <span class="icon-Menue" @click="closeUpdateProfil()"
      ><i class="fa-solid fa-x"></i
    >
    </span>
<h3>Modification du Profil de {{ user.lastname }} {{ user.name }}</h3>
  
 <label for="name">Nom:</label>
    <input
      v-model="dataUser.name"
      id="name"
      type="text"
      v-bind:placeholder="user.name"
    />
    <label for="lastname">Prenom: </label>
    <input
      v-model="dataUser.lastname"
      id="lastname"
      type="text"
      v-bind:placeholder="user.lastname"
    />
    <label for="email">Email:</label>
    <input
      v-model="dataUser.email"
      id="email"
      name="email"
      type="email"
      v-bind:placeholder="user.email"
    />
    <label for="password">Mot de passe: </label>
    <input
      v-model="dataUser.password"
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
      @click="updateProfil(user.id)"
      class="update"
      id="update"
      name="update"
      type="submit"
    >
      Modifier
    </button></div>
  </div>
     </div>
    </div> </div> </div>
     <h2>Les Messages</h2>
     <div class="displayRow"> <div class="formPost" v-for="post in posts" v-bind:key="post.id">
    <div class="formPointer" @click="openPostMember(post.id)"> <h4>{{ post.title }}</h4>
     <span>de {{ post.user.lastname }} {{ post.user.name }}</span>
     
     </div>
     
     <div class="retailPost" v-if="showRetailPostId == post.id">
    <span class="iconX" @click="closePostMember()"><i class="fa-solid fa-x"></i></span>
     <span class="iconBarMenue" @click="openMenuPostMember()"
      ><i class="fa-solid fa-bars"></i
    ></span>
    <div class="MenuePostMember" v-if="openMenuRetail">
      <ul>
        <li @click="openModifyPost()">Modification</li>
        <li @click="deletePost(post.id)">Suppression</li> 
      </ul>
   <div class="blocModificationPost" v-if="openModify">
   <form @submit.prevent="updateMessage(post.id)"> <label for="title">Titre: </label>
          <input
            v-model="modifyPost.title"
            type="texte"
            name="title"
            id="title"
            class="blockTitle"
            placeholder="Placez votre titre ici."
          />
          <label id="labelBlockNewPost" for="Text">Message:</label>
          <textarea name="Text" class="blockText" v-model="modifyPost.text">
          </textarea>
          <label id="labelBlockNewPost" for="image">Image:</label>
          <input
            type="file"
            ref="file"
            name="image"
            id="image"
            @change="onFileImageChange"
          /><br />
          <button class="send" id="send" name="send" type="submit">
            Envoyer
          </button>
   </form></div>
   </div>
    <h4> {{ post.title }}</h4>  
   <span class="postUser">de {{ post.user.lastname }} {{ post.user.name }}</span>
   <span class="postText"> {{ post.text }}</span>
   <img v-bind:src="post.image"/> </div>
    </div>
    </div>
     <h2>Les Commentaires</h2>
  <div class="displayRow"> <div class="formComment" v-for="comment in comments" v-bind:key="comment.id">
  <span class="iconBarComment" @click="openMenuComment(comment.id)" v-if="menuCommentId !== comment.id"
      ><i class="fa-solid fa-bars"></i
    ></span>
    <span class="iconBarComment" @click="closeMenuComment(comment.id)" v-else
      ><i class="fa-solid fa-x"></i
    ></span><h4>Commentaire de {{ comment.user.lastname }} {{ comment.user.name }}</h4>
  <h5> sur le message: <span @click="previewMessage(comment.id)">{{ comment.message.title}}</span></h5> 
  <div class="blockMenuComment" v-if="menuCommentId == comment.id">
  <ul>
    <li @click="openUpdateComment()">Modification</li>
    <li @click="deleteComment(comment.id)">Suppression</li>
  </ul>
  <div class="blockUpdateComment" v-if="openBlockComment">
  <span class="iconXComment" @click="closeUpdateComment()">
  <i class="fa-solid fa-x"></i></span>
  <form @submit.prevent="updateComment(comment.id)">
            <label for="comment">Texte:</label>
            <textarea
                    name="comment"
                    id="comments"
                    type="text"
                    v-model="commentary.text"
                  ></textarea>
                  <label for="image">Image:</label>
                  <input
                    type="file"
                    ref="file"
                    name="image"
                    id="image"
                    @change="onImageChangeComment(comment.id)"
                  />
                  <button class="send" id="forward" name="send" type="submit">
                    Envoyer
                  </button></form>
  </div></div>
  <div class="blockPreview" v-if="previewMessageId == comment.id">
  <span class="iconXPreview" @click="closePreviewMessageId()">
  <i class="fa-solid fa-x"></i></span>
  <h4 class="titreMessageComment">{{ comment.message.title}}</h4>
  <img class="imagePreviewMessage" v-bind:src="comment.message.image"/>
  <div class="textPreviewMessage">{{ comment.message.text }}</div></div>
  <img class="imageComment" v-bind:src="comment.image" v-show="comment.image"/>
  <div class="textComment">{{ comment.text }}</div></div>
  </div>
    </div>
</section>
</template>
<script>
 import axios from "axios";

export default {
  name: "PageMembers",
  data: function () {
    return {
      showNavBar: false,
      showNavBarId: null,
      openUpdateId: false,
     showRetailPostId: null,
       openMenuRetail: false,
       openModify: false,
       previewMessageId: null,
       menuCommentId: null,
      //  menuComment: true,
       openBlockComment: false,
      users: [],
      posts: [],
      comments: [],
dataUser: {
  lastname: "",
  name: "",
  email: "",
  password: "",
  image: "",
  id: localStorage.getItem('userId')
},
   modifyPost: {
        title: "",
        text: "",
        image: "",
        id: "",
        user: [],
      },
commentary: {
        text: "",
        image: "",
        
      },
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
        this.users = users.data;
      });
       axios.get("http://localhost:3000/api/messages/").then((posts) => {
      this.posts = posts.data;
  
    });
    axios.get('http://localhost:3000/api/comment/', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
    .then((comments) => {
      this.comments = comments.data;
console.log(comments.data);
})
},
 methods: {
showNavBarSwitch(userId) {
     this.showNavBarId = userId;
    //  this.showNavBar = !this.showNavBar;
      // alert(!this.showNavBar);
    },
    openUpdateProfil() {
      this.openUpdateId = true;
    },
closeUpdateProfil() {
this.openUpdateId = false;
},

previewMessage(commentId){
  this.previewMessageId = commentId
},

closePreviewMessageId() {
this.previewMessageId = false
},
openPostMember(PostId) {
this.showRetailPostId = PostId;

},
closePostMember() {
  this.showRetailPostId = false;
},
openMenuPostMember(){
  this.openMenuRetail = true;
},
openModifyPost(){
this.openModify = !this.openModify;
},

openMenuComment(menueId){
  this.menuCommentId = menueId
},

closeMenuComment(menueId){
  this.menuCommentId = !menueId;
},

openUpdateComment(){
  this.openBlockComment = true
},

closeUpdateComment(){
  this.openBlockComment = false
},

 onFileChange() {
      this.dataUser.image = this.$refs.file[0].files[0];
      
    },

     updateProfil(idMember) {
     
      this.submitted = true;

      const formData = new FormData();
      console.log(this.dataUser.image);
      formData.append("image", this.dataUser.image);
      formData.append("name", this.dataUser.name);
      formData.append("lastname", this.dataUser.lastname);
      formData.append("password", this.dataUser.password);
      formData.append("email", this.dataUser.email);

      axios
        .put(
          "http://localhost:3000/api/profil/" + idMember,

          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          const confirmation = confirm(
            "Désirez vous vraiment modifier votre profil?"
          );
          if (confirmation) {
            alert("Votre profil à bien été modifié.");
          }
          location.reload();
        });
    },

    deleteProfil(userID){
      axios.delete('http://localhost:3000/api/profil/' + userID,  {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
          )
          .then(()=>{
     const confirmation = confirm(
            "Désirez vous vraiment supprimer ce profil?"
          );
          if (confirmation) {
            alert("Ce profil à bien été supprimé.");
          }
          location.reload();
        });
           
    },

    onFileImageChange(){
      this.modifyPost.image = this.$refs.file[0].files[0];
    },

    updateMessage(PostId){
       const formData = new FormData();

      formData.append("image", this.modifyPost.image);
      formData.append("title", this.modifyPost.title);
      formData.append("text", this.modifyPost.text);
      
      axios
        .put("http://localhost:3000/api/messages/" + PostId, formData, {
          // autorisation nécessaire pour la lecture des données et récupération du token dans le localStorage.
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          const confimration = confirm(
            "Désirez vous vraiment modifier votre message?"
          );
          if (confimration) {
            alert("Votre message à bien été modifié.");
          } else {
            alert("Demande de modification annulé.");
          }
          location.reload();
        });
    },
    deletePost(deletePostId){
 axios.delete('http://localhost:3000/api/messages/' + deletePostId, 
       {
            // autorisation nécessaire à l'envoie des données et récupération du token dans le localStorage.
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
          const accept = confirm("Souhaitez vous supprimer ce message?");
          if (accept) {
            alert("Votre message à bien été supprimé.");
          }
          location.reload();
        });
    },

    onImageChangeComment() {
      this.commentary.image = this.$refs.file[0].files[0];
    },

    updateComment(commentID){
const formData = new FormData();

      formData.append("text", this.commentary.text);
      formData.append("image", this.commentary.image);

      axios
        .put("http://localhost:3000/api/comment/" + commentID, formData, {
          // autorisation nécessaire à l'envoie des données et récupération du token dans le localStorage.
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
        const confimration = confirm(
            "Désirez vous vraiment modifier votre message?"
          );
          if (confimration) {
            alert("Votre message à bien été modifié.");
          } else {
            alert("Demande de modification annulé.");
          }
          location.reload();
        });
    },

     deleteComment(commentaireId){
axios.delete("http://localhost:3000/api/comment/" + commentaireId,
{
          // autorisation nécessaire à l'envoie des données et récupération du token dans le localStorage.
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
.then(() => {
const confirmation = confirm (
  "Désirez vous supprimez votre commentaire?"
);
if(confirmation){
  alert("Votre message à bien été supprimé.");
}
location.reload();
}) }
 },

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
position: relative;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
.formMembers{
  
   width: 270px;
  float: left;
  height: 90px;
  margin-left: 20px;
   .textFormMembers{
       display: inline-flex;
       flex-direction: row;
       margin-top: 10px;
           background-color: white; 
    border-radius: 20px;
       margin-left: auto;
    margin-right: auto;
    width: 270px;
    .imgAvatarMembers{
    display:block;
    width: 70px;
    height: 70px;
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
  position: absolute;
  margin-left: 240px;
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
    .blockUpdateProfil{
      position: fixed;
        display: flex;
      flex-direction: column;
 top: 20%;
 left: 38%;
      background-color: white;
      width: 500px;
      height: 300px;
      padding: 10px;
      h3{
        text-align: center;
        margin-top: -5px;
      }
       
      #file{
        margin-top: 10px;
      }
      label{
        margin-top: 5px;
      }
      .update{
        display: flex;
    height: 25px;
    color: white;
   margin-left: auto;
margin-right: auto; 
padding-left: 20px;
padding-right: 20px;
background-color: #7272a5;
    &:hover {
      background-color: darken(#7272a5, 10%);
    }
      }
    
    }
    .icon-Menue{
      position:absolute;
      z-index: 1;
top: -20px;
right: 20px;
    }
   }

}
   .formPost {
     float: left;
     background-color: white;
     min-width: 25%;
     height: 50px;
     border-radius: 20px;
     padding: 5px;
     margin-left: 20px; 
     text-align: center;
     .formPointer{
      cursor: pointer; 
     }
     h4{
       margin-top: 0;
     }
     span{
       display: flex;
       margin-top: -12px;
     }
     .retailPost{
       background-color: white;
       position: fixed;
       z-index: 1;
      display: flex;
      flex-direction: column;
      top: 20%;
      left: 40%;
       width: 400px;
       height: 300px;
       padding: 5px;
       border-radius: 20px;
       box-shadow: 1px 2px 5px #635c9b;
       .iconX{
         position: absolute;
         top: 20px;
         left: 20px;
         cursor: pointer;
       }
       .iconBarMenue{
          position: absolute;
         top: 20px;
         right: 20px;
         cursor: pointer;
       }
       .MenuePostMember{
         position: absolute;
          z-index: 1;
         top: 20px;
         right: 20px;
        ul {
      list-style: none;
      margin-top: -0%;
      // margin-left: -15%;
      li {   
        padding: 10px;
         display: flex;
        background-color: rgb(224, 224, 224);
        transition: all 0.5s ease-out;
        cursor: pointer;
        &:hover {
          color: white;
          background-color: #635c9b;
        }
      }
    }
       }
       h4{
         margin-left: auto;
         margin-right: auto;
       }
       .postUser{
margin-left: 8px;
       }
       .postText{
         margin-top: 10px;
         text-align: justify;
         width: 98%;
         height: 100px;
         overflow: auto;
         padding: 5px;
       }
       img{
         display: block;
         margin-left: auto;
         margin-right: auto;
         margin-top: 10px;
         width: 50%;
         border-radius: 20px;
       }
     }
     .blocModificationPost{
         position: fixed;
         z-index: 1;
        display: flex;
      flex-direction: column;
 top: 30%;
 left: 38%;
 box-shadow: 1px 2px 5px #635c9b;
      background-color: white;
      width: 500px;
      height: 200px;
      padding: 10px;
      form{
        display: flex;
        flex-direction: column;
        button{
               display: flex;
    height: 25px;
    color: white;
   margin-left: auto;
margin-right: auto; 
padding-left: 20px;
padding-right: 20px;
background-color: #7272a5;
    &:hover {
      background-color: darken(#7272a5, 10%);
    }
      }
     }
   }
   }

   .formComment{
      float: left;
     background-color: white;
     width: 45%;
     height: 170px;
     border-radius: 20px;
     padding: 5px;
     margin-left: 20px; 
    
     h4{
       margin-top: -19px;
       text-align: center;
     }
     h5{
       margin-top: -10px;
       margin-left: 5px;
       font-weight: lighter;
     span{
         font-weight: bold;
       cursor: pointer;}   
     }
    
    .imageComment{
       display: block;
       float: left;
       width: 37%;
       height: 55%;
       object-fit: cover;
     }
     .textComment {
       overflow: auto;
       float: right;
       width: 60%;
       height: 55%;
       text-align: justify;
       padding: 5px;
     }
     .blockPreview{
        background-color: white;
       position: fixed;
       z-index: 1;
      display: flex;
      flex-direction: column;
      top: 20%;
      left: 40%;
       width: 400px;
       height: 300px;
       padding: 5px;
       border-radius: 20px;
       box-shadow: 1px 2px 5px #635c9b;
       .titreMessageComment {
 margin-top: -5px;
       text-align: center;
       }
       .iconXPreview{
          position: absolute;
         top: 15px;
         left: 15px;
         cursor: pointer;
       }
       .imagePreviewMessage{
         display: block;
         border-radius: 20px;
         margin-left: auto;
         margin-right: auto;
         width: 50%;
       }
       .textPreviewMessage{
         display:flex;
         margin-left: auto;
         margin-right: auto;
         margin-top: 12px;
         overflow: auto;
         text-align: justify;
         padding: 5px;
         width: 90%;
         height: 45%;
       }
     
     }  .iconBarComment{
         position: relative;
         top: 10px;
         left: 95%;
         cursor: pointer;
       }
       .blockMenuComment{
          position: absolute;
          z-index: 1;
         margin-top: -4%;
         margin-left: 38%;
        ul {
      list-style: none;
      margin-top: -0%;
      // margin-left: -15%;
      li {   
        padding: 10px;
         display: flex;
        background-color: rgb(224, 224, 224);
        transition: all 0.5s ease-out;
        cursor: pointer;
        &:hover {
          color: white;
          background-color: #635c9b;
        }
       }
        }
       }
       .blockUpdateComment{
  background-color: white;
       position: fixed;
       z-index: 1;
      display: flex;
      flex-direction: column;
      top: 20%;
      left: 40%;
       width: 400px;
       height: 300px;
       padding: 5px;
       border-radius: 20px;
       box-shadow: 1px 2px 5px #635c9b;
        .iconXComment{
          position: absolute;
         top: 15px;
         left: 15px;
         cursor: pointer;
       }
       form{
         display: flex;
         flex-direction: column;
         margin-top: 30px;
         input{
           margin-top: 5px;
         }
         button{
           margin-top: 10px;
         }
       }
       }
   }
</style>