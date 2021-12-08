<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">
                    List Users <p> </p>
                    <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name: 'users-add'}">Add New</nuxt-link>
                </h4>
            </div>
            <div class="card-body row">
                <div class="col-md-4 offset-md-8 mb-4">
                  	<!-- FUNGSI PENCARIAN INI AKAN BERFUNGSI KETIKA TOMBOL ENTER DITEKAN -->
                    <input type="text" placeholder="Search" v-model="search" @keyup="findUser" class="form-control">
                  
                </div> 
                <div class="col-md-12">
                    
                    <b-table striped hover :items="users" :fields="fields" show-empty responsive>  
                         <template v-slot:cell(no)="row">  
                            <p><strong>{{getNumber()+row.index}} </strong></p> 
                        </template>
                        <template v-slot:cell(name)="row">
                            <p><strong>{{ row.item.name }}</strong></p> 
                        </template>
                      	<!-- MENAMPILKAN TOMBOL EDIT DAN HAPUS --> 
                        <template v-slot:cell(actions)="row">
                            <!-- TOMBOL EDIT AKAN DIARAHKAN KE HALAMAN BARU --> 
                            <nuxt-link :to="{name: 'users-edit-id', params: {id: row.item.id}}" :key="'edit'+row.index" class="btn btn-warning btn-sm">Edit</nuxt-link>
                            <!-- TOMBOL HAPUS AKAN MEMBUKA MODAL KONFIRMASI --> 
                            <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">Delete</button>
                        </template>
                        <!-- MENAMPILKAN TOMBOL EDIT DAN HAPUS --> 
                      
                    </b-table>
                  
                    <!-- MENAMPILKAN PAGINASI DATA USER, DIMANA V-MODELNYA BERDASARKAN PAGE YANG SEDANG AKTIF --> 
                    <b-pagination
                        align="right"
                        v-model="users.current_page"
                        :total-rows="users.total"
                        :per-page="users.per_page"
                        @change="changePage"
                        aria-controls="my-table"
                    ></b-pagination>
                </div>
              
              	<!-- MODAL AKAN DITEMPATKAN DISINI -->
                  <b-modal v-model="deleteModal" title="Delete Data User">
                    <p>Kamu yakin ingin menghapus data: <code>{{ user_selected ? user_selected.name:'' }}</code>?</p>
                    <template v-slot:modal-footer>
                        <div class="w-300 float-right">
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
                                @click="deleteDataUser"
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
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
 
export default { 
    async fetch(){   
       this.getNumber();     
    },
    async asyncData({store}) {  
        await Promise.all([
            store.dispatch('user/getUsers') 
        ]) 
        return
    },  
    data() {
        return {
            fields: ['no','name', 'address','cellphone','sex','email','username','password', 'actions'], 
            items: [],
            deleteModal: false, 
            user_selected: null, //MENGHANDLE DATA USER YANG AKAN DIHAPUS
            search: '', //MENGHANDLE VALUE PENCARIAN  
            per_page:2,
            index:1,
            pages:1
        }
    },
    computed: {
        ...mapState('user', {
            users: state => state.users,
            page: state => state.page //AMBIL DATA PAGE YANG SEDANG AKTIF SAAT INI
        }),  
    },
    watch: {
        //JIKA VALUE PAGE BERUBAH
        page() {
            //MAKA REQUEST DATA BARU
            this.getUsers(this.search)
        },
        
    },
    methods: {
        ...mapActions('user', ['getUsers', 'deleteUser','getData']),
        ...mapMutations('user', ['SET_PAGE','SET_SIZE','SET_DATA']),
        ...mapGetters('user', ['getUser','getPage']),
        //JIKA TOMBOL DELETE DITEKAN, MAKA FUNGSI INI AKAN DIJALANKAN
        openDeleteModal(row) {
            this.user_selected = row.item //KITA SET USER YANG AKAN DIHAPUS
            this.deleteModal = true //BUKA MODAL KONFIRMASI
        },
        //JIKA TOMBOL DELETE PADA MODAL DITEKAN, MAKA FUNGSI INI AKAN DIJALANKAN
        deleteDataUser() {
            this.deleteUser(this.user_selected.id)
             this.deleteModal = false //BUKA MODAL KONFIRMASI
        },
        //JIKA PADA FORM PENCARIAN DITEKAN ENTER, MAKA FUNGSI INI AKAN DIJALANKAN
        findUser() {
            //LAKUKAN PEMANGGILAN KE API UNTUK MENDAPATKAN DATA BERDASARKAN PENCARIAN
            this.getUsers(this.search)
        },
        //JIKA PAGINATION DIKLIK, MAKA AKAN MENGESET VALUE PAGE YANG SEDANG AKTIF
        changePage(val) { 
            this.SET_PAGE(val);
            this.index = ((this.page*this.users.per_page) - (this.users.per_page-1));        
        },  
        getNumber(){
            return ((this.page*this.users.per_page) - (this.users.per_page-1));
        }
    }
}
</script>