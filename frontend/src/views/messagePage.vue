<template>
  <section>
    <div class="section-messagePage" v-if ="authenficated">
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
        <form @submit.prevent="modifyPost()">
          <label for="title">Titre: </label>
          <input
            v-model="post.title"
            type="texte"
            name="title"
            id="title"
            class="blockTitle"
            placeholder="Placez votre titre ici."
          />
          <label id="labelBlockNewPost" for="Text">Message:</label>
          <textarea name="Text" class="blockText" v-model="post.text">
          </textarea>
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
        <img v-bind:src="post.user.image" class="img-members" />
        <span class="positionTitleName"
          ><h2>{{ post.title }}</h2>
          <h3>de {{ post.user.lastname }} {{ post.user.name }}</h3>
        </span>

        <p class="formatText">
          {{ post.text }}
          <img v-bind:src="post.image" class="imagePost" />
        </p>
        <div class="barreBottom">
          <i class="fa-solid fa-thumbs-up"></i>
          <span class="linkComment" @click="showCommentSwitch"
            >Voir les commentaires</span
          >
          <div class="blockComment" v-if="showComments">
            <!-- Partie création de commentaire -->
            <form @submit.prevent="createdComment()">
              <textarea
                name="comment"
                id="comments"
                type="text"
                v-model="comment.text"
              ></textarea>
              <input
                type="file"
                ref="file"
                name="image"
                id="image"
                @change="onFileChangeComment"
              />
              <button class="send" id="forward" name="send" type="submit">
                Envoyer
              </button>
            </form>

            <h3>Commentaires</h3>
            <div
              class="blockDisplayComment"
              v-for="comment in comments"
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
              <img class="formAvatar" v-bind:src="comment.user.image" />
              <div class="formComment" v-if="showModifyComments == comment.id">
                <form @submit.prevent="modifyComments(comment.id)">
                  <textarea
                    name="comment"
                    id="comments"
                    type="text"
                    v-model="commentary.text"
                  ></textarea>
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-messagePage" v-else>
       <img class="imgEntete" src="../assets/icon-left-font-monochrome-black.png" />
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
// import { mapGetters } from "vuex";
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "MessagePage",
  data: function () {
    return {
      showModifyPost: false,
      showModifyComments: false,
      showComments: false,
      showButtonModify: false,
      showMenuModifyComment: false,
      showCommentMenuId: null,
      post: {
        title: "",
        text: "",
        image: "",
        id: "",
        user: [],
      },
      comment: {
        id: "",
        text: "",
        image: "",
        messageId: this.$route.params.id,
        // UserId récupérer dans le localStorage
        userId: localStorage.getItem("userId"),
      },
      commentary: {
        id: "",
        text: "",
        image: "",
        messageId: this.$route.params.id,
        // UserId récupérer dans le localStorage
        userId: localStorage.getItem("userId"),
      },

      comments: [],
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
      });

    axios
      .get("http://localhost:3000/api/comment/", {
        // autorisation nécessaire pour la lecture des données et récupération du token dans le localStorage.
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((comments) => {
        this.comments = comments.data;
      });
  },

  methods: {

     redirection() {
      this.$router.push({ name: "connexion" });
    },

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

    onFileChange() {
      this.post.image = this.$refs.file.files[0];
    },
    modifyPost() {
      let postId = this.$route.params;
      const formData = new FormData();

      formData.append("image", this.post.image);
      formData.append("title", this.post.title);
      formData.append("text", this.post.text);
      axios
        .put("http://localhost:3000/api/messages/" + postId.id, formData, {
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
        .then((response) => {
          console.log(response);
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
  alert("Votre message à bien été modifié.");
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
      width: 60%;
      margin-left: 19%;
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
      margin-top: 20px;
      #image {
        margin-top: 10px;
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
        position: absolute;
        right: 8%;
        margin-top: 2%;
        list-style: none;
        background-color: #c4c4fd;
        background-image: url("../assets/Pattern-Transparent-Background.png");
        background-size: cover;
        box-shadow: 1px 2px 5px #635c9b;
        width: 13%;
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
          margin-left: 38%;
          height: 170px;
          border-radius: 20px;
        }
      }

      .formAvatar {
        margin-top: 25px;
        width: 100px;
        height: 100px;
        border-radius: 5px;
        box-shadow: 1px 2px 5px #635c9b;
      }
    }
  }
}
</style>