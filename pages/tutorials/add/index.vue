<template>
    <div class="container-fluid">
        <div class="card mb-3">
            <div class="card-header">
                <h4 class="card-title"></h4>
            </div>
            <div class="card-body">
                <tutorial-form />
            </div>
        </div>
    </div>
</template>
<script>

import TutorialAdd from '@/components/form/TutorialAdd.vue'
export default {    
    async asyncData({store}){
        console.log(store.state.tutorials)
    }, 
    components: {
        'tutorial-form': TutorialAdd //CUSTOM COMPONENT UNTUK FORM INPUT
    }
}
</script>