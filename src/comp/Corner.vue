<template>
	<v-app>			
		<v-card class="ma-2">
			<v-card-title primary-title>					
				<v-flex md1>
					<v-card class="ma-2"">			
						<v-img :src="corner.avatar" height="100" contain></v-img>
					</v-card>	
				</v-flex>				
			</v-card-title>
			<v-card-text>          
				<v-flex md12 class="ma-2">
					<v-layout row wrap>
					  <v-flex>
						<v-card>
						  <v-card-text>	
							<v-text-field :label='locale("name")' readonly :value="corner.name"></v-text-field>
							<v-text-field :label='locale("count")' readonly :value="corner.count"></v-text-field>
							<v-text-field :label='locale("image")' readonly :value="corner.avatar"></v-text-field>
						  </v-card-text>
						</v-card>
					  </v-flex>	
					</v-layout>
				</v-flex>
				
				<v-btn class="mt-5" color="teal" outlined  @click="goToCorners()"><v-icon>arrow_left</v-icon>Terug</v-btn>										
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
			};
		},
		methods: {
			goToCorners: utils.goToCorners,
		}
	}
</script>
