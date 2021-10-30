<template>
	<v-app>			
		<v-card class="mr-2">			
			<v-card-title primary-title>			
							
			</v-card-title>
			<v-card-text>          
				<v-flex md12 class="ma-2">
					<v-layout row wrap>
					  <v-flex class="ma-2"> 
						<v-card class="ml-2">			
							<div id="chartContainer" style="height: 300px; width: 100%;"></div>
						</v-card>
					  </v-flex>
					</v-layout>
				</v-flex>
				
				<v-btn class="mt-5" color="teal" outlined  @click="goHome()"><v-icon>arrow_left</v-icon>Terug</v-btn>		
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
			store.dispatch('retrieveChartOverview').then(function(value: Array<ChildActivityReturn>) {				
				let dataPoints = [];
				console.log(value);
								
				
				for(let act of value) {
					dataPoints.push({ y: act.percent, label: act.cornerName });
				}
				
				let chart = new CanvasJS.Chart("chartContainer", {
					animationEnabled: false,					
					title: {
						text: "Klasoverzicht"
					},
					data: [{
						type: "column",
						yValueFormatString: "##0.00\"%\"",
						indexLabel: "{y}",
						dataPoints: dataPoints
					}]
				});
				chart.render();
			})
			.catch(function(err) {
				that.$router.push({ name: 'error', params: { err_mess: err }});
			});
		},
		data: function () {
			return {
				
			};
		},
		methods: {
			goHome: utils.goHome,
		}
	}
</script>
<style>
	.canvasjs-chart-credit {
		display: none;
	}
</style>