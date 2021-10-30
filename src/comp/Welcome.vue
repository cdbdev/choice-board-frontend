<template>
	<v-app id="welcomeScreen">			
		<v-layout white>			
			<v-flex id="loginScreen" md4 lg4 white></v-flex>			
			<v-flex md6 lg6 offset-sm1 pt-5>		
				<v-card width="150em">	
                    <v-alert
                      color="error"
                      :value="alert"
                      transition="scale-transition"
                    >
                     Er is een fout opgetreden.
                    </v-alert>
					<v-card-title class="headline blue--text">Welkom</v-card-title>
					<v-card-text>
					    <div>
							U bevindt zich op de landingspagina van het Digitaal Keuzebord. </br></br>
							Deze applicatie heeft als bedoeling om activiteiten en leerlingen digitaal met elkaar te linken. 
							Met behulp van hoeken kunnen leerlingen ingedeeld worden naargelang hun interesses en mogelijkheden. </br>
							De indeling van de hoeken zal door de leerkracht bepaald worden. De verdeling kan door de leerling zelf of
							door een leerkracht gebeuren. Bij elke individuele verdeling worden de gegevens van de leerling bijgehouden. Hierdoor is het mogelijk om
							per leerling een rapportering op te vragen van de gebruikte hoeken en de frequentie hiervan.
					        </br></br>Klik om verder te gaan.
					        </br>
							<v-btn color="blue darken-3" width="100%" text icon class="lighten-3 white--text" @click="initialize()">
								<v-icon large color="blue darken-2">input</v-icon>
							</v-btn>							
					    </div>
						<!-- <v-layout>
							<v-flex md12 lg12 offset-sm4>						
								<v-btn color="blue darken-3" width="100%" class="lighten-3 white--text" @click="initialize()">Ok</v-btn>							
							</v-flex> 
						</v-layout> -->
					</v-card-text>
				</v-card>	
			</v-flex>			
		</v-layout>	
		<v-footer dark height="auto" class="white--text">			
			<v-btn class="white--text" text  @click="mailTo()">
				<v-icon>mail</v-icon>chris.de.boeck@gmail.com
			</v-btn>
			<v-spacer></v-spacer>
			<div>&copy; 2021</div>			
		</v-footer>		
	</v-app>
</template>

<script lang="ts">
	import { Corner } from '../classes/Corner';
    import * as store from '../store/index';
	import rest from '../services/rest';	

	export default {
		data () {
			return {
				email: "",
				password: "",
				alert: false
			}
		},
		methods: {
			initialize() {
				rest.queryAll(function(response: string, data) {
					if(response === "Success")
					{
						this._processPromiseData(data);							
					

						/**
						 * Go to the main page
						 */
						this.$router.push('/main');
					}
					else
					{	
						this.alert = true;
					}
				}.bind(this));
			},
			mailTo() {
				window.location.href = "mailto:chris.de.boeck@gmail.com";
			},
			_processPromiseData(data) {
				store.commit('clearCornerData');
				
                //this._processTokenData(data);
				this._processCornerData(data);
                //this._processItemsData(data);
                this._processChildrenData(data);			
			},
            _processTokenData(data) {
                /**
                   * Save token to local DB
                   */                   
                let sessionToken = data.results.token;
            },
			_processCornerData(data) {
				/**
				 * Convert promise data Corner objects and save it to the store
				 */
				let cornerArray = data.results.hoeken;
				
				for(let i = 0; i < cornerArray.length; i++)
				{
                    let cornerVal = cornerArray[i];
					
					let corner: Corner = {
						id: cornerVal.id,					
						name: cornerVal.name, 
						avatar: cornerVal.avatar, 
						visible: (cornerVal.visible === 1?true:false),
						count: cornerVal.count,
						items: this._getLinkedItems(cornerVal.id, data)
					}
					
					store.commit('addCornerData', corner, new Number(i), new Boolean(false));
					/*store.commit('addCorner', corner);
                    store.commit('addCornerName', cornerVal.naam);
                    store.commit('initVisibleCorner', new Number(i), cornerVal.zichtbaar); */
				}
			},
            _processChildrenData(data) {
                let leerlingen = data.results.kleuters;
                
                for(let leerling of leerlingen)
                {
                    let child = {
                        id: leerling.id,
                        firstname: leerling.firstname,
                        lastname: leerling.lastname,
						fullName: leerling.firstname + " " + leerling.lastname,
                        avatar: leerling.avatar,
                        position: leerling.position
                    };
                    store.commit('addChild', child, new Boolean(false));
                }
            },          
            _getLinkedItems(cornerId, data) {
                let items = [];
                let leerlingen = data.results.kleuters;
                
                for(let leerling of leerlingen)
                {
                    if(leerling.position === cornerId)
                    {
                        let item = {
                            active: false,
                            title: leerling.firstname + " " + leerling.lastname,
                            avatar: leerling.avatar
                        };
                        items.push(item);
                    }
                }
                
                return items;
            }            
		}
	}
</script>

<style>
	#loginScreen {
	    background-image: url("http://localhost:3500/srv/static/doc-images/background/front_image_small.jpg");
		background-repeat: no-repeat;
		background-color: white;
		//background: linear-gradient(to bottom, #008080, #008299);
	}
	@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
</style>
