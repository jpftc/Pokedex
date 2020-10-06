<template>
  <div id="pokemon">
    <div class="card">
      <div class="card-image">
        <figure>
          <img :src="currentImg" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ num }} - {{ name | upper }}</p>
            <p class="subtitle is-6">{{ pokemon.type }}</p>
          </div>
        </div>

        <div class="content"></div>
        <button class="button is-medium is-fullwidth" @click="mudarSprite">Mudar sprite</button>
      </div>
    </div>
  </div>
</template>

<script>
// Importando axios
import axios from "axios";
export default {
  // Created é chamdo toda vez que a pagina é carregada
  created: function () {
    // Requisição para a url de cada pokemon
    axios.get(this.url).then((res) => {
      // Pegando informações dos pokemons
      this.pokemon.type = res.data.types[0].type.name;
      this.pokemon.front = res.data.sprites.front_default;
      this.pokemon.back = res.data.sprites.back_default;
      this.currentImg = this.pokemon.front;
      console.log(this.pokemon);
    });
  },
  // data() função que retorna um objeto
  data() {
    return {
      // variaveis para alterar sprites dos pokemons
      isFront: true,
      currentImg: "",
      // Criando variaveis dentro do data para torna-las reativas
      pokemon: {
        type: "",
        front: "",
        back: "",
      },
    };
  },
  // Props são atributos para passar na hora de crirar objetos na pagina
  props: {
    num: Number,
    name: String,
    url: String,
  },
  // Processa dados como uma função, filtros sempre recebem um valor e retornam um valor
  filters: {
    // Pega a primeira letra do nome e deixa maiúscula, slice corta um pedaço da string
    upper: function (value) {
      var newName = value[0].toUpperCase() + value.slice(1);
      return newName;
    },
  },
  // Eventos disparados na pagina
  methods: {
    // Metodo para alterar sprite
    mudarSprite: function () {
      if (this.isFront) {
        this.isFront = false;
        this.currentImg = this.pokemon.back;
      } else {
        this.isFront = true;
        this.currentImg = this.pokemon.front;
      }
    },
  },
};
</script>

<style>
#pokemon {
  margin-top: 2%;
}
</style>