<template>
<div>
	<div class="page-field">
	    <div class="page-title">登录</div>
	    <from class="page-part" >
	      <mt-field label="用户名" placeholder="请输入用户名" :attr="{ maxlength: 10 }" v-model="user" name="user"></mt-field>
	      <mt-field label="密码" placeholder="请输入密码" type="password" name="password"></mt-field>
	    </from>
	    <div class="page-button-group" @click="login">
		    <mt-button size="large" type="primary">登录</mt-button>
		    <mt-button size="large" type="danger">注册</mt-button>
		 </div>
	</div>
</div>
</template>

<script>
import { Field,Button } from 'mint-ui';
export default {
	data() {
		return {
			user: ""
		}
	},
	methods: {
		login() {
			this.$router.go(-1);
		}
	}
}
</script>

<style>
.page-field {width:90%; margin:20px auto;}
.page-title {text-align:center; font-size:26px;}
.page-part {margin:20px 0;}
.page-button-group button {margin:10px 0;}
</style>