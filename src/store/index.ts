import * as mutations from './mutations';
import * as actions from './actions';

export * from './getters';

export function commit(method: string, ...obj:Array<object>) {
	mutations[method](...obj);
}

export function dispatch(method: string, ...obj:Array<object>):Promise<Object> {
	return actions[method](...obj);
}