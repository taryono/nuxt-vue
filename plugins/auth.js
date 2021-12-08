export default function ({ $auth }) {
    if(!$auth.$state.loggedIn){
        redirect('/login')
    }
}