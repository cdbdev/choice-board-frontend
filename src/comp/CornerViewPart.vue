<template>	
    <v-flex pt-1 sm3 md3 :class="[visiblePart ? '' : 'hidden-sm-and-up']">
        <v-card>
		<v-list-item>
			<v-list-item-content> 
				<div class ="text-center text-overline">Aantal: {{corner.count}}</div>
			</v-list-item-content>
		</v-list-item>
		<v-img v-on:click="moveAvatars()" :src="corner.avatar" height="100px" contain>
			<v-app-bar
				flat
				color="rgba(0, 0, 0, 0)"
			  >
			</v-app-bar>
		</v-img>
		<v-list-item v-for="item in corner.items" v-bind:key="item.title">
			<v-list-item-avatar tile="false">
				<img v-bind:src="item.avatar" />
			</v-list-item-avatar>
			<v-list-item-content>     
				<v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
			</v-list-item-content>
			<v-row align="center" justify="center">
				<v-list-tile-action>
					<v-icon v-on:click="toggleState(item)" v-bind:class="[item.active ? 'teal--text' : 'grey--text']">check_circle</v-icon>
				</v-list-tile-action>			
			</v-row>
		</v-list-item>
        </v-card>
    </v-flex>

</template>


<script lang="ts">
	import {Item} from '../classes/Item';

    export default {
		props: ['corner', 'itemListIndex', 'visiblePart'],
        data () {
			return {
				
			}
        },
        methods: {
            toggleState: function (item: Item) {
                this.$emit('toggle', item, this.itemListIndex);
			},
			moveAvatars: function () {
				this.$emit('moveItems', this.itemListIndex);
			}
        }
    }
</script>

<style>@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');</style>
