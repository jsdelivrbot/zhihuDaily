import Vue from 'vue'
import Router from 'vue-router'

const Home = require('./component/home.vue')
const Detail = resolve => require.ensure([], ()=>resolve(require('./component/detail.vue')))
const Login = resolve => require.ensure([], ()=>resolve(require('./component/login.vue')))

Vue.use(Router);

export default new Router({
	routes: [
		{path: "/", component: Home},
		{path: '/detail/:id',component:Detail},
		{path: '/login',component:Login}
	]
})