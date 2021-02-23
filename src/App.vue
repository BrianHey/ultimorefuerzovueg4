<template>
  <div id="app">
    {{ get_All }}

    <input type="text" v-model="user.email" />
    <input type="text" v-model="user.password" />
    <button @click="login">Log in</button>
    <button @click="logout">Log out</button>
    <br />
    <span :class="{ 'text-info': !sold, 'text-danger': sold }">Estado</span>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/indicadores">Indicadores</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "firebase";
import axios from "axios";

// axios.post("la ruta para logearse", { email, password }).then((data) => {
//   const token = data.data;
// });

// axios.get("la ruta de los recursos", {
//   headers: {
//     token: "aqui va el token",
//   },
// });

export default {
  beforeMount() {
    this.get_Indicadores();
  },
  data() {
    return {
      sold: true,
      name: "Maria",
      last: "De los Angeles",
      age: "35",

      user: {
        email: "ejemplo@ejemplo.com",
        password: "12345678",
      },
    };
  },
  methods: {
    ...mapActions(["get_Indicadores"]),
    login() {
      const { email, password } = this.user;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result);
        });
    },

    logout() {
      firebase.auth().signOut();
    },
  },

  computed: {
    ...mapState(["indicadores"]),
    get_All() {
      return `${this.name} ${this.last} ${this.age}`;
    },
  },
};
</script>
