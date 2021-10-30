<template>
	<v-app>			
		<v-layout white>		
			<v-flex id="errorScreen" md4 lg4></v-flex>	
			<v-flex md4 lg4 offset-sm1 pt-5 red>
				</br>
				<v-card width="150em">	  									
					<v-card-title class="headline blue--text">Fout</v-card-title>
					<v-card-text>
					    <div>
							Er is een probleem opgetreden:
							<v-text-field readonly :value="err_mess"></v-text-field>
							</br>De sessie dient herstart te worden.
					        </br></br>Klik om opnieuw te beginnen.
					        </br>
							<v-btn color="blue darken-3" width="100%" text icon class="lighten-3 white--text" @click="returnToWelcome()">
								<v-icon large color="blue darken-2">cached</v-icon>
							</v-btn>							
					    </div>
					</v-card-text>
				</v-card>	
			</v-flex>			
		</v-layout>					
	</v-app>
</template>

<script lang="ts">
	export default {
		mounted () {
			
		},
		props: ['err_mess'],
		data: function () {
			return {
				
			}
		},
		methods: {
			returnToWelcome() {
				this.$router.push({ name: 'welcome'});
			}
		}		
	}
</script>
<style>
	#errorScreen {
	    background-image: url("http://localhost:3500/srv/static/doc-images/background/minions_problem.jpg");
		background-repeat: no-repeat;
		//background: linear-gradient(to bottom, #008080, #008299);
	}
	@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>