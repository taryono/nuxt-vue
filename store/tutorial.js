export const state = () => ({
    tutorials: [],
    data: [],
    errors: [],
    page: 1,  
    page_size:process.env.PAGE_SIZE
})

export const mutations = {
    SET_TUTORIAL_DATA(state, payload) {
        state.tutorials = payload
    },
    SET_DATA(state, payload) {
        state.data = payload
    }, 
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    }, 
}

export const actions = {
    getTutorials({ commit, state }, payload) {
        let search = payload ? payload:''
        return new Promise((resolve, reject) => {
            let url = search? `/tutorials?query=${search}&page=${state.page}&size=2`:`/tutorials?page=${state.page}&size=${state.page_size}`;

            this.$axios.get(url).then((response) => {
                let tutorials = null;
				tutorials = response.data.docs;
				tutorials.current_page = state.page;
				tutorials.total = response.data.total;
				tutorials.per_page = state.page_size; 
                commit('SET_TUTORIAL_DATA', tutorials)   
                resolve()
            }).catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    storeTutorial({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/tutorial/store', payload)
            .then(() => {
                dispatch('getTutorials')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    getTutorial({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/tutorial/${payload}`).then((response) => {   
                commit('SET_DATA', response.data.tutorial)
                resolve()
            })
        })
    },
    updateTutorial({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => { 
            this.$axios.put(`/tutorial/${payload.id}`, payload)
            .then(() => { 
                dispatch('getTutorials')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    destroyTutorial({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/tutorial/${payload}`)
            .then(() => {
                commit('SET_PAGE', 1)
                dispatch('getTutorials')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    }, 
    emptyData({ dispatch, commit }, payload) { 
        commit('SET_DATA', payload)
    }
}
   
export const getters = {
     
    getTutorial(state) {
        return state.data
    }
}