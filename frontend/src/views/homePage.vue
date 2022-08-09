<template>
  <section>
    <!-- Partie permettant d'envoyer les messages sur le mur avec un effet glissière -->
    <div class="newPost" @click="showNewPostSwitch" v-if="authenficated">
      Postez un nouveau message
    </div>
    <div class="blockNewPost" v-if="showNewPost">
      <Form @submit="createdPost()">
        <label for="title">Titre :</label>
        <Field v-model="post.title" type="texte" name="title" id="title" class="blockTitle"
          placeholder="Placez votre titre ici." :rules="isRequired" />
        <ErrorMessage name="title" class="errorMessage" /><br />
        <label id="labelBlockNewPost" for="Text">Message:</label>
        <Field name="Text" id="Text" v-model="post.text" :rules="isRequired" v-slot="{ field }">
          <textarea name="Text" id="Text" class="blockText" v-bind="field"> </textarea>
        </Field>
        <ErrorMessage name="Text" class="errorMessage" /><br />
        <label id="labelBlockNewPost" for="image">Image:</label>

        <input type="file" ref="files" name="image" id="image" class="buttonImage" @change="onFileChange" /><br />
        <label id="labelBlockNewPost" for="video">Video:</label>

        <input type="file" ref="file" name="video" id="video" class="buttonImage" @change="onFileChangeVideo" /><br />

        <button class="send" id="send" name="send" type="submit">
          Envoyer
        </button>
      </Form>
    </div>
    <!-- Partie servant à afficher les messages sur le mur -->
    <div v-if="authenficated" class="section-homePage">
      <div class="postWall" v-for="post in posts" v-bind:key="post.id">
        <div class="positionTitleNameImage">
          <img v-bind:src="post.user.image" class="img-members" alt="image de profil" />
          <span class="positionTitleName">
            <h3>
              <router-link :to="{ name: 'message', params: { id: post.id } }" class="colorLink">{{ post.title }}
              </router-link>
            </h3>
            <br />
            <h4>
              Par {{ post.user.lastname }} {{ post.user.name }} le
              {{ new Date(post.createdAt).toLocaleString() }}
            </h4>
          </span>
          <span class="croixDelete" @click="deletePost(post.id)" :key="post.user.id"><i
              class="fa-solid fa-xmark"></i></span>
        </div>
        <p class="formatText">
          {{ post.text }}
          <img v-bind:src="post.image" v-show="post.image" class="imagePost" alt="image du post" />
          <video controls v-bind:src="post.video" v-show="post.video" class="imagePost">
          </video>

        </p>
        <div class="barreBottom">
          <button @click.prevent="likeClick(post.id)" class="likedBlack" :class="{liked: post.like.find(likes =>likes.userId == userId )}" 
            title="bouton like"><i class="fa-solid fa-thumbs-up"></i></button>
          ({{ post.like.length}})

          <span class="linkComment" @click="showCommentSwitch(post.id)">Voir les
            commentaires</span>

          <div class="blockComment" v-if="showCommentspostId == post.id">
            <h3>Commentaires</h3>
            <div class="blockDisplayComment" v-for="comment in post.comment" v-bind:key="comment.id">
              <img class="formAvatar" v-bind:src="comment.user.image" alt="image du profil" />
              <div class="formComment">
                <h4>de {{ comment.user.lastname }} {{ comment.user.name }}</h4>
                <span>{{ comment.text }}</span>
                <img class="imageComment" :src="comment.image" v-show="comment.image" alt="image du commentaire" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>
