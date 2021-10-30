<template>
	<v-app>
		<v-card class="ma-2">		
			<v-layout row wrap>
				<v-flex md1 pa-2>
					<v-card class="ma-2">				
						<v-img class="ma-2" :src="child.avatar" height="100" contain></v-img>
					</v-card>	
				</v-flex>
			</v-layout>
			<v-card-title primary-title>
				<div>
					<div class="headline">{{locale("remove")}} '{{child.firstname}} {{child.lastname}}'</div>		
					<span>{{locale("confirmation")}}</span>
				</div>
			</v-card-title>
			<v-card-text>
				<v-btn class="ma-2" color="teal" outlined @click="deletechild()"><v-icon>save</v-icon></v-btn>	
				<v-btn class="ma-2" outlined @click="goToChildren()"><v-icon>cancel</v-icon></v-btn>				
			</v-card-text>
		</v-card>
	</v-app>
</template>	

<script lang="ts">	
	import utils from '../helpers/utils';
	import * as store from '../store/index';
	
	export default {
		props: ['child_id'],
		data: function () {
			return {
				child: store.getters.getChild(this.child_id)
			}
		},
		methods: {
			deletechild: function () {
		      let that = this;
			  let child = this.child;			  
			  let childKey = new Number(store.getters.getChildKey(this.child_id));
			  
			  store.commit('removeChildFromItemList', this.child);
			  //store.commit('deleteChild', childKey);
			  store.dispatch('deleteChild', this.child).then(function(value) {
				  that.$router.push('/children');
			  })
			  .catch(function(err) {
				  that.$router.push({ name: 'error', params: { err_mess: err }});
			  });			  
			},
			goToChildren: utils.goToChildren
		}
	}
</script>
