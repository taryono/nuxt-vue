export const state = () => ({
    users: [],
    data: [],
    errors: [],
    page: 1,  
    page_size:process.env.PAGE_SIZE
})

export const mutations = {
    SET_USER_DATA(state, payload) {
        state.users = payload
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
    getUsers({ commit, state }, payload) { 
        let search = payload ? payload:''
        let url = search? `/users?query=${search}&page=${state.page}&size=2`:`/users?page=${state.page}&size=${state.page_size}`;
        return new Promise((resolve, reject) => {
            this.$axios.get(url).then((response) => {
                let user = null;
				user = response.data.docs;
				user.current_page = state.page;
				user.total = response.data.total;
				user.per_page = state.page_size; 
                commit('SET_USER_DATA', user)    
                commit('SET_PAGE', state.page)    
                resolve()
            })
        })
    },
    storeUser({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/user/store', payload).setHeader('Content-Type', 'multipart/form-data')
            .then(() => {
                dispatch('getUsers')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    getData({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/user/${payload}`).then((response) => { 
                commit('SET_DATA', response.data.user)
                resolve()
            })
        })
    },
    updateUserData({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => { 
            this.$axios.put(`/user/${payload.id}`, payload)
            .then(() => {
                dispatch('getUsers')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
            })
        })
    },
    deleteUser({ dispatch, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/user/${payload}`)
            .then(() => {
                dispatch('getUsers')
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
    getUser(state) {
        return state.data
    },
    getPage(state) {
        return state.page
    }
}