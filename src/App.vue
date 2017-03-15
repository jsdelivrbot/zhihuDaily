<template>
<div>
	<mt-header title="知乎日报" name="header">
		<a @click="routerBack" slot="left" v-show="back">
          <mt-button icon="back"></mt-button>
        </a>
	</mt-header>
	<router-view></router-view>
</div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
	data() {
		return {
			back: false,
		}
	},
	methods: {
		fetchData() {
			this.back = (this.$route.path === "/" ? false : true)
		},
		routerBack() {
			this.$router.go(-1);
		}
	},
	watch: {
    	// 如果路由有变化，会再次执行该方法
   		'$route': 'fetchData'
  	}
}
</script>
