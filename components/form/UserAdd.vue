<template>
     <div> 
        <div class="form-group">
            <label for="">Name</label>
            <input type="hidden" v-if="users.id" v-model="users.id">
            <input type="text" class="form-control" :class="{'is-invalid': errors.name}" v-model="users.name">
            <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Gender</label>
            <select class="form-control" :class="{'is-invalid': errors.sex}" v-model="users.sex">
                <option value="">Pilih</option>
                <option value="P">Male</option>
                <option value="W">Female</option>
            </select>
            <p class="text-danger" v-if="errors.sex">{{ errors.sex[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Address</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.address}" v-model="users.address">
            <p class="text-danger" v-if="errors.address">{{ errors.address[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.email}" v-model="users.email">
            <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" :class="{'is-invalid': errors.password}" v-model="users.password">
            <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Phone Number</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.cellphone}" v-model="users.cellphone">
            <p class="text-danger" v-if="errors.cellphone">{{ errors.cellphone[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Role</label>
            <select class="form-control" :class="{'is-invalid': errors.role}" v-model="users.role">
                <option value="">Pilih</option>
                <option value="0">Admin</option>
                <option value="1">Driver</option>
                <option value="2">Users</option>
            </select>
            <p class="text-danger" v-if="errors.role">{{ errors.role[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Status</label>
            <select class="form-control" :class="{'is-invalid': errors.status}" v-model="users.status">
                <option value="">Pilih</option>
                <option value="0">Tidak Aktif</option>
                <option value="1">Aktif</option>
            </select>
            <p class="text-danger" v-if="errors.status">{{ errors.status[0] }}</p>
        </div>
        <button class="btn btn-primary btn-sm" @click="submit">Save</button>
        <button class="btn btn-warning btn-sm" @click="cancel">Batal</button>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default { 
    data() {
        return { 
            users:{
                name:'',
                sex:'',
                address:'',
                email:'',
                password:'',
                cellphone:'',
                role:'',
                status:'',
                file:''
            }
        }
    },
    computed: {
		//PANGGIL STATE ERRORS DARI MODULE USERS / store/user
		//DIMANA STATE INI AKAN BERISI INFORMASI ERROR VALIDASI
		...mapState("user", {
			errors: state => state.errors,  
		})
	},
	methods: {
		...mapActions("user", ["storeUser","updateUserData"]), //LOAD FUNGSI DARI MODULE USER
		//KETIKA TOMBOL SAVE DITEKAN, MAKA FUNGSI INI AKAN DIJALANKAN
		submit() {
			//DIMANA KITA MEMANGGIL FUNGSI UNTUK MENYIMPAN DATA YANG AKAN DIDEFINISIKAN DI ACTIONS DARI MODULE USER
			//DAN KETIKA BERHASIL, MAKA AKAN DIREDIRECT KE HALAMAN LIST USER
            if(this.users.id){
                this.updateUserData(this.users).then(() =>
				    this.$router.push({ name: "users" })
			    );
            }else{
                this.storeUser(this.users).then(() =>
                    this.$router.push({ name: "users" })
                );
            }
		},
		cancel() {
			this.$router.push({ name: "users" });
		}
	}
};
</script>
