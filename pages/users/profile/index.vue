<template>
  <div class="container-fluid">
          <div class="card">
              <div class="card-header">
                  <h4 class="card-title">
                      Profile
                  </h4>
              </div>
              <div class="card-body row">
                <div class="col-md-12">  
                    <b-alert class="alert alert-success" :show="true">
                        <p>
                          <strong>Username:</strong>
                          {{ loggedInUser.username }}
                        </p>
                        <p>
                          <strong>Email:</strong>
                          {{ loggedInUser.email }}
                        </p>
                    </b-alert>  
                </div>
              </div>
          </div>
  </div>    
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>
