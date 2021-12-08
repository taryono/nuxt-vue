<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    List Tutorials
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name: 'tutorials-add'}">Add New</nuxt-link>
                </h4>
            </div>
            <div class="card-body row">
                <div class="col-md-4 offset-md-8 mb-4">
                    <input type="text" placeholder="Search" v-model="search" @keyup="findTutorial" class="form-control">
                </div>
                <div class="col-md-12">
                    <b-table striped hover :items="tutorials" :fields="fields" show-empty responsive>
                        <template v-slot:cell(id)="row">
                            <p><strong>{{ row.item.id }}</strong></p> 
                        </template>
                        <template v-slot:cell(title)="row">
                            <p><strong>{{ row.item.title }}</strong></p> 
                        </template>
                        <template v-slot:cell(actions)="row">
                            <nuxt-link :to="{name: 'tutorials-edit-id', params: {id: row.item.id}}" :key="'edit'+row.index" class="btn btn-warning btn-sm">Edit</nuxt-link>
                            <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">Delete</button>
                        </template>
                    </b-table>
                    <b-pagination
                        align="right"
                        v-model="tutorials.current_page"
                        :total-rows="tutorials.total"
                        :per-page="tutorials.per_page"
                        @change="changePage"
                        aria-controls="my-table"
                    ></b-pagination>
                </div>

                <b-modal v-model="deleteModal" title="Delete Data Tutorial">
                    <p>Kamu yakin ingin menghapus data: <code>{{ tutorial_selected ? tutorial_selected.name:'' }}</code>?</p>
                    <template v-slot:modal-footer class="form-inline">
                        <div class="w-100 float-right">
                            <b-button
                                variant="secondary"
                                size="sm"
                                @click="deleteModal=false"
                            >
                                Close
                            </b-button>
                            <b-button
                                variant="primary"
                                size="sm"
                                @click="deleteDataTutorial"
                            >
                                Delete
                            </b-button>
                        </div>
                    </template>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default { 
    async asyncData({store}) {
        await Promise.all([
            store.dispatch('tutorial/getTutorials')
        ]) 
        return
    },
    data() {
        return {
            fields: ['id','title', 'description', 'content', 'author','is_published'], 
            items: [],
            deleteModal: false,
            tutorial_selected: null,
            search: ''
        }
    },
    computed: {
        ...mapState('tutorial', {
            tutorials: state => state.tutorials,
            page: state => state.page
        }),
        ...mapMutations('tutorial', ['SET_PAGE','SET_DATA']),  
    },
    watch: {
        page() {
            this.getTutorials(this.search)
        }  
    },
    methods: {
        ...mapActions('tutorial', ['getTutorials', 'destroyTutorial','getTutorial']),
        
        openDeleteModal(row) {
            this.tutorial_selected = row.item
            this.deleteModal = true
        },
        deleteDataTutorial() { 
            this.destroyTutorial(this.tutorial_selected.id).then(() => {
                this.deleteModal = false
                this.tutorial_selected = null
            })
        },
        editDataTutorial() {
            this.getTutorial(this.tutorial_selected.id).then((tutorial) => {
                this.tutorials = tutorial;
            })
        },
        findTutorial() {
            this.getTutorials(this.search)
        },
        changePage(val) {
            this.SET_PAGE(val)
        }, 
    }
}
</script>