export default function ({ $axios, store, redirect}) {
    $axios.setHeader('Content-Type', 'application/json');
    $axios.setHeader('Authorization');  
    $axios.onRequest(config => {   
        if(!store.$auth.$state.loggedIn){
            redirect('/login')
        }
    })

    $axios.onResponse(response => {
        //console.log('Making request to ' + config.url + ":")
    })
    $axios.setBaseURL('http://localhost:8080/api')
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/400')
        }
    })

}