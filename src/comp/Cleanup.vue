<template>
	<v-app>		
		<v-flex xs12 sm6 offset-sm3 pt-3>
			<v-card class="mr-2">	
				<v-img
				  src="srv/static/doc-images/lists/data_wipe.jpg"
				  height="200px">
				</v-img>
				<v-card-title primary-title>					
					<div>
						<h3 class="headline mb-0">{{locale("remove_data")}}</h3>						
					</div>										
				</v-card-title>
				<v-card-text>
					<v-radio-group v-model="cleanup_radio" :mandatory="false">
						<v-radio :label='locale("rem_only_activities")' value="radio-activity"></v-radio>
						<v-radio :label='locale("rem_act_and_student")' value="radio-children"></v-radio>
						<v-radio :label='locale("rem_all")' value="radio-corners"></v-radio>
					</v-radio-group>	
				</v-card-text>
				<v-btn class="ma-2" color="teal" dark @click="cleanData()"><v-icon>save</v-icon></v-btn>
				<v-btn class="ma-2" @click="goHome()"><v-icon>cancel</v-icon></v-btn>
			</v-card>
		</v-flex>
	</v-app>
</template>

<script lang="ts">
	import utils from '../helpers/utils';	
	import * as store from '../store/index';
	import {Cleanup} from '../classes/Cleanup';
			
	export default {
		mounted () {		
			
		},
		data: function () {
			return {
				cleanup_radio: 'radio-activity',
				cleanup_model: { children: false, corners: false, activities: false }
			};
		},
		methods: {
			cleanData: function() {
				let that = this;				
				
				switch(this.cleanup_radio) {
					case 'radio-activity':
						this.cleanup_model.activities = true;
						this.cleanup_model.children = false;
						this.cleanup_model.corners = false;
						break;
					case 'radio-children':
						this.cleanup_model.activities = true;
						this.cleanup_model.children = true;
						this.cleanup_model.corners = false;
						break;
					case 'radio-corners':
						this.cleanup_model.activities = true;
						this.cleanup_model.children = true;
						this.cleanup_model.corners = true;
						break;
					default: break;
				}
				
				store.dispatch('cleanup', this.cleanup_model).then(function(value) {
					that.$router.push('/main');
				})
				.catch(function(err) {
					that.$router.push({ name: 'error', params: { err_mess: err }});
				});
				
			},
			goHome: utils.goHome
		}
	}
</script>