<script>
// import de la map Getters
import { mapGetters } from "vuex";
import axios from "axios";
import { Field, Form, ErrorMessage } from 'vee-validate';
// import moment from "moment";
export default {
  name: "Wall-post",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  // Data à envoyé dans la dataBase
  data: function () {
    return {
      showNewPost: false,
      showComments: false,
      showCommentsLink: false,
      showCommentspostId: null,
      post: {
        title: "",
        text: "",
        image: "",
        video: "",
        id: "",
        // UserId récupérer dans le localStorage
        userId: localStorage.getItem("userId"),
      },
      // Data lier à l'affichage des messages. Mis en Array
      posts: [],
      // data lier aux likes
      //faire mounted avec if
      like:
      {
        userId: localStorage.getItem('userId'),
        messageId: '',
      },
      userId: localStorage.getItem('userId'),
      // liked: "disable"
    };
  },
  computed: {
    // Récupération de l'authentification dans le store
    ...mapGetters({
      authenficated: "auth/authenficated",
    }),
  },
  created: function () {
    this.getPosts();

  },
  methods: {
    getPosts(
    ) {
      axios.get("http://localhost:3000/api/messages/").then((posts) => {
        this.posts = posts.data


      });

    },
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }
      return 'Champs obligatoire';
    },
    // fonction permettant de récuperer l'image envoyé
    onFileChange() {
        this.post.image = this.$refs.files.files[0];
    },
    onFileChangeVideo() {
      this.post.video = this.$refs.file.files[0];
    },
    // fonction de redirection en cas ou l'utilisateur est déconnecté, visant à le renvoyé à la page connexion
    redirection() {
      this.$router.push({ name: "connexion" });
    },
    linkMessage(postsId) {
      this.$router.push({ path: '/message/' + postsId });
    },
    // Ouverture du block New Post.
    showNewPostSwitch() {
      this.showNewPost = !this.showNewPost;
      // alert(!this.showNewPost);
    },
    // mise en place de l'envoie d'un message dans la base de données
    createdPost() {
      // console.log('voici la video:', this.post.video);
      console.log("voici l'image", this.post.image);
      // création d'une constante formData pour y imposer les data à envoyé
      const formData = new FormData();
      // ajout du titre, texte et de l'image dans formData
      formData.append("title", this.post.title);
      formData.append("text", this.post.text);
      formData.append("image", this.post.image);
      formData.append("video", this.post.video);
      // mise en place du lien vers l'API message, en utilisant l'userId présent dans la data.
      axios
        .post(
          "http://localhost:3000/api/messages/" + this.post.userId,
          // Mise en lien avec la constant formData. Informant ainsi Axios qu'il faut l'envoyé dans la DB
          formData,
          {
            // autorisation nécessaire à l'envoie des données et récupération du token dans le localStorage.
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          const accept = confirm("Souhaitez vous poster ce message?");
          if (accept) {
            alert("Votre message à bien été posté.");
          }
          location.reload();
        });
    },
    // Ouvrir le block commentaires 
    showCommentSwitch(postId) {
      this.showCommentspostId = postId;
    },
    // Suppression du message
    deletePost(postId) {
      axios.delete('http://localhost:3000/api/messages/' + postId,
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
    likeClick(likeId) {
      const formData = new FormData();
      formData.append("userId", this.like.userId)
      formData.append('messageId', this.like.messageId)
      axios.post('http://localhost:3000/api/messages/' + likeId + '/like',
        formData, {
        // autorisation nécessaire à l'envoie des données et récupération du token dans le localStorage.
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(() => {
          this.getPosts()
        })

    },
  },

};
</script>
<style lang="scss">












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
}

.errorMessage {
  color: black;
  font-size: 13px;
  font-weight: bold;
}

.newPost {
  float: right;
  margin-right: 57%;
  background-color: #635c9b;
  border-radius: 20px;
  padding: 10px;
  width: 210px;
  text-align: center;
  font-weight: bold;
  color: white;
  cursor: pointer;
  // top: 68px;
  margin-top: 20px;

  &:hover {
    background-color: darken(#635c9b, 10%);
  }
}

.blockNewPost {
  display: flex;
  flex-direction: column;
  float: right;
  margin-right: 30px;
  background-color: #c4c4fd;
  box-shadow: 1px 2px 5px #635c9b;
  border-radius: 10px;
  width: 70%;
  margin-top: 10px;
  padding: 15px;

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

  .buttonImage {
    margin-left: 20px;
  }
}

.postWall {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 1px 2px 5px #635c9b;
  border-radius: 20px;
  margin-top: 25px;

  .positionTitleNameImage {
    display: flex;
    flex-direction: row;

    .img-members {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 100px;
      margin-top: -20px;
      margin-left: -20px;
    }

    .positionTitleName {
      display: flex;
      flex-direction: column;

      h3 {
        font-size: 16.5px;
        margin-left: 10px;
        margin-top: -2px;
        cursor: pointer;

        .colorLink {
          color: black;
          text-decoration: none;
        }
      }

      h4 {
        font-size: 13px;
        font-weight: lighter;
        margin-top: -17px;
        margin-left: 10px;
      }
    }

    .croixDelete {
      position: absolute;
      cursor: pointer;
      right: 8%;
      font-size: 25px;
      color: #565363;
      margin-top: 4px;
    }
  }

  .formatText {
    display: flex;
    flex-direction: column;
    width: 96%;
    text-align: justify;
    margin-top: -2px;
    margin-left: auto;
    margin-right: auto;

    .imagePost {
      border: none;
      width: 60%;
      height: 300px;
      margin-left: 19%;
      margin-top: 20px;
      border-radius: 5px;
    }
  }



  .barreBottom {
    width: 96%;
    border-top: 2px solid darkgray;
    margin-left: auto;
    margin-right: auto;
    padding: 3px;
    pointer-events: auto;

.likedBlack{
  border: none;
  background-color: white;
  font-size: 15px
  }
    .liked {
      color: #635c9b;
    }

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
    }

    .blockDisplayComment {
      display: flex;
      flex-direction: row;
      margin-left: auto;
      margin-right: auto;
    }

    .formAvatar {
      display: block;
      margin-top: 25px;
      width: 100px;
      height: 100px;
      border-radius: 5px;
      box-shadow: 1px 2px 5px #635c9b;
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
  }
}

@media screen and (max-width: 992px) {
  .section-homePage {
    width: 85%;
    margin-right: 10px;
  }

  .newPost {
    margin-right: 5%;
  }

  .blockNewPost {
    margin-right: 10px;
    width: 85%;
  }

  .postWall {
    width: 100%;
    margin-right: -10px;

    .formatText {
      overflow: auto;
      height: 150px;
    }
  }
}
</style>