<template>
	<v-app>
		<v-card class="mt-2 ml-2 mr-2">
			<v-btn color="blue" class="ma-2" outlined @click="goHome()"><v-icon>home</v-icon></v-btn>
			<router-link tag="span" class="btn transparent" to="/add-corner">
			  <v-btn class="ma-2" outlined color="teal"><v-icon>add</v-icon>{{locale("new")}}</v-btn>			  
			</router-link>
			
			<v-data-table
			  v-bind:headers="headers"
			  :items="cornerData"
			  :items-per-page="10"
			>
				<template v-slot:item.name="{ item }">
				  <router-link :to="{ name: 'corner', params: {corner_id: item.id}}">{{ item.name }}</router-link>
				</template>
				
				<template v-slot:item.actions="{ item }">
					<router-link tag="span" class="btn transparent" :to="{name: 'corner-edit', params: {corner_id: item.id}}">
						<v-btn class="ma-2" outlined color="teal" ><v-icon large>mdi-pencil</v-icon></v-btn>
					</router-link>
					<router-link tag="span" class="btn transparent" :to="{name: 'corner-delete', params: {corner_id: item.id}}">
						<v-btn class="ma-2" outlined color="red" ><v-icon large>mdi-close-circle</v-icon></v-btn>
					</router-link>					
				</template>
			</v-data-table>
		</v-card>
	</v-app>
</template>

<script lang="ts">
	import utils from '../helpers/utils';	
	import * as store from '../store/index';
	
	//store.dispatch('retrieveChildren');	// put in comment if rest service is active	
	
	export default {		
		beforeMount() {
			//store.dispatch('retrieveChildren');		uncomment if rest service is active	
		},
		data: function () {
			return {	
				pagination: {
					sortBy: this.locale("name")
			    },
				searchKey: '',
				headers: [
				  { text: this.locale("name"), align: 'left', value: 'name', sortable: false,  },
				  { text: this.locale("image"), value: 'avatar', align: 'left', sortable: false },
				  { text: this.locale("count"), value: 'count', sortable: false },
				  { text: this.locale("actions"), value: 'actions', sortable: false }
				]
			}
		},
		computed: {
			cornerData() {
				return store.getters.getCornerList();
			}
		},
		methods: {
			goHome: utils.goHome
		}
	}
</script>
