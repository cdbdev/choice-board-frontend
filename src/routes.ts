import CornerView from './comp/CornerView.vue';
import ChildList from './comp/ChildList.vue';
import Child from './comp/Child.vue';
import ChildAdd from './comp/ChildAdd.vue';
import ChildEdit from './comp/ChildEdit.vue';
import ChildDelete from './comp/ChildDelete.vue';
import Login from './comp/Welcome.vue';
import CornerList from './comp/CornerList.vue';
import Corner from './comp/Corner.vue';
import CornerAdd from './comp/CornerAdd.vue';
import CornerEdit from './comp/CornerEdit.vue';
import CornerDelete from './comp/CornerDelete.vue';
import Error from './comp/Error.vue';
import Overview from './comp/Overview.vue';
import Cleanup from './comp/Cleanup.vue';

export default [ 
	{ path: '/' , component: Login, name: 'welcome' },
	{ path: '/error/:err_mess', component: Error, name: 'error', props: true },
	{ path: '/main', component: CornerView, name: 'main' },
	{ path: '/children' , component: ChildList },
	{ path: '/child/:child_id', component: Child, name: 'child', props: true  },
	{ path: '/add-child', component: ChildAdd },
	{ path: '/child/:child_id/edit', component: ChildEdit, name: 'child-edit', props: true  },
	{ path: '/child/:child_id/delete', component: ChildDelete, name: 'child-delete', props: true  },
	{ path: '/corners' , component: CornerList },
	{ path: '/corner/:corner_id', component: Corner, name: 'corner', props: true  },
	{ path: '/add-corner', component: CornerAdd },
	{ path: '/corner/:corner_id/edit', component: CornerEdit, name: 'corner-edit', props: true  },
	{ path: '/corner/:corner_id/delete', component: CornerDelete, name: 'corner-delete', props: true  },
	{ path: '/overview' , component: Overview },
	{ path: '/cleanup' , component: Cleanup },
]
