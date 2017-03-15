<template>
<div>
	<div class="swiper-tab">
		<span @click.prevent="active ='theme'" :class="{'on':active == 'theme'}">日报</span>
		<span @click.prevent="active = 'select'" :class="{'on':active == 'select'}">精选</span>
	</div>
	<mt-tab-container v-model="active" class="mt-tab-container">
		<mt-tab-container-item id="theme">
			<theme v-on:increment="incrementTotal"></theme>
		</mt-tab-container-item>
		<mt-tab-container-item id="select"> 
			<select-item></select-item>
		</mt-tab-container-item>
	</mt-tab-container>
</div>
</template>

<script>
import theme from './theme.vue'
import selectItem from './select.vue'
import { TabContainer, TabContainerItem } from 'mint-ui';
export default {
	data: function(){
		return {
			active: 'theme'
		}
	},
	components: {
		theme,
		selectItem
	},
	methods: {
		incrementTotal() {
			this.active = 'select';
		}
	}
}
</script>

<style>
body, p, ul, li, span, div {margin:0; padding:0;}

.swiper-tab{ height: 30px; line-height: 30px; background: #FFF; display: flex; position: relative; z-index: 2; border-bottom: 1px solid #F4F4F4; flex-direction:row; justify-content:center; align-items:center;}
.swiper-tab span{ margin: 0 20px;  padding: 0 4px; font-size: 28rpx; font-family: Helvetica, Arial, "Hiragino Sans GB", "Source Han Sans CN", "PingFang SC", Roboto, "微软雅黑", "Heiti SC", "Microsoft Yahei", sans-serif }
.on{ border-bottom: 1px solid #26a2ff; color: #26a2ff; }

.mt-tab-container {position:absolute; width:100%; top:70px;}

</style>