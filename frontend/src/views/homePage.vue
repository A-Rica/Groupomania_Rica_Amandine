<template >
  <section>
    <div class="newPost" @click="showNewPostSwitch">
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
          name="image"
          id="image"
          @change="onFileChange"
        /><br />
        <button class="send" id="send" name="send" type="submit">
          Envoyer
        </button>
      </form>
    </div>
    <div v-if="authenficated" class="section-homePage">testi test</div>

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
export default {
  name: "Wall-post",

  data: function () {
    return {
      showNewPost: false,
      post: {
        title: "",
        text: "",
        image: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      authenficated: "auth/authenficated",
      user: "auth/user",
    }),
  },

  methods: {
    // fonction permettant de récuperer l'image envoyé
    onFileChange(e) {
      console.log(e.target.files);
      const file = e.target.files[0].name;
      this.post.image = file;
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
      axios.post("http://localhost:3000/api/profil/me");
      console.log(this.post);
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
