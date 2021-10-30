<template>	
	<v-app>
		<v-layout row>		
			<v-flex md12>				
				<v-container fluid grid-list-sm pa-4>
				  <v-layout row wrap>						
					<corner-view-part v-for="i in cornerListSize - 1" v-on:toggle="toggleState" v-on:moveItems="moveAvatars"
							:key="i" :corner = "cornerListArr[i]" :itemListIndex = "i" :visiblePart="visibleOptions[i]">
					</corner-view-part>	
				  </v-layout>
				</v-container>
				
				<v-container fluid grid-list-sm pa-4>
				  <v-layout row wrap>
					<v-flex pt-1 sm12 md12>
					  <v-card :class="[visibleOptions[0] ? '' : 'hidden-sm-and-up']">
						<v-toolbar dense color="teal lighten-1" v-on:click="moveAvatars(0)">
							<v-toolbar-title class="white--text">{{locale("students")}}</v-toolbar-title>
						</v-toolbar>				  
						<v-container fluid grid-list-md>
							<v-layout row wrap>
								<v-flex md1 v-for="item in cornerListArr[0].items" v-bind:key="item.title">
									<v-card>
									  <v-img v-on:click="toggleState(item,0)" v-bind:src="item.avatar" height="80px" contain v-bind:class="[item.active ? 'teal' : '']"></v-img>
									</v-card>
								</v-flex>
							</v-layout>
						</v-container>
					  </v-card>
					</v-flex>
				  </v-layout>
				</v-container>		
				
				<v-speed-dial v-model="fab" fixed top right direction="bottom" transition="slide-y-reverse-transition">
					<v-btn slot="activator" class="ma-2" color="yellow" fab small v-model="fab"><v-icon>add</v-icon></v-btn>
					<v-btn fab @click.native="openDialog()" class="ma-2" color="white"><v-icon>mdi-eye</v-icon></v-btn>					
					<v-btn fab @click="goToChildrenConfig()" class="ma-2" color="white"><v-icon>mdi-account-multiple</v-icon></v-btn>	
					<v-btn fab @click="goToCornerConfig()" class="ma-2" color="white"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
					<v-btn fab @click="goToOverview()" class="ma-2" color="white"><v-icon>mdi-chart-box-outline</v-icon></v-btn>
					<v-btn fab @click="goToCleanupConfig()" class="ma-2" color="white"><v-icon>mdi-trash-can</v-icon></v-btn>
				</v-speed-dial>
				
				<v-dialog v-model="dialog" persistent>
				  <v-card>
					<v-card-title class="headline">{{locale("corner_chooser")}}</v-card-title>
					<v-card-text>
					<v-container fluid><v-layout row wrap><v-flex md12>					
						<div v-for="(item, i) in corners">							
							<v-checkbox :value="visibleOptions[i]" 
										:key="corners[i]"
										:label="corners[i]"
										v-model="visibleOptions[i]" >
							</v-checkbox>							
						</div>
					</v-flex></v-layout></v-container>
					</v-card-text>
					<v-card-actions>
					  <v-spacer></v-spacer>
					  <v-btn class="green--text darken-1" text @click.native="closeDialog()">Sluiten</v-btn>
					</v-card-actions>
				  </v-card>
				</v-dialog>
			</v-flex>
		</v-layout>
	</v-app>
</template>

<script lang="ts">
	import utils from '../helpers/utils';	
	//import store from '../store/store';
	import cornerViewPart from './CornerViewPart.vue';
	import {Item} from '../classes/Item';
	import * as store from '../store/index';
		
	export default {
		mounted () {
		},
		components: {
			'corner-view-part': cornerViewPart
		},
		data () {
		  return {
				dialog: false,
				//visibleCorners: store.getters.getVisibleCorners(),
				visibleCornersOld: [],
				visibleOptions: store.getters.getVisibleOption(),
				corners: store.getters.getCornerNames(),
				cornerListArr: store.getters.getCornerList(),
				fab: false
		  }
		},
		computed: {
			/*cornerListArr() {
				return store.getters.getCornerList();
			},*/
			cornerListSize() {
				return store.getters.getCornerList().length;
			}
		},
		methods: {
			moveAvatars: function (itemListIndex: number) {
				let that = this;
				
				//store.mutations.moveToDestination(itemListIndex);
				//store.commit('moveToDestination', new Number(itemListIndex));
				store.dispatch('moveToDestination', new Number(itemListIndex)).then(function(value) {
					// nothing to do here
				})
				.catch(function(err) {					
					that.$router.push({ name: 'error', params: { err_mess: err }});
				});
			},
			toggleState: function (item: Item, itemListIndex: number) {
				//store.mutations.toggleState(item, itemListIndex);
				store.commit('toggleState', item, new Number(itemListIndex));
			},		
			openDialog: function() {
				this.visibleCornersOld = store.getters.getVisibleCorners().slice();
				this.dialog = true;
			},
			closeDialog: function () {		
				//store.mutations.updateVisibleCorners(this.visibleCorners);
				//store.commit('updateVisibleCorners', this.visibleCorners);
				//store.dispatch('updateVisibleCorners', this.visibleCorners);
				//this.visibleOptions = store.getters.getVisibleOption();
				//this.dialog = false;	
				let that = this;
				
				let cornersToUpdate = [];
				let visibleCornersNew:Array<string> = store.getters.getVisibleCorners();
								
				for(let visOld of this.visibleCornersOld) {
					if(visibleCornersNew.indexOf(visOld) === -1) {
						//cornersToUpdate.push(visOld);
						let cornerToAdd = this.cornerListArr.find((corner) => corner.name === visOld );
						cornerToAdd.visible = false;
						cornersToUpdate.push(cornerToAdd);
					}
				}
				
				for(let visNew of visibleCornersNew) {
					if(this.visibleCornersOld.indexOf(visNew) === -1) {
						let cornerToAdd = this.cornerListArr.find((corner) => corner.name === visNew );
						cornerToAdd.visible = true;
						cornersToUpdate.push(cornerToAdd);
					}
				}
				
				store.dispatch('updateCornerVisible', cornersToUpdate).then(function(value) {
					// nothing to do here
				})
				.catch(function(err) {					
					that.$router.push({ name: 'error', params: { err_mess: err }});
				});
				
				this.dialog = false;
			},
			goToChildrenConfig: function() {
				this.$router.push('/children');
			},
			goToCornerConfig: function() {
				this.$router.push('/corners');
			},
			goToOverview: function() {
				this.$router.push('/overview');
			},
			goToCleanupConfig: function() {
				this.$router.push('/cleanup');
			}
		}
	}
</script>