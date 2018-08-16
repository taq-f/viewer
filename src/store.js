import Vue from 'vue'
import Vuex from 'vuex'
import { getImages } from './lib/image.service';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: []
  },
  mutations: {
    setImages(state, images) {
      state.images = images
    }
  },
  actions: {
    async loadImages({ commit }) {
      const images = await getImages()
      commit('setImages', images)
    }
  }
})
