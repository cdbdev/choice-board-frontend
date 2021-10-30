import loc from "./nl.json";

export default{
	t(key: string):string {
		if(loc[key])		
			return loc[key];
		else
			return "<" + key + ">";
	}
}