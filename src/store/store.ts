import rest from '../services/rest';	

const store = {
	state: {
		childrenData: [],
		updatedChildren: [],
		cornerData: {
			cornerNames: [],//rest.getCornerData().cornerNames,
			visibleCorners: [], //rest.getCornerData().visibleCorners,
			cornerList: []
		}
	}
}

export default store;