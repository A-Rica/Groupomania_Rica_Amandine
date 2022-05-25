<template>
  <section>
    <div class="section-messagePage">
      <!-- partie message utilisateurs -->
      <!-- Partie modification du message de l'utilisateur avec un switch
       faisant disparaitre le message pour laisser s'afficher la page de modification -->
      <span
        class="switchModifyPost"
        @click="showModifyPostSwitch"
        v-if="!showModifyPost"
      >
        Modifier le post</span
      >
      <span class="switchModifyPost" @click="showModifyPostSwitch" v-else>
        Annuler la modification du post</span
      >
      <!-- Partie sur la modification de message -->
      <div class="postUser" v-if="showModifyPost">
        <Form @submit.prevent="modifyPost()">
          <label for="title">Titre: </label>
          <Field
            v-model="post.title"
            type="texte"
            name="title"
            id="title"
            class="blockTitle"
            placeholder="Placez votre titre ici." :rules="isRequired"
          />
            <ErrorMessage name="title" /><br/>
          <label id="labelBlockNewPost" for="Text">Message:</label>
           <Field name="Text" id="Text"  v-model="post.text" :rules="isRequired" v-slot="{ field }" >
           <textarea name="Text" id="Text" class="blockText"  v-model="post.text" v-bind="field">
          </textarea>
          </Field>
           <ErrorMessage name="Text"/><br/>
          <label id="labelBlockNewPost" for="image">Image:</label>
          <input
            type="file"
            ref="file"
            name="image"
            id="image"
            @change="onFileChange"
          /><br />
          <button class="send" id="send" name="send" type="submit">
            Envoyer
          </button>
        </form>
      </div>
      <!-- Partie affichant le message -->
      <div class="postUser" v-else>
        <img v-bind:src="post.user.image" class="img-members" alt="image du profil"/>
        <span class="positionTitleName"
          ><h2>{{ post.title }}</h2>
          <h3>de {{ post.user.lastname }} {{ post.user.name }}</h3>
        </span>

        <p class="formatText">
          {{ post.text }}
          <img v-bind:src="post.image" class="imagePost" alt="image du message"/>
        </p>
        <div class="barreBottom">
  
          <span class="linkComment" @click="showCommentSwitch"
            >Voir les commentaires</span
          >
          <div class="blockComment" v-if="showComments">
            <!-- Partie création de commentaire -->
            <Form @submit="createdComment()">
          <label for="comment">Texte:</label>    
          <Field name="comment" id="comment" v-model="comment.text" :rules="isRequired" v-slot="{ fieldComment }">
          <textarea
                name="comment"
                id="comment"
                type="text"
                v-model="comment.text" v-bind="fieldComment"
              ></textarea></Field>
               <ErrorMessage name="comment" class="errorMessage"/><br/>
             <label for="images">Image:</label> <input
                type="file"
                ref="file"
                name="images"
                id="images"
                @change="onFileChangeComment"
              />
              <button class="send" id="forward" name="send" type="submit">
                Envoyer
              </button>
            </Form>

            <h3>Commentaires</h3>
            <div
              class="blockDisplayComment"
              v-for="comment in post.comments"
              v-bind:key="comment.id"
            >
              <!-- bouton list modifié -->
              <nav>
                <span
                  class="positionPoint"
                  @click="showModifyMenuComment(comment.id)"
                  ><i class="fa-solid fa-ellipsis"></i
                ></span>
                <ul
                  class="formMenuModifyComment"
                  v-if="showCommentMenuId == comment.id"
                >
                  <li
                    @click="showModifyCommentSwitch(comment.id)"
                    v-if="!showButtonModify"
                  class="marginTopLi">
                    Modifier le commentaire
                  </li>
                  <li @click="showModifyCommentSwitch" v-else class="marginTopLi">
                    Annuler la modification
                  </li>
                  <li @click="deleteComment(comment.id)">Suppression du Commentaire</li>
                </ul>
              </nav>
              <img class="formAvatar" v-bind:src="comment.user.image" alt="image du profil" />
              <div class="formComment" v-if="showModifyComments == comment.id">
                <Form @submit="modifyComments(comment.id)">
                 <label for="comments">Texte:</label>
                   <Field name="comments" id="comments" v-model="commentary.text" :rules="isRequired" v-slot="{ fieldComments }">
                   <textarea
                    name="comments"
                    id="comments"
                    type="text"
                    v-model="commentary.text" v-bind="fieldComments"
                  ></textarea></Field>
                   <ErrorMessage name="comments" class="errorMessage"/><br/>
                  <label for="image">Votre image:</label>
                  <input
                    type="file"
                    ref="file"
                    name="image"
                    id="image"
                    @change="onImageChangeComment(comment.id)"
                  />
                  <button class="send" id="forward" name="send" type="submit">
                    Envoyer
                  </button>
                </form>
              </div>
              <div class="formComment" v-else>
                <h4>de {{ comment.user.lastname }} {{ comment.user.name }}</h4>
                <span>{{ comment.text }}</span>
                <img
                  class="imageComment"
                  :src="comment.image"
                  v-show="comment.image"
                alt="image du commentaire"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import { mapGetters } from "vuex";
