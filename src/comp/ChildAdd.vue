<template>
	<v-app>			
		<v-card class="mt-2 ml-2 mr-2">			
			<v-card-title primary-title>
				<div class="headline">{{locale("add")}}</div>				
			</v-card-title>
			<v-card-text>				
                <v-text-field 
					ref="voornaam" 
					:label='locale("firstname")'
					v-model="child.firstname" 							 					
					:rules="[() => !!child.firstname || 'Dit veld is verplicht']"
					:error-messages="errorMessages"
					required>
				</v-text-field>
                <v-text-field 
					ref="achternaam" 
					:label='locale("lastname")'
					v-model="child.lastname" 					 					
					:rules="[() => !!child.lastname || 'Dit veld is verplicht']"
					:error-messages="errorMessages"
					required>
				</v-text-field>
				<!-- <v-text-field label="Afbeelding" v-model="child.avatar"></v-text-field> -->
				<img src="" class="ma-2" height="200" :alt='locale("image")+"..."' /><br/><br/>
				<v-btn class="ma-2" color="teal" outlined @click="createchild()"><v-icon>save</v-icon></v-btn>				
				<v-btn class="ma-2" outlined color="blue" @click="selectImage()">
					<v-icon>file_upload</v-icon>{{locale("upload_image")}}
					<input id="selectFile" type="file" accept="image/*" style="display: none" />
				</v-btn>		
				<v-btn outlined @click="goToChildren()"><v-icon>cancel</v-icon></v-btn>				
			</v-card-text>
		</v-card>
		<v-snackbar v-model="snackbar" top>
			  leerling bestaat reeds, kies een andere naam.
			  <v-btn color="red" text @click="snackbar = false">Close </v-btn>
		</v-snackbar>
	</v-app>
</template>	

<script lang="ts">	
	import utils from '../helpers/utils';
	import * as store from '../store/index';
	import axios from 'axios';
		
	export default {
		mounted() {
			document.getElementById("selectFile").addEventListener("change", this.readImage, false);
		},	
		data: function () {
			return {
				child: {lastname: '', firstname: '', avatar: ''}	,
				imageName: '',
				snackbar: false,
				errorMessages: []
			};
		},
		computed: {
			
		},
		methods: {
			createchild: function() {
				let that = this;
				
				// check for duplicates
				if(store.getters.childExists(this.child.firstname + " " + this.child.lastname)) {
					this.snackbar = true;
					return;
				}
				
				// check for required fields
				if(this.child.firstname.length === 0 || this.child.lastname.length === 0)
				{
					this.$refs["voornaam"].validate(true);
					this.$refs["achternaam"].validate(true);
					return;
				}				
				
			    // first save the base64 image
			    this.uploadImage();
			  
			    if(this.child.avatar ==="/srv/static/children/")			  
					this.child.avatar = "/srv/static/doc-images/lists/qm_face.jpg"
				
			    // next save the child data
			    var childToAdd = {
					id: store.getters.getChildNextId(),
					lastname: this.child.lastname,
					firstname: this.child.firstname,
					fullName: this.child.firstname + " " + this.child.lastname,
					avatar: this.child.avatar,
					position: 1
			    };
			  
			    //store.commit('addChild',childToAdd, new Boolean(true));
				store.dispatch('addChild',childToAdd, new Boolean(true)).then(function(value) {
					store.commit('addChildToShelveItemList', childToAdd);							  
					that.$router.push('/children');
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
				let fileName = 'static/children/' + this.imageName;
				fileName = fileName.split(' ').join('_');
				this.child.avatar = "/srv/" + fileName;
				
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
			goToChildren: utils.goToChildren
		}
	}
</script>
