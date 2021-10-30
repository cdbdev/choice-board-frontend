<template>
	<v-app>					
		<v-card class="ma-2">			
			<v-card-title primary-title>							
			   <v-flex md1>
			        <div class="headline">{{locale("edit")}}</div>
					<v-card class="mt-2 ml-2 mr-2"">								
						<v-img :src="corner.avatar" height="100" contain></v-img>
					</v-card>	
				</v-flex>		
			</v-card-title>
			<v-card-text>                
                <v-text-field :label='locale("name")' readonly v-model="corner.name"></v-text-field>
                <v-text-field :label='locale("image")' readonly v-model="corner.avatar"></v-text-field>
			
				<v-text-field :label='locale("count")' type="number" v-model.number="corner.count"></v-text-field>
				<img src="" height="200" :alt='locale("image")+"..."' /><br/><br/>
				<v-btn class="ma-2" color="teal" outlined @click="updateCorner()"><v-icon>save</v-icon></v-btn>	
				<v-btn class="ma-2" outlined color="blue" @click="selectImage()">
					<v-icon>file_upload</v-icon>{{locale("upload_image")}}
					<input id="selectFile" type="file" accept="image/*" style="display: none" />
				</v-btn>
				<v-btn outlined class="ma-2" @click="goToCorners()"><v-icon>cancel</v-icon></v-btn>				
			</v-card-text>
		</v-card>
	</v-app>
</template>

<script lang="ts">
	import utils from '../helpers/utils';
	import * as store from '../store/index';
	import axios from 'axios';
	
	export default {
		props: ['corner_id'],
		mounted() {
			document.getElementById("selectFile").addEventListener("change", this.readImage, false);
		},
		data: function () {
			return {
				
			};
		},
		computed: {
			corner() {		
				return store.getters.getCorner(this.corner_id);				
			}			
		},
		methods: {
			updateCorner: function () {		
				let that = this;
				
				this.uploadImage();
				
				let cornerKey = new Number(store.getters.getCornerKey(this.corner_id));
				
				//store.commit('editCorner', cornerKey, this.corner);
				
				store.dispatch('editCorner', cornerKey, this.corner).then(function(value) {
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
				
				if(this.imageName !== undefined) {
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
				}
			},
			goToCorners: utils.goToCorners
		}
	}
</script>
