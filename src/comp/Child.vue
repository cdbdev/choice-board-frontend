<template>
	<v-app>			
		<v-card class="mr-2">			
			<v-card-title primary-title>					
				<v-flex md1>
					<v-card class="ma-2"">			
						<v-img :src="child.avatar" height="100" contain></v-img>
					</v-card>	
				</v-flex>				
			</v-card-title>
			<v-card-text>          
				<v-flex md12 class="ma-2">
					<v-layout row wrap>
					  <v-flex>
						<v-card>
						  <v-card-text>	
							<v-text-field :label='locale("firstname")' readonly :value="child.firstname"></v-text-field>
							<v-text-field :label='locale("lastname")' readonly :value="child.lastname"></v-text-field>
							<v-text-field :label='locale("image")' readonly :value="child.avatar"></v-text-field>
						  </v-card-text>
						</v-card>
					  </v-flex>									
						
					  <v-flex class="ma-2"> 
						<v-card class="ml-2">			
							<div id="chartContainer" style="height: 300px; width: 100%;"></div>
						</v-card>
					  </v-flex>
					</v-layout>
				</v-flex>
				
				<v-btn class="mt-5" color="teal" outlined  @click="goToChildren()"><v-icon>arrow_left</v-icon>Terug</v-btn>		
			</v-card-text>
		</v-card>	
				
	</v-app>
</template>

<script lang="ts">
	import utils from '../helpers/utils';
	import {ChildActivityReturn} from '../classes/ChildActivityReturn';
	import * as store from '../store/index';
	import * as CanvasJS from '../../node_modules/canvasjs/dist/canvasjs.min.js';
			
	export default {
		mounted () {			
			let that = this;
			store.dispatch('retrieveChartInfo', this.child).then(function(value: Array<ChildActivityReturn>) {				
				let dataPoints = [];
				console.log(value);
								
				
				for(let act of value) {
					dataPoints.push({ y: act.percent, label: act.cornerName });
				}
				
				let chart = new CanvasJS.Chart("chartContainer", {
					animationEnabled: true,
					title: {
						text: "Gemiddeld gebruik van de hoeken:"
					},
					data: [{
						type: "pie",
						startAngle: 240,
						yValueFormatString: "##0.00\"%\"",
						indexLabel: "{label} {y}",
						dataPoints: dataPoints
					}]
				});
				chart.render();
			})
			.catch(function(err) {
				that.$router.push({ name: 'error', params: { err_mess: err }});
			});
		},
		props: ['child_id'],
		data: function () {
			return {
				child: store.getters.getChild(this.child_id)
			};
		},
		methods: {
			goToChildren: utils.goToChildren,
		}
	}
</script>
<style>
	.canvasjs-chart-credit {
		display: none;
	}
</style>