import axios from "axios";
import { mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  name: "MessagePage",
   components: {
    Field,
    Form,
    ErrorMessage,
  }, 
  data: function () {
    return {
      // data lier aux affichage de menue et des bloc de modification
      showModifyPost: false,
      showModifyComments: false,
      showComments: false,
      showButtonModify: false,
      showMenuModifyComment: false,
      showCommentMenuId: null,
      // data lier aux posts avec un array de l'utilisateur
      post: {
        title: "",
        text: "",
        image: "",
        id: "",
        user: [],
        comments: [],
      },
      // data lier à l'envoi d'un commentaire
      comment: {
        id: "",
        text: "",
        image: "",
        messageId: this.$route.params.id,
        // UserId récupérer dans le localStorage
        userId: localStorage.getItem("userId"),
        user: [],
      },
    //  data lier à la modification du commentaire
      commentary: {
        id: "",
        text: "",
        image: "",
        messageId: this.$route.params.id,
        // UserId récupérer dans le localStorage
        userId: localStorage.getItem("userId"),
      },
 // data permettant de visualiser un commentaire
     
    };
  },
  computed: {
    // Récupération de l'authentification dans le store
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),
  },
  created: function () {
    // visualisation des données lier aux posts
    let postId = this.$route.params;
    axios
      .get("http://localhost:3000/api/messages/" + postId.id, {
        // autorisation nécessaire pour la lecture des données et récupération du token dans le localStorage.
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((post) => {
        this.post.title = post.data.title;
        this.post.text = post.data.text;
        this.post.image = post.data.image;
        this.post.user = post.data.user;
        this.post.comments = post.data.comment;
      });
// visualisation des données lier aux commentaires
    axios
      .get("http://localhost:3000/api/comment/", {
        // autorisation nécessaire pour la lecture des données et récupération du token dans le localStorage.
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((comments) => {
        console.log(comments.data);
        this.comments = comments.data;
      });
  },

  methods: {
     isRequired(value) {
      if (value && value.trim()) {
        return true;
      }

      return 'Champs obligatoire';
    },
// ouverture des menues, du cadre de modication de post, de commentaire
    showModifyPostSwitch() {
      this.showModifyPost = !this.showModifyPost;
    },
    showCommentSwitch() {
      this.showComments = !this.showComments;
    },
    showModifyMenuComment(commentMenuId) {
      this.showCommentMenuId = commentMenuId;
    },
    showModifyCommentSwitch(commentId) {
      this.showModifyComments = commentId;
      this.showButtonModify = !this.showButtonModify;
    },
// recupération des informations lier à l'image envoyé
    onFileChange() {
      this.post.image = this.$refs.file.files[0];
    },
    // modification du post
    modifyPost() {
      let postId = this.$route.params;
      const formData = new FormData();
// recupération des données mit dans les input
      formData.append("image", this.post.image);
      formData.append("title", this.post.title);
      formData.append("text", this.post.text);
    //  envoit des données dans la base de données   // 
      axios
        .put("http://localhost:3000/api/messages/" + postId.id, formData, {
          // autorisation nécessaire pour la lecture des données et récupération du token dans le localStorage.
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          // message de confirmation
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

    // creation d'un commentaires
    onFileChangeComment() {
      this.comment.image = this.$refs.file.files[0];
    },

    onImageChangeComment() {
      this.comment.image = this.$refs.file[0].files[0];
    },

    createdComment() {
      const formData = new FormData();

      formData.append("text", this.comment.text);
      formData.append("image", this.comment.image);
      formData.append("messageId", this.comment.messageId);
      formData.append("userId", this.comment.userId);
      formData.append("user", this.comment.user)
      axios
        .post("http://localhost:3000/api/comment/", formData, {
          // autorisation nécessaire à l'envoie des données et récupération du token dans le localStorage.
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          const accept = confirm("Souhaitez vous poster ce commentaire?");
          if (accept) {
            alert("Votre commentaire à bien été posté.");
          }
          location.reload();
        });
    },
    imgDisplay() {
      this.isLoaded = true;
    },

    modifyComments(commentaireId) {
      console.log(commentaireId);
      const formData = new FormData();

      formData.append("text", this.commentary.text);
      formData.append("image", this.comment.image);
      formData.append("messageId", this.commentary.messageId);
      formData.append("userId", this.commentary.userId);

      axios
        .put("http://localhost:3000/api/comment/" + commentaireId, formData, {
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

    // suppression du commentaire.
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
};
</script>
<style lang="scss" scoped>
.section-messagePage {
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
  .imgEntete {
    margin-left: auto;
    margin-right: auto;
    height: 50px;
  }
}

.postUser {
  background-color: white;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 1px 2px 5px #635c9b;
  border-radius: 20px;
  margin-top: 75px;
  form {
    display: flex;
    flex-direction: column;
    width: 97%;
    margin-left: auto;
    margin-right: auto;
    .blockText {
      width: 100%;
      height: 100px;
    }
    .blockTitle {
      width: 100%;
    }
    #labelText {
      margin-top: 10px;
    }
    .send {
      width: 20%;
      height: 25px;
      margin-top: 10px;
      margin-left: 40%;
      color: white;
      background-color: #635c9b;
      &:hover {
        background-color: darken(#635c9b, 10%);
      }
    }
  }
  .errorMessage{
    color: black;
    font-size: 13px;
    font-weight: bold;
  }
  .img-members {
    float: left;
    width: 120px;
    height: 120px;
    border-radius: 100px;
    margin-top: -20px;
    margin-left: -20px;
  }
  .positionTitleName {
    position: relative;
    width: 98%;
    margin-top: -20px;
    text-align: center;
    h2 {
      margin-left: auto;
      margin-right: auto;
      margin-top: -5px;
    }
    h3 {
      margin-left: auto;
      margin-right: auto;
      margin-top: -20px;
      font-weight: lighter;
      font-size: 16px;
    }
  }
  .formatText {
    // display: flex;
    // flex-direction: column;
    width: 96%;
    text-align: justify;
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    .imagePost {
      display: block;
      width: 60%;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
      border-radius: 5px;
    }
  }
}
.switchModifyPost {
  position: absolute;
  right: 8%;
  background-color: #635c9b;
  border-radius: 20px;
  padding: 10px;
  width: 220px;
  text-align: center;
  font-weight: bold;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: darken(#635c9b, 10%);
  }
}

.barreBottom {
  width: 96%;
  border-top: 2px solid darkgray;
  margin-left: auto;
  margin-right: auto;
  padding: 3px;
  .linkComment {
    float: right;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .blockComment {
    width: 98%;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    form {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      label{
        margin-top: 10px;
      }
      #image {
        margin-top: 5px;
      }
      button {
        width: 20%;
        height: 25px;
        margin-top: -25px;
        margin-left: 80%;
        color: white;
        background-color: #635c9b;
        &:hover {
          background-color: darken(#635c9b, 10%);
        }
      }
    }
    .blockDisplayComment {
      display: flex;
      flex-direction: row;
      margin-left: auto;
      margin-right: auto;

      .positionPoint {
        position: absolute;
        right: 10%;
        font-size: 20px;
        margin-top: 6px;
        cursor: pointer;
      }
      .formMenuModifyComment {
        display:flex;
        flex-direction: column;
        position: absolute;
        right: 8%;
        margin-top: 2%;
        list-style: none;
        background-color: #c4c4fd;
        background-image: url("../assets/Pattern-Transparent-Background.png");
        background-size: cover;
        box-shadow: 1px 2px 5px #635c9b;
       width: 100px;
        padding: 5px; 
        font-weight: bold;
        text-align: center;
        font-size: 13px;
        .marginTopLi{
          margin-top: -5px;
        }
        li {
          display: inline-block;
          border-bottom: 1px solid #635c9b;
          padding-top: 10px;
          padding-bottom: 10px;
          cursor: pointer;
          
        }
      }
      .formComment {
        margin-top: 25px;
      
        width: 82%;
        padding: 5px;
        margin-left: 20px;
        border-radius: 5px;
        text-align: justify;
        background-color: rgb(239, 237, 237);
        box-shadow: 1px 2px 5px #635c9b;

        h4 {
          margin-top: -5px;
          font-size: 15px;
        }
        span {
          font-size: 13px;
        }
        .imageComment {
         display: block;
         margin-left: auto;
         margin-right: auto;
          height: 170px;
          border-radius: 20px;
        }
      }

      .formAvatar {
        display:block;
        margin-top: 25px;
        width: 100px;
        height: 100px;
        border-radius: 5px;
        box-shadow: 1px 2px 5px #635c9b;
      }
    }
  }
}
@media screen and (max-width: 992px)
{
.section-messagePage {
  display: flex;
  flex-direction: column;
  float: right;
  background-color: #c4c4fd;
  background-image: url("../assets/Pattern-Transparent-Background.png");
  background-size: cover;
  box-shadow: 1px 2px 5px #635c9b;
  width: 87%;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  margin-right: 10px;
}
.postUser {
  width: 100%;
  margin-right: 10px;
  form {
    width: 90%;
    padding-bottom: 5px;
  }
}
      .positionPoint {
        position: absolute;
       z-index: 2;
       margin-top: 10px;
      }
.formMenuModifyComment {  
  z-index: 2;
        top: 135%;
      }
       .formComment {
        display: flex;
        flex-direction: column;
             .imageComment {
         display: block;
         margin-left: auto;
         margin-right: auto;        
       height: 55%; 
         width: 60%;
          object-fit: cover;
          border-radius: 20px;
        }
      }
}
</style>