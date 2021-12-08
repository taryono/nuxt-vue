<template>
     <div>
        <div class="form-group">
            <label for="">Title</label>
            <input type="hidden" v-if="tutorials.id" v-model="tutorials.id">
            <input type="text" class="form-control" :class="{'is-invalid': errors.title}" v-model="tutorials.title">
            <p class="text-danger" v-if="errors.title">{{ errors.title[0] }}</p>
        </div>
        <div class="form-group">
            <label for="">Author</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.author}" v-model="tutorials.author">
            <p class="text-danger" v-if="errors.author">{{ errors.author[0] }}</p>
        </div>
         <div class="form-group">
            <label for="">Content</label>
			<textarea class="form-control" :class="{'is-invalid': errors.content}" v-model="tutorials.content"></textarea>            
            <p class="text-danger" v-if="errors.content">{{ errors.content[0] }}</p>
        </div>
         <div class="form-group">
            <label for="">Description</label>
            <textarea class="form-control" :class="{'is-invalid': errors.description}" v-model="tutorials.description"></textarea>
            <p class="text-danger" v-if="errors.description">{{ errors.description[0] }}</p>
        </div>
		<div class="form-group">
            <label for="">Status Publish</label>
			 
            <select class="form-control" :class="{'is-invalid': errors.is_published}" v-model="tutorials.is_published">
                <option value="">Pilih</option>
                <option value="1">Publish</option>
                <option  value="0">Unpublish</option>
            </select>
            <p class="text-danger" v-if="errors.is_published">{{ errors.is_published[0] }}</p>
        </div>
        <button class="btn btn-primary btn-sm" @click="submit">Save</button>
        <button class="btn btn-warning btn-sm" @click="cancel">Batal</button>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default { 
	computed: {
		//PANGGIL STATE ERRORS DARI MODULE USERS / store/tutorial
		//DIMANA STATE INI AKAN BERISI INFORMASI ERROR VALIDASI
		...mapState("tutorial", {
			errors: state => state.errors, 
            tutorials: state => state.data, 
		})
	},
	methods: {
		...mapActions("tutorial", ["storeTutorial","updateTutorial"]), //LOAD FUNGSI DARI MODULE USER
		//KETIKA TOMBOL SAVE DITEKAN, MAKA FUNGSI INI AKAN DIJALANKAN
		submit() {
			//DIMANA KITA MEMANGGIL FUNGSI UNTUK MENYIMPAN DATA YANG AKAN DIDEFINISIKAN DI ACTIONS DARI MODULE USER
			//DAN KETIKA BERHASIL, MAKA AKAN DIREDIRECT KE HALAMAN LIST USER
            if(this.tutorials.id){
                this.updateTutorial(this.tutorials).then(() =>
				    this.$router.push({ name: "tutorials" })
			    );
            }else{
                this.storeTutorial(this.tutorials).then(() =>
                    this.$router.push({ name: "tutorials" })
                );
            }
		},
		cancel() {
			this.$router.push({ name: "tutorials" });
		}
	}
};
</script>
