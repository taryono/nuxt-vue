<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title">Welcome back!</h2>

          <Notification :message="error" v-if="error"/>
          <Notification :message="test" v-if="test"/>

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="username"
                  v-model="username"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="password"
                  v-model="password"
                />
              </div>
            </div>
            <br>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Log In</button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from "~/components/Notification"; 
export default {
	middleware: "guest",
	components: {
		Notification
	},

	data() {
		return {
			username: "",
			password: "",
			error: null,
			test: null
		};
	}, 
	methods: {  
		async login() {
			try {
				await this.$auth.loginWith("local", {
					data: {
						username: this.username,
						password: this.password
					}
				});
				if (this.$auth.loggedIn) {  
					console.log("Successfully Logged In");
				}
				this.$router.push("/dashboard");
			} catch (e) {
				this.error = e;
			}
		}
	}
};
</script>