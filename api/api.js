const http = require('http')
const path = require('path')
const express = require('express')
const app = express();
const resolve = file => path.resolve(__dirname, file)

app.use('/dist', express.static(resolve('../dist')))

//代理
const zhihuPath= 'http://news-at.zhihu.com/api/4/'
function crawlerList(mes) {
	var url = zhihuPath + mes;
	return new Promise(function(resolve, reject) {
		http.get(url,function(res) {
			var html = "";
			res.on('data', function(data) {
				html += data;
			})
			res.on('end', function() {
				console.log(html)
				resolve(html);
			})
		}).on('error', function(err) {
			reject(err)
		})
	})
}

app.get('/',function(req, res) {
	res.sendFile('index.html',{root:__dirname+"/../"},function(err) {
		if(err) {
			console.log(err)
		}else {
			console.log('yes');
		}
	});
})

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('*',function(req, res) {
	console.log(req.originalUrl)
	crawlerList(req.originalUrl.slice(1)).then(function(data) {
		res.send(data);
		res.end();
	}).catch(function(err) {
		console.log(err)
	})
})

app.listen(3000,function() {
	console.log('example app listening at 3000');
})