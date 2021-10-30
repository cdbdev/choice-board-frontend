<template>
	<v-app>					
		<v-card class="ma-2">			
			<v-card-title primary-title>					
				<v-flex md1>
					<v-card class="mt-2 ml-2 mr-2"">			
						<v-img :src="child.avatar" height="100" contain></v-img>
					</v-card>	
				</v-flex>				
			</v-card-title>
			<v-card-title primary-title>
				<div class="headline">{{locale("edit")}}</div>				
			</v-card-title>
			<v-card-text>                
                <v-text-field :label='locale("firstname")' v-model="child.firstname"></v-text-field>
                <v-text-field :label='locale("lastname")' v-model="child.lastname"></v-text-field>
                <!-- <v-text-field label="Afbeelding" v-model="child.avatar"></v-text-field> -->
				<img src="" height="170" :alt='locale("image")+"..."' /><br/><br/>
				<v-btn class="ma-2" color="teal" outlined @click="updatechild()"><v-icon>save</v-icon></v-btn>	
				<v-btn class="ma-2" outlined color="blue" @click="selectImage()">
					<v-icon>file_upload</v-icon>{{locale("upload_image")}}
					<input id="selectFile" type="file" accept="image/*" style="display: none" />
				</v-btn>						
				<v-btn outlined class="ma-2" @click="goToChildren()"><v-icon>cancel</v-icon></v-btn>				
			</v-card-text>
		</v-card>
	</v-app>
</template>	

<script lang="ts">	
	import utils from '../helpers/utils';
	import * as store from '../store/index';
	import axios from 'axios';
	
	export default {
		props: ['child_id'],
		mounted() {
			document.getElementById("selectFile").addEventListener("change", this.readImage, false);
		},	
		data: function () {
			return {
				
			};
		},
		computed: {
			child() {		
				return store.getters.getChild(this.child_id);				
			}			
		},
		methods: {
			updatechild: function () {		
				let that = this;
				this.uploadImage();
			  
			    if(this.child.avatar ==="/srv/static/children/")			  
					this.child.avatar = "/srv/static/doc-images/lists/qm_face.jpg"
					
				let childKey = new Number(store.getters.getChildKey(this.child_id));
				
				//store.commit('editChild', childKey, this.child);
				store.dispatch('editChild', childKey, this.child).then(function(value) {
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
						//console.log(response.data)
					  })
					  .catch(function (error) {
						alert(error);
					  })
					; 
				}	  	
			},			
			goToChildren: utils.goToChildren
		}
	}
</script>
