import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    booksTemp: []
  },
  mutations: {
    addBooks(state, payload) {
      state.booksTemp = [...payload]
    }
  },
  actions: {
    getAllBook({ commit }) {
      axios
        .get('http://localhost:3000/books')
        .then(result => {
          console.log(result)
          commit('addBooks', result.data)
        })
    }
  }
})
