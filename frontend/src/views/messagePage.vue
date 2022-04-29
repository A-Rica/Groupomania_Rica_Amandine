<template>
  <section>
    <div v-if="authenficated" class="section-messagePage">
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
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "MessagePage",
  data: function () {
    return {
      showModifyPost: false,
      post: {
        title: "",
        text: "",
        image: "",
        id: "",
        user: [],
      },
    };
  },
  computed: {
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
  },

  methods: {
    showModifyPostSwitch() {
      this.showModifyPost = !this.showModifyPost;
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
</style>