<template>
<div>
	<div class="hot-main-box">
		<p class="hot-main-title">精选</p>
        <p class="hot-main-subtitle">呈现最新的精选日报</p>
	</div>

	<div>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<h3 class="hot-box-title">{{gormatTime(datalist.date)}}</h3>
			<div>
				<div class="list-box" v-for="list in datalist['stories']" @click="goArticle(list.id)">
					<p class="list-box-title">{{list.title}}</p>
					<p class="list-box-sub">知乎日报</p>
				</div>
			</div>
			<div v-for="item in stores" v-if="stores.length > 0">
				<h3 class="hot-box-title">{{gormatTime(item.date)}}</h3>
				<div>
					<div class="list-box" v-for="list in item['stories']" @click="goArticle(list.id)">
						<p class="list-box-title">{{list.title}}</p>
						<p class="list-box-sub">知乎日报</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
export default {
	data() {
		return {
			datalist: {},
			stores: [],
			dataListDateCurrent: new Date()
		}
	},
	created() {
		var time = new Date();
		var m = (time.getMonth()+1).toString().length >1 ? time.getMonth()+1 : "0" + (time.getMonth()+1);
		this.dataListDateCurrent = "" + time.getFullYear() + m + time.getDate();
		this.$http.get('/news/latest').then(function(data) {
			this.datalist = data.data;
			this.dataListDateCurrent = data.data.date;
		}).catch(function(err) {
			console.log(err)
		});
		
	},
	methods: {
		goArticle: function(id) {
			this.$router.push({path: '/detail/'+id})
		},
		gormatTime(t) {
			var time = new Date(t*1000);
			var day = time.getDay();
			var d;
			switch(day) {
				case 0:
					d = '星期天';
					break;
				case 1:
					d = '星期一';
					break;
				case 2:
					d = '星期二';
					break;
				case 3:
					d = '星期三';
					break;
				case 4:
					d = '星期四';
					break;
				case 5:
					d = '星期五';
					break;
				case 6:
					d = '星期六';
					break;
				default: 
					d = '';
					break;
			}
			return time.getMonth()+"月"+time.getDate()+"日 "+d;
		},
		loadMore() {
			this.$http.get('/news/before/'+this.dataListDateCurrent).then(function(data) {
				if(this.dataListDateCurrent !== null) {this.stores.push(data.data);
				this.dataListDateCurrent = data.data.date;}
			}).catch(function(err) {
				console.log(err)
			});
		}
	}
}
</script>

<style>
	
.hot-main-box{ position: relative; z-index: 1; background:url('../assets/001.jpg'); background-size:cover; height:120px; text-align:right; padding-right:50px;}
.hot-main-title{ color: #FFF; font-size: 23px; z-index:2; font-weight: 500; padding-top:45px;}
.hot-main-subtitle{ color: #FFF; font-size: 16px; margin-top: 4px; z-index:2;}
.list-box{ padding: 20px 20px 20px 40px; display: block; font-size: 30rpx; border-bottom: 1px solid #F6F6F6; position: relative;}
.list-box::after{ display: block; content: ""; position: absolute; width: 6px; height: 6px; background: #ff6511; border-radius: 50%; top: 25px; left: 20px; }
.list-box-title{ font-weight: 400; line-height: 42rpx; }
.list-box-sub{ font-size: 24rpx; color: #666; padding-top: 6px; }
.hot-box-title{ font-size: 32rpx; height: 30px; line-height: 32px; font-weight: 400; color: #444; padding: 5px 10px; border: 1px solid #444; width:150px; text-align:center; margin: 20px auto 0; }

</style>