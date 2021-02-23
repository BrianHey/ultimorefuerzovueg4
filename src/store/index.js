import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    indicadores: {},
  },
  mutations: {
    GET_INDICADORES(state, indicadores) {
      state.indicadores = indicadores;
    },
  },
  actions: {
    async get_Indicadores({ commit }) {
      // Ejemplo del consumo de JSON en forma local
      // axios.get("data.json").then( data =>
      //   console.log(data)
      // )

      const { data: indicadores } = await axios.get(
        "https://mindicador.cl/api"
      );
      commit("GET_INDICADORES", indicadores);
    },
  },
  getters: {
    indicadores: (state) => {
      const { dolar, euro, utm, uf, bitcoin } = state.indicadores;
      return [dolar, euro, utm, uf, bitcoin];
    },
  },
});
