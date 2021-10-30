import {Item} from '../classes/Item';

export interface Corner {
	id: number,
	name: string,
	avatar: string,
	visible: boolean,
	count: number,
	items: Array<Item>
}
