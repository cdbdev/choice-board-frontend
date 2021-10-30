import {Item} from '../classes/Item';
import {Child} from '../classes/Child';
import {Corner} from '../classes/Corner';
import {Cleanup} from '../classes/Cleanup';
import axios from 'axios';


let queryAll = (cbf: Function) => {
 	
	axios.get('http://localhost:3500/cornerData')
		.then(function (response) {
			//var result = JSON.parse(response.data);
			cbf("Success", response.data);
		})
		.catch(function (error) {		
			console.log("Exception: : " + error );
			cbf("Error", error);
		})
	;
};

/**
 * CHILD SERVICES
 */
let updatePositions = (updatedChildren, cbf: Function) => {
 	let model = { arr: updatedChildren};
	
	axios.post('http://localhost:3500/childposition', model)
		.then(function (response) {
			cbf("Success", response.data);
		})
		.catch(function (error) {	
			console.log("Exception: : " + error );
			cbf("Error", error);
		})
	;
};

let addChild = (child: Child, cbf: Function) => {
	axios.post('http://localhost:3500/child', child)
	  .then(function(response){
		cbf("Success", response.data);
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
};

let deleteChild = (child: Child, cbf: Function) => {
	axios.delete('http://localhost:3500/child', { data: child})
	  .then(function(response){
		cbf("Success", response.data);
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
}

let updateChild = (child: Child, cbf: Function) => {
	axios.put('http://localhost:3500/child', child)
	  .then(function(response){
		cbf("Success", response.data);
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
}

/**
 * CORNER SERVICES
 */
let addCorner = (corner: Corner, cbf: Function) => {
	axios.post('http://localhost:3500/corner', corner)
	  .then(function(response){
		cbf("Success", response.data);
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
};

let deleteCorner = (corner: Corner, cbf: Function) => {
	axios.delete('http://localhost:3500/corner', { data: corner})
	  .then(function(response){
		cbf("Success", response.data);
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
}

let updateCorner = (corner: Corner, cbf: Function) => {
	axios.put('http://localhost:3500/corner', corner)
	  .then(function(response){
		cbf("Success", response.data);
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
}

let updateCornerVisibility = (cornersToUpdate: Array<Corner>, cbf: Function) => {
	let model = { arr: cornersToUpdate};
	axios.post('http://localhost:3500/cornerVisibility', model)
	  .then(function(response){
		cbf("Success", response.data)
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
}

let getChartInfo = (child: Child, cbf: Function) => {	
	axios.post('http://localhost:3500/chart', child)
	  .then(function(response){
		cbf("Success", response.data)
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
};

let getChartOverview = (cbf: Function) => {	
	axios.get('http://localhost:3500/chartOverview')
	  .then(function(response){
		cbf("Success", response.data)
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
};

let cleanup = (dataClean:Cleanup, cbf: Function) => {	
	axios.post('http://localhost:3500/cleanup', dataClean)
	  .then(function(response){
		cbf("Success", response.data)
	  })
	  .catch(function (error) {
		console.log("Exception: : " + error );
		cbf("Error", error);
	  })
	;
};

/*let insertActivity = (activity, cbf: Function) => {
 	axios.post('http://localhost:3500/childactivity', activity)
		.then(function (response) {
			cbf("Success", response.data);
		})
		.catch(function (error) {				
			cbf("Error", error);
		})
	;
};*/
	
export default {
	queryAll: queryAll,
	updatePositions: updatePositions,
	addChild: addChild,
	deleteChild: deleteChild,
	updateChild: updateChild,
	addCorner: addCorner,
	deleteCorner: deleteCorner,
	updateCorner: updateCorner,
	getChartInfo: getChartInfo,
	getChartOverview: getChartOverview,
	updateCornerVisibility: updateCornerVisibility,
	cleanup: cleanup
	/*,insertActivity: insertActivity*/
}
