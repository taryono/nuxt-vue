<template>
    <div class="container-fluid">
        <div class="card mb-3">
            <div class="card-header">
                <h4 class="card-title"></h4>
            </div>
            <div class="card-body">
                <app-user-form  />
            </div>
        </div>
    </div>
</template>
<script>

import UserForm from '@/components/form/UserAdd.vue'
export default {    
    async asyncData({store}){
        console.log(store.state.user)
    }, 
    components: {
        'app-user-form': UserForm //CUSTOM COMPONENT UNTUK FORM INPUT
    }
}
</script>