<template>
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
        </button>
        <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group">
                <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button">
                        <i class="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </form>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown no-arrow d-sm-none">
                <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-search fa-fw"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                    <form class="form-inline mr-auto w-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </li>
            
            <li class="nav-item dropdown no-arrow mx-1" v-if="isAuthenticated">
                <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-envelope fa-fw"></i>
                    <span class="badge badge-danger badge-counter">7</span>
                </a>
                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                    <h6 class="dropdown-header">
                        Message Center
                    </h6>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <div class="dropdown-list-image mr-3">
                            <img class="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="">
                            <div class="status-indicator bg-success"></div>
                        </div>
                        <div class="font-weight-bold">
                            <div class="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                            <div class="small text-gray-500">Emily Fowler · 58m</div>
                        </div>
                    </a>
                    <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                </div>
            </li>
            <div class="topbar-divider d-none d-sm-block" v-if="isAuthenticated"></div>
             
            <li class="nav-item dropdown no-arrow" v-if="isAuthenticated">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ loggedInUser.username }}</span>
                    <i class="fas fa-fw fa-user"></i>
                    <!-- <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"> -->
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                     
					<nuxt-link class="dropdown-item" :to="{name: 'users-profile'}">
						<i class="fas fa-fw fa-users"></i>
						<span>Profile</span>
					</nuxt-link>  
                    <a class="dropdown-item" href="#"  @click="logout">
                        <i class="fas fa-list fa-sm"></i>
                        Logout
                    </a>

                </div>
            </li>
            <li class="nav-item dropdown no-arrow" v-if="!isAuthenticated">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>
                    <i class="fas fa-fw fa-cogs"></i>
                    <!-- <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"> -->
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <!-- <a class="dropdown-item" href="/register">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Register
                    </a> -->
                    <nuxt-link class="dropdown-item" :to="{name: 'register'}">
						<i class="fas fa-fw fa-users"></i>
						<span>Register</span>
					</nuxt-link>  
                    <nuxt-link class="dropdown-item" :to="{name: 'login'}">
						<i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
						<span>Login</span>
					</nuxt-link>  
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name:'Header',
    middleware:'auth',
	computed: {
        ...mapState('auth',['LoggedIn','user']),
		...mapGetters(["isAuthenticated", "loggedInUser"])
	},
	methods: {
		async logout() {
            this.$store.state.user.users = [];
			await this.$auth.logout();
			this.$router.push("/login");
            console.table(this.$store.state.user.users);
		}
	}
};
</script>
