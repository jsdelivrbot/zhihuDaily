<template>
<div>
	<mt-swipe :auto="4000" class="mt-swipe">
		<mt-swipe-item v-for="img in imgUrls">
			<img :src="img" />
		</mt-swipe-item>
	</mt-swipe>
	<div class="themes-box-top">
		<p class="themes-box-title">专栏</p>
		<p class="themes-box-subtitle">你想要知道日报专栏</p>
	</div>

	<div>
		<div v-for="item in themeList" class="themeList" @click="jinxuan">
			<p class="themeTitle">{{item.name}}</p>
			<p class="description">{{item.description}}</p>
		</div>
	</div>
</div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
	data: function(){
		return {
			imgUrls: [
		      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
		      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
		      'http://caishenye2015.gnway.cc:38080/material/pic?name=1.jpg'
		    ],
		    themeList: []
		}
	},
	created() {		
		this.$http.get('/themes').then(function(data) {
			this.themeList = data.data.others;
		}).catch(function(err) {
			console.log(err)
		});
	},
	methods: {
		jinxuan() {
			this.$emit('increment')
		}
	}
}
</script>

<style>
.mt-swipe {width:100%; height:200px;}
.mt-swipe img {width:100%; height:200px;}

.themes-box-top{ text-align: center; padding-bottom: 16px; padding-top: 16px; background: #F9F9F9; }
.themes-box-title{ font-size: 16px; font-weight: 500; display: block; }
.themes-box-subtitle{ font-size: 12px; color: #666; display: block; margin-top: 4px; }

.themeList{ padding: 20px 0; margin:0 20px;}
.themeList + .themeList {border-top:1px solid #F2F2F2;}
.themeTitle{ font-size: 14px; color: #444; height: 20px; line-height: 20px; overflow: hidden; }
.description{ font-size: 12px; color: #999; height: 20px; line-height: 20px; overflow: hidden; }


</style>