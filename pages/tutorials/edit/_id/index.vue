<template>
    <div class="container-fluid">
        <div class="card mb-3">
            <div class="card-header">
                <h4 class="card-title"></h4>
            </div>
           
            <div class="card-body">
                <app-tutorial-form />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import TutorialEditForm from "@/components/form/TutorialEdit.vue";
export default { 
	 
	methods: {
		...mapMutations('tutorial',["SET_DATA"]),
		...mapGetters('tutorial',["getTutorial"])
	},
	async asyncData({ store, params }) {
		await Promise.all([store.dispatch("tutorial/getTutorial", params.id)]); 
		return;
	},


	components: {
		"app-tutorial-form": TutorialEditForm
	}
};
</script>