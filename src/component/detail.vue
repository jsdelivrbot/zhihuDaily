<template>
<div>
	<h3 class="box-title">{{data.title}}</h3>
	<div v-html="data.body" class="content"></div>
	<div>
		<h4 class="comments-title">最新评论</h4>
		<div class="comments-main" v-for="item in comment">
			<p class="comments-author">{{item.author}}</p>
			<p class="comments-content">{{item.content}}</p>
		</div>
	</div>
	<div class="share-box-show">
		<input type="text" placeholder="你有什么看法?" v-model="text"/>
		<span class="zan"><img src="../assets/zan.png" /></span>
		<span class="com"><img src="../assets/comments.png" @click="addComment"/></span>
		<span class="share" @click="popupVisible=true"><img src="../assets/share.png" /></span>
	</div>
	
	 <mt-popup v-model="popupVisible" position="bottom" class="popup">
      <div class="share-box">
      	<img src="../assets/weixin.png" @click="confirm('微信')"/>
      	<img src="../assets/pengyou.png" @click="confirm('微信朋友圈')"/>
      	<img src="../assets/qq.png" @click="confirm('腾讯qq')"/>
      	<img src="../assets/weibo.png" @click="confirm('微博')"/>
      </div>
      <mt-button size="large" @click.native="popupVisible=false">取消</mt-button>
    </mt-popup>
</div>
</template>

<script>
import {Popup,MessageBox,Toast} from 'mint-ui'
import Vue from 'vue'
Vue.use(Popup)
export default {
	data() {
		return {
			text: '',
			popupVisible: false,
			share: [
				{img: '../assets/weixin.png', name: '微信'},
				{img: '../assets/pengyou.png', name: '微信朋友圈'},
				{img: '../assets/qq.png', name: '腾讯qq'},
				{img: '../assets/weibo.png', name: '微博'}
			],
			data:{},
			comment: []
		}
	},
	created() {
		var id = this.$route.params.id;
		this.$http.get('/news/'+id).then(function(data) {
			this.data = data.data;
		});

		this.$http.get("/story/" + id + "/short-comments").then(function(data) {
			this.comment = data.data.comments;
		});
	},
	methods: {
		confirm(name) {
			var that = this;
			var l = Math.round(Math.random());
			console.log(l);
			if(l == 0) {
				MessageBox.alert('你还未登录，请先登录！').then(function() {
					that.$router.push({path: '/login'})
				})
			}else {
				MessageBox.confirm('分享到'+name+"?").then(function() {
					Toast({
			          message: '操作成功',
			          iconClass: 'mintui mintui-success'
			        });
				})
				this.popupVisible = false;
			}
		},
		addComment() {
			var that = this;
			var l = Math.round(Math.random());
			console.log(l);
			if(l == 0) {
				MessageBox.alert('你还未登录，请先登录！').then(function() {
					that.$router.push({path: '/login'})
				})
			}else{
				this.comment.push({'author':'黄同学',content: this.text})
			}
		}
	}
}
</script>

<style>
.box-title{ padding: 25px 20px; background: #f9f9f9; font-size: 18px; color:#000; font-weight: 600;}
.content{ line-height: 1.8em; margin: 20px 0; font-size: 14px; color: #666; }
.question {padding:0 20px !important; overflow:hidden;}
.question-title {font-size:19px; margin:20px 0; line-height:1.4em; color:#222; font-weight: bold;}
.meta {white-space:nowrap; text-overflow:ellipsis; overflow:hidden; font-size:16px; color:#b8b8b8;}
.meta .author {color:#444;}
.meta .bio {color:#999;}
.content {line-height: 1.6em; margin: 10px 0 20px; font-size: 17px; color:#444;}
.content p {margin:20px 0;}
.content img {display:none;}
.comments-author{ margin-bottom: 6px; color: #999; font-weight: bold; height: 20px; line-height: 20px; }
.comments-content{ color: #666; line-height: 20px; }
.comments-title{ font-size: 14px; font-weight: bold; display: block; text-align: center; padding: 10px; }
.comments-main{ margin: 20px; font-size: 14px; }
.share-box-show{border-top:2px solid #ccc; height:40px; line-height:40px; }
.share-box-show input {margin-left:10px; height:25px; line-height:25px; width:250px; border:0; border-left:#26a2ff 3px solid;}
.share-box-show span {width:25px; height:25px; display:inline-block; vertical-align: middle; margin:0 3px;}
.share-box-show img{display:inline-block; width:25px; height:25px;}
.share-box {background:#fff; padding:10%;}
.popup {width:100%;}
.share-box img {width:60px; height:60px;}
.share-box img + img {margin-left:15px;}
</style>