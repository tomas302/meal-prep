import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        recipes: [],
        apiUrl: 'https://api.edamam.com/search'
    },
    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        }
    },
    actions: {
        async getRecipes({ state, commit }, plan) {
            try {
                let response = await axios.get(`${state.apiUrl}`, {
                    params: {
                        q: plan,
                        app_id: 'cfc671a7',
                        app_key: '23f734b47c7b920cf80b5932fee64439',
                        from: 0,
                        to: 9
                    }
                });
                commit('setRecipes', response.data.hits)
            } catch (error) {
                commit('setRecipes', []);
            }
        }
    }
});
