<template>
	<v-app>			
		<v-card class="mt-2 ml-2 mr-2">			
			<v-card-title primary-title>
				<div class="headline">{{locale("add")}}</div>				
			</v-card-title>
			<v-card-text>				
                <v-text-field 
					ref="naam"
					:label='locale("name")'
					v-model="corner.name"
					:rules="[() => !!corner.name || 'Dit veld is verplicht']"
					:error-messages="errorMessages"
					required>
				</v-text-field>
				<v-text-field 
					ref="naam"
					:label='locale("count")'
					type="number"
					v-model.number="corner.count"
					:rules="[() => !!corner.count || 'Dit veld is verplicht']"
					:error-messages="errorMessages"
					required>
				</v-text-field>
                <!-- <v-text-field label="Afbeelding" v-model="corner.avatar"></v-text-field> -->
                <img src="" height="200" :alt='locale("image")+"..."' /><br/><br/>
				<v-btn class="ma-2" color="teal" outlined @click="createCorner()"><v-icon>save</v-icon></v-btn>					
				<v-btn class="ma-2" outlined color="blue" @click="selectImage()">
					<v-icon>file_upload</v-icon>{{locale("upload_image")}}
					<input id="selectFile" type="file" accept="image/*" style="display: none" />
				</v-btn>								
				<v-btn outlined @click="goToCorners()"><v-icon>cancel</v-icon></v-btn>				
			</v-card-text>
		</v-card>
		<v-snackbar v-model="snackbar" top>
			  Hoek bestaat reeds, kies een andere naam.
			  <v-btn color="red" text @click="snackbar = false">Close </v-btn>
		</v-snackbar>
	</v-app>
</template>

<script lang="ts">
	import utils from '../helpers/utils';
	import * as store from '../store/index';
	import axios from 'axios';
	import locale from '../locale/localeAPI';
		
	export default {
		mounted() {
			document.getElementById("selectFile").addEventListener("change", this.readImage, false);
		},	
		data: function () {
			return {
				corner: {id: 0, name: '', avatar: '', visible: true, count: 0, items: []},
				imageName: '',
				snackbar: false,
				errorMessages: []
			};
		},
		computed: {		
				
		},
		methods: {
			createCorner: function() {
				let that = this;
				
				// check for duplicates
				if(store.getters.cornerExists(this.corner.name)) {
					this.snackbar = true;
					return;
				}
				
				// check for required fields
				if(this.corner.name.length === 0)
				{
					this.$refs["naam"].validate(true);
					return;
				}
				
				// first save the base64 image
				this.uploadImage();

				if(this.corner.avatar ==="/srv/static/corners/")			  
					this.corner.avatar = "/srv/static/doc-images/lists/werkzaamheden.png"
						
				// Save the corner data
				var cornerToAdd = {
					id: store.getters.getCornerNextId(),
					name: this.corner.name,
					avatar: this.corner.avatar,
					visible: true,
					count: this.corner.count,
					items: []
				};
				  
				let position: number = store.getters.getCornerList().length;
				//store.commit('addCornerData', cornerToAdd, new Number(position), new Boolean(true));
				store.dispatch('addCornerData', cornerToAdd, new Number(position), new Boolean(true)).then(function(value) {
					that.$router.push('/corners');
				})
				.catch(function(err) {
					that.$router.push({ name: 'error', params: { err_mess: err }});
				});
			},
			selectImage: function() {
				
				document.getElementById("selectFile").click();				
			},
			readImage: function(event) {
				let preview = document.querySelector('img');
				let base64String;
				let fileReader= new FileReader();
				let file = event.target.files[0];					
				this.imageName = file.name;
				
				fileReader.addEventListener("load", function () {
					preview.src = <string>fileReader.result;
					//console.log("Base64: " +  fileReader.result);					
				}, false);
				fileReader.readAsDataURL( file );
			},
			uploadImage: function() {
				let image = document.querySelector('img');
				let regExp = /;base64,(.*)/;
				let fileBase64Str = regExp.exec(image.src);
				let fileName = 'static/corners/' + this.imageName;
				fileName = fileName.split(' ').join('_');
				this.corner.avatar = "/srv/" + fileName;
				
				if(fileBase64Str && fileBase64Str.length > 1) {	
				  axios.post('http://localhost:3500/image', { base64str: fileBase64Str[1] , file: fileName })
					  .then(function(response){
						console.log(response.data)
					  })
					  .catch(function (error) {
						console.log(error);
					  })
					; 
				}
			},
			goToCorners: utils.goToCorners
		}
	}
</script>
