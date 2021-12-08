<template>
    <div class="container-fluid">
        <div class="card mb-3">
            <div class="card-header">
                <h4 class="card-title"></h4>
            </div>
           
            <div class="card-body">
                <app-user-form />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import UserForm from "@/components/form/UserEdit.vue";
export default { 
	methods: {
		...mapMutations('user',["SET_DATA"]),
		...mapGetters('user',["getUserSelected"])
	},

	async asyncData({ store, params }) {
		await Promise.all([store.dispatch("user/getData", params.id)]); 
		return;
	},

	components: {
		"app-user-form": UserForm
	}
};
</script>