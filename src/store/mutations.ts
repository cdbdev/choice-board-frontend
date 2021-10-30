import Vue from 'vue';
import store from './store';
import utils from '../helpers/utils';
import {Child} from '../classes/Child';
import {Item} from '../classes/Item';	
import {Corner} from '../classes/Corner';
import rest from '../services/rest';	

/**
 * CHILD MUTATIONS
 */
export function fillChildrenData(...obj:Array<object>) {
	let children = <Array<Child>>obj[0];
	store.state.childrenData = children;
}

export function addChild(...obj:Array<object>) {
	let newChild = <Child>obj[0];
	//let persist = <Boolean>obj[1];
	store.state.childrenData.push(newChild);
		
	/*if(persist.valueOf() === true) {
		rest.addChild(newChild, function(response: string, data) {
			if(response !== "Success")
				alert("oh no, a problem...: " + data);
		});
	}*/
}

//export function editChild(id, changedChild) {
export function editChild(...obj:Array<object>) {
	// Vue.set() necessary because update by index is 
	// not supported for binding, see https://vuejs.org/v2/guide/list.html#Caveats	
	let id = new Number(obj[0]).valueOf();
	let changedChild = <Child>obj[1];
	Vue.set(store.state.childrenData, id, changedChild);
	
	// change icon on item of corner 
	let currItemList = store.state.cornerData.cornerList;
	let linkedCorner = currItemList.find((corner) => corner.id === changedChild.position );
	
	if(linkedCorner)
	{
		let currentItem = linkedCorner.items.find((item)=> item.title === changedChild.fullName);
		if(currentItem)
			currentItem.avatar = changedChild.avatar;
	}
	
	/*rest.updateChild(changedChild, function(response: string, data) {
	if(response !== "Success")
		alert("oh no, a problem...: " + data);
	});*/
	
}

export function deleteChild(...obj:Array<object>) {
	let id = new Number(obj[0]).valueOf();
	let childToDelete = store.state.childrenData[id];
	store.state.childrenData.splice(id,1);
	
	/*rest.deleteChild(childToDelete, function(response: string, data) {
		if(response !== "Success")
			alert("oh no, a problem...: " + data);
	});*/
}

export function clearUpdatedChildren() {
	store.state.updatedChildren = [];
}

/**
 * ITEM MUTATIONS
 */
export function clearActiveFlags(listIndex: number) {
	for(let item of store.state.cornerData.cornerList[listIndex].items)
	{
		item.active = false;
	}
}

export function moveToDestination(itemListIndex: number) {
	let dataList = store.state.cornerData.cornerList;
	let destList = store.state.cornerData.cornerList[itemListIndex];	
	
	// Move avatars to destination and remove them from source
	for(let cornerList of dataList)
	{
		// collect data
		let activeItemsList: Array<Item> = cornerList.items.filter(utils.filterActiveItems);  
		let inactiveItemsList: Array<Item> = cornerList.items.filter(utils.filterInactiveItems);
		
		// remove active items from current list and keep inactive items
		cornerList.items.splice(0,cornerList.items.length);
		cornerList.items.push.apply(cornerList.items, inactiveItemsList);
		
		// add active items from other list to destination list		
		destList.items.push.apply(destList.items, activeItemsList);
		
		// Update position on child		
		for(let activeItem of activeItemsList)
		{
			let childToUpdate = store.state.childrenData.find((child) => child.fullName === activeItem.title);
			let corner = store.state.cornerData.cornerList.find((corner) => corner.name == destList.name);
			childToUpdate.position = corner.id;
			activeItem.active = false;
			
			store.state.updatedChildren.push({id: childToUpdate.id, position: childToUpdate.position});
		}		
	}
	
	// send children update array through rest
	/*rest.updatePositions(updatedChildren, function(response: string, data) {
		if(response !== "Success")
			alert("oh no, a problem...: " + data);
	});*/
	
	// Clear active flags
	this.clearActiveFlags(itemListIndex);
}

export function toggleState(item: Item, itemListIndex: number) {
	let obj = store.state.cornerData.cornerList[itemListIndex].items.find(o => o.title === item.title);
	(obj.active)?obj.active = false:obj.active = true;
}

export function addChildToShelveItemList(child: Child)
{
	let currItemList = store.state.cornerData.cornerList;
	let shelveCorner = currItemList.find((corner) => corner.name === "Leerlingen" );
	
	if(shelveCorner)
	{
		let item = {
			active: false,
			title: child.fullName,
			avatar: child.avatar
		};
		shelveCorner.items.push(item);
	}
}

