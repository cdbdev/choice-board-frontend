import store from './store';
import {Item} from '../classes/Item';
import {Child} from '../classes/Child';

const getters = {
	/**
	 * CHILD GETTERS
	 */	
	getChildren() {
		return store.state.childrenData;
	},
	getChildKey(childId: number):number {
		for (let key = 0; key < store.state.childrenData.length; key++) {
			if (store.state.childrenData[key].id == childId) {					  
			  return key;
			}
		}
	},
	getChild(childId: number) {
		return store.state.childrenData[this.getChildKey(childId)];
	},
	
	getChildNextId(): number {
		let newChildId = 0;
		for (let key = 0; key < store.state.childrenData.length; key++) {
			if (store.state.childrenData[key].id > newChildId) {					  
			  newChildId = store.state.childrenData[key].id;
			}
		}
		
		return newChildId + 1;
	},
	
	childExists(child: string) {
		for (let key = 0; key < store.state.childrenData.length; key++) {
			if (store.state.childrenData[key].fullName.toUpperCase() == child.toUpperCase()) {					  
			  return true;
			}
		}
		
		return false;
	},
	
	getUpdatedChildren() {
		return store.state.updatedChildren;
	},
	
	/**
	*	ITEM GETTERS
	**/
	/*getItemList() {
		return store.state.cornerData.itemList;
	},*/
	/*getItems(index: number) {
		return store.state.cornerData.itemList[index];
	},
	getItemKey(listID: number, item: Item):number {
		let currentItemList = store.state.cornerData.itemList[listID];
		for(let key = 0; key < currentItemList.items.length; key++)
		{
			if(currentItemList.items[key].title === item.title)
				return key;
		}
	},*/
	
	/**
	 * 	CORNER GETTERS
	 */
	getCornerNames() {
		return store.state.cornerData.cornerNames;
	},
    getCornerList() {		
		//console.log(store.state.cornerData.cornerList);
        return store.state.cornerData.cornerList;
    },
	getVisibleCorners() {
		let cornersVisible: Array<string> = [];
		store.state.cornerData.visibleCorners.forEach((item, index) => { if(item === true) cornersVisible.push(store.state.cornerData.cornerNames[index]) });
		
		return cornersVisible;
	},
	getVisibleOption() {
		return store.state.cornerData.visibleCorners;
	},
	getCornerKey(cornerId: number):number {
		for (let key = 0; key < store.state.cornerData.cornerList.length; key++) {
			if (store.state.cornerData.cornerList[key].id == cornerId) {					  
			  return key;
			}
		}
	},
	getCorner(cornerId: number) {
		return store.state.cornerData.cornerList[this.getCornerKey(cornerId)];
	},
	
	getCornerNextId(): number {
		let newCornerId = 0;
		for (let key = 0; key < store.state.cornerData.cornerList.length; key++) {
			if (store.state.cornerData.cornerList[key].id > newCornerId) {					  
			  newCornerId = store.state.cornerData.cornerList[key].id;
			}
		}
		
		return newCornerId + 1;
	},
	
	cornerExists(corner: string) {
		for (let key = 0; key < store.state.cornerData.cornerList.length; key++) {
			if (store.state.cornerData.cornerList[key].name.toUpperCase() == corner.toUpperCase()) {					  
			  return true;
			}
		}
		
		return false;
	}
};

export  {
	getters
}
