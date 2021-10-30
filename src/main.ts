import Vue from 'vue';
import VueRouter from 'vue-router'; 
import Vuetify from 'vuetify';
import routes from './routes';
import body from './comp/Body.vue';
import 'vuetify/dist/vuetify.min.css';
import locale from './locale/localeAPI';

Vue.use(VueRouter);
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
})

const router = new VueRouter({
  routes 
});	

router.beforeEach((to, from, next) => {
	var err = false;
    if(err)
		next('/corners');
	else
		next();
	
	
  
})

new Vue({ 
	vuetify : new Vuetify(),
	router,
	mounted() {
		//alert("Lanceer eventuele login pagina");
	},
	data() {
		return {
			locale: locale
		}
	},
	components: {
		'body-component': body
	}
}).$mount('#app');

Vue.mixin({
  methods: {
    locale: locale.t
  },
});