export function removeChildFromItemList(child: Child)
{ 
	let selectedCorner = store.state.cornerData.cornerList.find((corner) => corner.id == child.position);
	let itemIndex = getItemIndex(selectedCorner, child);
	selectedCorner.items.splice(itemIndex, 1);
}

export function getItemIndex(corner: Corner, child: Child): number
{
	for(let key = 0; key < corner.items.length; key++)
	{
		if(corner.items[key].title === child.fullName)
			return key;
	}
}

/**
 * 	CORNER MUTATIONS
 */
export function clearCornerData()
{
	store.state.cornerData.cornerList = [];
	store.state.cornerData.cornerNames = [];
	store.state.cornerData.visibleCorners = [];
}

export function addCornerData(corner: Corner, position: number/*, persist: Boolean*/)
{ 
	store.state.cornerData.cornerList.push(corner); // Add corner
	store.state.cornerData.cornerNames.push(corner.name); // Add cornername
	store.state.cornerData.visibleCorners[position] = corner.visible; // init visible corner
	
	/*if(persist.valueOf() === true) {
		rest.addCorner(corner, function(response: string, data) {
			if(response !== "Success")
				alert("oh no, a problem...: " + data);
		});
	}*/
}

export function editCorner(...obj:Array<object>) {
	// Vue.set() necessary because update by index is 
	// not supported for binding, see https://vuejs.org/v2/guide/list.html#Caveats
	//if(obj.length === 2)
	//{
		let id = new Number(obj[0]).valueOf();
		let changedCorner = <Corner>obj[1];
		Vue.set(store.state.cornerData.cornerList, id, changedCorner);
		
		/*rest.updateCorner(changedCorner, function(response: string, data) {
			if(response !== "Success")
				alert("oh no, a problem...: " + data);
		});*/
	//}
}

export function removeChildrenFromCorner(corner: Corner)
{
	let position = store.state.cornerData.cornerList.findIndex((cornerTmp) => cornerTmp.name === corner.name);	
	
	for(let child of store.state.childrenData)
	{
		if(child.position === corner.id)
		{
			child.position = store.state.cornerData.cornerList[0].id; // reset child position
			store.state.updatedChildren.push(child);
		}
	}	

	// add items to shelve (default location)
	store.state.cornerData.cornerList[0].items = store.state.cornerData.cornerList[0].items.concat(corner.items);

	// clear corner name
	store.state.cornerData.cornerNames.splice(position, 1);	

	// clear corner visibility
	store.state.cornerData.visibleCorners.splice(position, 1);
	
	// send children update array through rest
	/*if(updatedChildren.length > 0) {
		rest.updatePositions(updatedChildren, function(response: string, data) {
			if(response !== "Success")
				alert("oh no, a problem...: " + data);
		});
	}*/
}

export function deleteCorner(...obj:Array<object>) {
	let id = new Number(obj[0]).valueOf();
	let cornerToDelete = store.state.cornerData.cornerList[id];
	store.state.cornerData.cornerList.splice(id,1);
	
	/*rest.deleteCorner(cornerToDelete, function(response: string, data) {
		if(response !== "Success")
			alert("oh no, a problem...: " + data);
	});*/
}

export function cleanChildren() {
	store.state.childrenData = [];
	
	for(let corner of store.state.cornerData.cornerList) {
		corner.items = [];
	}
}

export function cleanCorners() {
	store.state.cornerData.cornerNames = [];
	store.state.cornerData.visibleCorners = [];
	store.state.cornerData.cornerList = [];	
	
	var cornerToAdd = {
		id: 1,
		name: "Leerlingen",
		avatar: "/srv/static/corners/leerlingen.jpg",
		visible: true,
		count: 1,
		items: []
	};
	
	this.addCornerData(cornerToAdd, 0);
}

/*export function addCorner(corner: Corner) {
	store.state.cornerData.cornerList.push(corner);
}

export function addCornerName(cornerName: string) {
    store.state.cornerData.cornerNames.push(cornerName);
}

export function initVisibleCorner(position: number, value: boolean) {
    store.state.cornerData.visibleCorners[position] = value;
}*/

/*export function changeCornerNames(cornerNames: Array<string>) {
	store.state.cornerData.cornerNames = cornerNames;
}*/

/*export function changeVisibleCorners(visibleCorners: Array<boolean>) {
	store.state.cornerData.visibleCorners = visibleCorners;
}*/

export function updateVisibleCorners(cornerList: Array<string>){
	// Initial value false
	store.state.cornerData.visibleCorners.forEach((item, index, arr) => arr[index] = false);
	
	// Set true for visible corner
	for(let corner of cornerList)
	{
		let cornerToUpdate = store.state.cornerData.cornerNames.indexOf(corner);
		store.state.cornerData.visibleCorners[cornerToUpdate] = true;
	}
}