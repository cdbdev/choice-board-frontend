export default {
	filterActiveItems(currentItem) {
		return (currentItem.active)?true:false;
	},
	filterInactiveItems(currentItem) {	
		return (currentItem.active)?false:true;
	},
	goHome: function () {
		this.$router.push('/main');
	},
	goToChildren: function () {
		this.$router.push('/children');
	},
	goToCorners: function () {
		this.$router.push('/corners');
	}
}
