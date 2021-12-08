<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    List Tutorials <p> </p>
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name: 'tutorials-add'}">Add New</nuxt-link>
                </h4>
            </div>
            <div class="card-body row">
                <div class="col-md-4 offset-md-8 mb-4">
                  	<!-- FUNGSI PENCARIAN INI AKAN BERFUNGSI KETIKA TOMBOL ENTER DITEKAN -->
                    <input type="text" placeholder="Search" v-model="search" @keyup="findTutorial" class="form-control">
                  
                </div>
                <div class="col-md-12">
                    <b-table striped hover :items="tutorials" :fields="fields" show-empty responsive>
                         <template v-slot:cell(no)="row">  
                            <p><strong>{{getNumber()+row.index}} </strong></p> 
                        </template>
                        <template v-slot:cell(title)="row"> 
                            <p>
                                <span class="badge badge-success">{{ row.item.title }}</span>
                            </p>
                        </template> 
                        <template v-slot:cell(description)="row" responsive> 
                            <p>
                                {{ row.item.description }}
                            </p>
                        </template>
                        <template v-slot:cell(content)="row" responsive> 
                            <p>
                                {{ row.item.content }}
                            </p>
                        </template>  
                        <template v-slot:cell(author)="row"> 
                            <p>
                                <span class="badge badge-success">{{ row.item.author }}</span>
                            </p>
                        </template> 
                        <template v-slot:cell(is_published)="row"> 
                            <p>
                                <span class="badge badge-success">{{ row.item.is_published?"Publish":"Unpublish" }}</span>
                            </p>
                        </template>
                      	<!-- MENAMPILKAN TOMBOL EDIT DAN HAPUS --> 
                        <template v-slot:cell(actions)="row" responsive  class="form-inline">
                            <!-- TOMBOL EDIT AKAN DIARAHKAN KE HALAMAN BARU --> 
                            <nuxt-link :to="{name: 'tutorials-edit-id', params: {id: row.item.id}}" :key="'edit'+row.index" class="btn btn-warning btn-sm">Edit</nuxt-link>
                            <!-- TOMBOL HAPUS AKAN MEMBUKA MODAL KONFIRMASI --> 
                            <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">Delete</button>
                        </template>
                        <!-- MENAMPILKAN TOMBOL EDIT DAN HAPUS --> 
                      
                    </b-table>
                  
                    <!-- MENAMPILKAN PAGINASI DATA TUTORIAL, DIMANA V-MODELNYA BERDASARKAN PAGE YANG SEDANG AKTIF --> 
                    <b-pagination
                        align="right"
                        v-model="tutorials.current_page"
                        :total-rows="tutorials.total"
                        :per-page="tutorials.per_page"
                        @change="changePage"
                        aria-controls="my-table"
                    ></b-pagination>
                </div>
              
              	<!-- MODAL AKAN DITEMPATKAN DISINI -->
                  <b-modal v-model="deleteModal" title="Delete Data User">
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
                                @click="deleteTutorial"
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
            fields: ['no','title', 'description', 'content', 'author', 'is_published','actions'], 
            items: [],
            deleteModal: false, 
            tutorial_selected: null, //MENGHANDLE DATA TUTORIAL YANG AKAN DIHAPUS
            search: '' //MENGHANDLE VALUE PENCARIAN
        }
    },
    computed: {
        ...mapState('tutorial', {
            tutorials: state => state.tutorials,
            page: state => state.page //AMBIL DATA PAGE YANG SEDANG AKTIF SAAT INI
        })
    },
    watch: {
        //JIKA VALUE PAGE BERUBAH
        page() {
            //MAKA REQUEST DATA BARU
            this.getTutorials(this.search)
        }  
    },
    methods: {
        ...mapActions('tutorial', ['getTutorials', 'destroyTutorial','getTutorial']),
        ...mapMutations('tutorial', ['SET_PAGE','SET_SIZE','SET_DATA', 'SET_TUTORIAL_DATA']),
        //JIKA TOMBOL DELETE DITEKAN, MAKA FUNGSI INI AKAN DIJALANKAN
        openDeleteModal(row) {
            this.tutorial_selected = row.item //KITA SET TUTORIAL YANG AKAN DIHAPUS
            this.deleteModal = true //BUKA MODAL KONFIRMASI
        },
        //JIKA TOMBOL DELETE PADA MODAL DITEKAN, MAKA FUNGSI INI AKAN DIJALANKAN
        deleteTutorial() {
            this.destroyTutorial(this.tutorial_selected.id)
        },
        //JIKA PADA FORM PENCARIAN DITEKAN ENTER, MAKA FUNGSI INI AKAN DIJALANKAN
        findTutorial() {
            //LAKUKAN PEMANGGILAN KE API UNTUK MENDAPATKAN DATA BERDASARKAN PENCARIAN
            this.getTutorials(this.search)
        },
        //JIKA PAGINATION DIKLIK, MAKA AKAN MENGESET VALUE PAGE YANG SEDANG AKTIF
        changePage(val) {
            this.SET_PAGE(val)
        },
        getNumber(){ 
            return ((this.page*this.tutorials.per_page) - (this.tutorials.per_page-1));
        }
    }
}
</script>