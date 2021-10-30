import * as store from '../store/index';
import {Child} from '../classes/Child';
import {Corner} from '../classes/Corner';
import {Cleanup} from '../classes/Cleanup';
import rest from '../services/rest';	

/**
 * 	 CHILDREN ACTIONS
 */
export function addChild(...obj:Array<object>) {	
	return new Promise(function(resolve, reject) {
		let newChild = <Child>obj[0];	
		let persist = <Boolean>obj[1];	
		
		store.commit('addChild',obj[0]);
		
		if(persist.valueOf() === true) {
			rest.addChild(newChild, function(response: string, data) {				
				if(response !== "Success")
				{	
					reject(data);
					return;
				}
				resolve("OK");
			});
		}
		else
			resolve("OK");
	});
}

export function editChild(...obj:Array<object>) {
	return new Promise(function(resolve, reject) {		
		if(obj.length === 2)
		{	
			let childParam = <Child>obj[1];
			let changedChild = store.getters.getChild(childParam.id);
			
			store.commit('editChild',obj[0], obj[1]);		
			
			rest.updateChild(changedChild, function(response: string, data) {
				if(response !== "Success")
				{	
					reject(data);
					return;
				}
				resolve("OK");
			});
		}
		else
			resolve("OK");
	});
}	

export function deleteChild(...obj:Array<object>) {
	return new Promise(function(resolve, reject) {		
		let childToDelete = <Child>obj[0];
		let id = store.getters.getChildKey(childToDelete.id);	
		
		store.commit('deleteChild', new Number(id));
		
		rest.deleteChild(childToDelete, function(response: string, data) {
			if(response !== "Success")
			{	
				reject(data);
				return;
			}
			resolve("OK");
		});
	});
}

export function moveToDestination(itemListIndex: number) {	
	return new Promise(function(resolve, reject) {		
		store.commit('moveToDestination', new Number(itemListIndex));	
		
		let updatedChildren = store.getters.getUpdatedChildren();
		
		// send children update array through rest		
		rest.updatePositions(updatedChildren, function(response: string, data) {
			
			if(response !== "Success")
			{	
				reject(data);
				return;
			}
			resolve("OK");
		});
		
		store.commit('clearUpdatedChildren');
	});
}

export function retrieveChartInfo(child: Child) {
	return new Promise(function(resolve, reject) {
		rest.getChartInfo(child, function(response: string, data) {			
			if(response !== "Success")
			{	
				reject(data);
				return;
			}
			resolve(data);
		});
	});
}

export function retrieveChartOverview() {
	return new Promise(function(resolve, reject) {
		rest.getChartOverview(function(response: string, data) {			
			if(response !== "Success")
			{	
				reject(data);
				return;
			}
			resolve(data);
		});
	});
}

/**
 * 	 CORNER ACTIONS
 */
export function addCornerData(corner: Corner, position: number, persist: Boolean)
{
	return new Promise(function(resolve, reject) {		
		store.commit('addCornerData', corner, new Number(position));
		
		if(persist.valueOf() === true) {
			rest.addCorner(corner, function(response: string, data) {
				if(response !== "Success")
				{	
					reject(data);
					return;
				}
				resolve("OK");
			});
		}
		else
			resolve("OK");
	});
}

export function editCorner(...obj:Array<object>) {
	return new Promise(function(resolve, reject) {		
		if(obj.length === 2)
		{
			let id = new Number(obj[0]).valueOf();
			let changedCorner = <Corner>obj[1];
			
			store.commit('editCorner',obj[0], obj[1]);	
					
			rest.updateCorner(changedCorner, function(response: string, data) {
				if(response !== "Success")
				{	
					reject(data);
					return;
				}
				resolve("OK");
			});
		}
	});
}

export function updateCornerVisible(cornersToUpdate:Array<Corner>) {
	return new Promise(function(resolve, reject) {				
		rest.updateCornerVisibility(cornersToUpdate, function(response: string, data) {
			if(response !== "Success")
			{	
				reject(data);
				return;
			}
			resolve("OK");
		});
	});
}

export function deleteCorner(...obj:Array<object>) {
	return new Promise(function(resolve, reject) {		
		let cornerToDelete = <Corner>obj[0];
		let id = store.getters.getCornerKey(cornerToDelete.id);	
		
		store.commit('deleteCorner', new Number(id));
		
		rest.deleteCorner(cornerToDelete, function(response: string, data) {
			if(response !== "Success")
			{	
				reject(data);
				return;
			}
			resolve("OK");
		});
	});
}

export function removeChildrenFromCorner(corner: Corner)
{
	return new Promise(function(resolve, reject) {		
		store.commit('removeChildrenFromCorner', corner);
		
		let updatedChildren = store.getters.getUpdatedChildren();
		
		// send children update array through rest
		if(updatedChildren.length > 0) {
			rest.updatePositions(updatedChildren, function(response: string, data) {
				if(response !== "Success")
				{	
					reject(data);
					return;
				}
				resolve("OK");
			});
		}
		else
			resolve("OK");
		
		store.commit('clearUpdatedChildren');
	});
}

export function cleanup(dataClean:Cleanup)
{
	return new Promise(function(resolve, reject) {
		if(dataClean.children === true) {			
			store.commit('cleanChildren');
		}
		
		if(dataClean.corners === true) {
			store.commit('cleanCorners');
		}
		
		rest.cleanup(dataClean, function(response: string, data) {
			if(response !== "Success")
			{	
				reject(data);
				return;
			}
			resolve("OK");
		});
	});
}
	

export function updateVisibleCorners(cornerList: Array<string>) {
	store.commit('updateVisibleCorners', cornerList);
	
	// update visibility
	// TODO rest.???
}