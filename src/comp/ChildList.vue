<template>
	<v-app>
		<v-card class="mt-2 ml-2 mr-2">
			<v-btn class="ma-2" color="blue" outlined @click="goHome()"><v-icon>home</v-icon></v-btn>
			<router-link tag="span" class="btn transparent" to="/add-child">
			  <v-btn class="ma-2" outlined color="teal"><v-icon>add</v-icon>{{locale("new")}}</v-btn>			  			  
			</router-link>		
			
			<v-data-table
			  v-bind:headers="headers"
			  :items="childrenData"			  		
			  :items-per-page="10"
			>
				<template v-slot:item.firstname="{ item }">
				  <router-link :to="{ name: 'child', params: {child_id: item.id}}">{{ item.firstname }} {{ item.lastname }}</router-link>
				</template>
				
				<template v-slot:item.actions="{ item }">
					<router-link tag="span" class="btn transparent" :to="{name: 'child-edit', params: {child_id: item.id}}">
						<v-btn class="ma-2" outlined color="teal" ><v-icon large>mdi-account-edit</v-icon></v-btn>
					</router-link> 
					<router-link tag="span" class="btn transparent" :to="{name: 'child-delete', params: {child_id: item.id}}">
						<v-btn class="ma-2" outlined color="red" ><v-icon large>mdi-account-remove</v-icon></v-btn>
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
				  { text: this.locale("name"), align: 'left', value: 'firstname', sortable: false,  },
				  { text: this.locale("image"), value: 'avatar', align: 'left', sortable: false },
				  { text: this.locale("actions"), value: 'actions', sortable: false }
				]
			}
		},
		computed: {
			childrenData() {
				//console.log(store.getters.getChildren()[0].firstname);
				return store.getters.getChildren();
			}
		},
		methods: {
			goHome: utils.goHome
		}
	}
</script>
