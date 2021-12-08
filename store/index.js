export const strict = false

export const state = () => ({
    isAuth: false,
    token: null, //STATE UNTUK DATA API TOKEN,
    loggedInUser: null,
    data:null
})

export const mutations = {
    SET_IS_AUTH(state, payload) {
        state.isAuth = payload
    },
    SET_API_TOKEN(state, payload) {
        state.token = payload
    },
}

export const actions = {
    nuxtServerInit({ commit }, context) { 
        commit('SET_IS_AUTH', context.app.$auth.$state.loggedIn)
        if (context.app.$auth.$state.loggedIn) {
            commit('SET_API_TOKEN', context.app.$auth.$state.data.token)
        }
    }
}

export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    },

    register(state) {
        return state.data
    }
}