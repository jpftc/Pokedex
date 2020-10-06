<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <img src="./assets/logoPoke.png" />
      <hr />
      <h4 class="is-size-4">Pokedex</h4>
      <input
        class="input is-rounded"
        type="text"
        placeholder="Buscar pokemon pelo nome"
        v-model="busca"
      />
      <button class="button is-success" id="buscaBtn" @click="buscar">
        Buscar
      </button>
      <!-- v-for para listar todos os pokemons da variavel pokemons, obs: ":key" quando usar v-for -->
      <div v-for="(poke, index) in filteredPokemons" :key="poke.url">
        <!-- Utilizando componete usando data binding com as props -->
        <Pokemon :name="poke.name" :url="poke.url" :num="index + 1" />
      </div>
    </div>
  </div>
</template>

<script>
// Importando axios, para fazer requisições http
import axios from "axios";
// Importando componete pokemin
import Pokemon from "./components/Pokemon";
export default {
  name: "App",
  // data() função que retorna um objeto
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      busca: "",
    };
  },
  // Created é chamdo toda vez que a pagina é carregada
  created: function () {
    // fazendo requisição tipo get na API pokedex e salvando resposta na variavel pokemons que está no data()
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((res) => {
        this.pokemons = res.data.results;
        this.filteredPokemons = res.data.results;
      });
  },
  // Registrando componetes que irão ser usados na pagina app.vue
  components: {
    Pokemon,
  },
  methods: {
    buscar: function () {
      this.filteredPokemons = this.pokemons;
      if (this.busca == "" || this.busca == " ") {
        this.filteredPokemons = this.pokemons;
      } else {
        this.filteredPokemons = this.pokemons.filter(
          (pokemon) => pokemon.name == this.busca
        );
      }
    },
  },
  /*
  computed: {
    resultadoBusca: function() {
      if (this.busca == "" || this.busca == " ") {
        return this.pokemons;
      } else {
        return this.pokemons.filter((pokemon) => pokemon.name == this.busca);
      }
    },
  },
  */
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#buscaBtn {
  margin-top: 2%;
}
</style>