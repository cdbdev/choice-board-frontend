<template>
	<v-app>
		<v-card class="ma-2">		
			<v-card-title primary-title>
				<v-flex md2>
					<div class="headline">{{locale("remove")}}</div>
					<v-card class="ma-2">								
						<v-img :src="corner.avatar" height="100" contain></v-img>
					</v-card>										
				</v-flex>	
			</v-card-title>
			<v-card-text>
				<span>{{locale("confirmation")}} </br> {{locale("corner_remove_message")}} <b>'{{corner.name}}'</b>.</span></br></br>
				<v-btn class="ma-2" color="teal" outlined @click="deleteCorner()"><v-icon>save</v-icon></v-btn>	
				<v-btn class="ma-2" outlined @click="goToCorners()"><v-icon>cancel</v-icon></v-btn>				
			</v-card-text>
		</v-card>
	</v-app>
</template>

<script lang="ts">
	import utils from '../helpers/utils';
	import * as store from '../store/index';
	
	export default {
		props: ['corner_id'],
		data: function () {
			return {
				corner: store.getters.getCorner(this.corner_id)
			}
		},
		methods: {
			deleteCorner: function () {
			  let that = this;
			  
			  if(this.corner_id === 1)
			  {
					alert("De hoek 'Leerlingen' kan niet verwijderd worden!");
					return;
			  }
			  var corner = this.corner;			  
			  var cornerKey = new Number(store.getters.getCornerKey(this.corner_id));
			  
			  //store.commit('removeChildrenFromCorner', this.corner);
			  store.dispatch('removeChildrenFromCorner', this.corner).then(function(value) {
				 // nothing to do here
			  })
			  .catch(function(err) {
				  that.$router.push({ name: 'error', params: { err_mess: err }});
			  });
			  //store.commit('deleteCorner', cornerKey);
			  store.dispatch('deleteCorner', this.corner).then(function(value) {
				  that.$router.push('/corners');
			  })
			  .catch(function(err) {
				  that.$router.push({ name: 'error', params: { err_mess: err }});
			  });
			  
			  
			},
			goToCorners: utils.goToCorners
		}
	}
</script>
