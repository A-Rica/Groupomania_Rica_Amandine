<template >
  <section>
    <!-- Partie permettant d'envoyer les messages sur le mur avec un effet glissière -->
    <div class="newPost" @click="showNewPostSwitch" v-if="authenficated">
      Postez un nouveau message
    </div>
    <div class="blockNewPost" v-if="showNewPost">
      <form @submit.prevent="createdPost()">
        <label for="title">Titre :</label>
        <input
          v-model="post.title"
          type="texte"
          name="title"
          id="title"
          class="blockTitle"
          placeholder="Placez votre titre ici."
        />
        <label id="labelBlockNewPost" for="Text">Message:</label>
        <textarea name="Text" class="blockText" v-model="post.text"> </textarea>
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
    <!-- Partie servant à afficher les messages sur le mur -->
    <div v-if="authenficated" class="section-homePage">
      <div class="postWall" v-for="post in posts" v-bind:key="post.id">
        <div class="positionTitleNameImage">
          <img v-bind:src="post.user.image" class="img-members" />
          <span class="positionTitleName">
            <h3>
              <router-link
                :to="{ name: 'message', params: { id: post.id } }"
                class="colorLink"
                >{{ post.title }}</router-link
              >
            </h3>
            <br />
            <h4>
              Par {{ post.user.lastname }} {{ post.user.name }} le
              {{ new Date(post.createdAt).toLocaleString() }}
            </h4></span
          >
        </div>
        <p class="formatText">
          {{ post.text }}
          <img v-bind:src="post.image" class="imagePost" />
        </p>
        <div class="barreBottom"><i class="fa-solid fa-thumbs-up"></i></div>
      </div>
    </div>
    <!-- Partie avertissant l'utilisateur qu'il faut être connecté pour voir les messages sur le mur -->
    <div v-else class="section-homePage2">
      <img src="../assets/icon-left-font-monochrome-black.png" />
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
// import de la map Getters
import { mapGetters } from "vuex";
import axios from "axios";
// import moment from "moment";
export default {
  name: "Wall-post",
  // Data à envoyé dans la dataBase
  data: function () {
    return {
      showNewPost: false,
      post: {
        title: "",
        text: "",
        image: "",
        id: "",
        // UserId récupérer dans le localStorage
        userId: localStorage.getItem("userId"),
      },
      // Data lier à l'affichage des messages. Mis en Array
      posts: [],
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
    axios.get("http://localhost:3000/api/messages/").then((posts) => {
      this.posts = posts.data;
    });
  },

  methods: {
    // fonction permettant de récuperer l'image envoyé
    onFileChange() {
      this.post.image = this.$refs.file.files[0];
    },
    // fonction de redirection en cas ou l'utilisateur est déconnecté, visant à le renvoyé à la page connexion
    redirection() {
      this.$router.push({ name: "connexion" });
    },
    // Ouverture du block New Post.
    showNewPostSwitch() {
      this.showNewPost = !this.showNewPost;
      // alert(!this.showNewPost);
    },
    // mise en place de l'envoie d'un message dans la base de données
    createdPost() {
      // création d'une constante formData pour y imposer les data à envoyé
      const formData = new FormData();
      // ajout du titre, texte et de l'image dans formData
      formData.append("title", this.post.title);
      formData.append("text", this.post.text);
      formData.append("image", this.post.image);
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
    messagePage() {
      axios.get("http://localhost:3000/api/messages/").then((posts) => {
        console.log(posts.data);
      });
      // this.$router.push({ path: "/message/" + post.id });
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
  box-shadow: 1px 2px 5px #635c9b;
  width: 70%;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  margin-right: 30px;
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
      width: 60%;
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
  }
}
.section-homePage2 {
  display: flex;
  flex-direction: column;
  background-color: #c4c4fd;
  box-shadow: 1px 2px 5px #635c9b;
  border-radius: 20px;
  width: 43%;
  height: 50%;
  padding: 15px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  img {
    margin-left: auto;
    margin-right: auto;
    height: 50px;
  }
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
</style>
