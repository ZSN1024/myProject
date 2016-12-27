var express=require('express');
var bodyParser=require('body-parser');
var multer = require('multer');
var app=express();
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var str;
var file='zhongjiang.txt'

//设置跨域
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

//读取txt文件里的名字
var fs=require('fs');
var arr=[];
var data = fs.readFileSync('name.txt');
console.log("同步读取: " + data.toString());
console.log(data.toString())
var arr=data.toString();
console.log("程序执行完毕。");


//写个接口getName
app.get('/getName',function(req,res){
	res.status(200),
	res.json(arr)
});


//写个接口post
app.post('/111',function(req,res){
	res.status(200),
	console.log(req.query)
	res.json("post")
});

//保存数据接口
app.get('/save',function(req,res){
	res.status(200),
	str="一等奖中奖名单："+req.query.name,
	console.log("req.body:"+req.query.name)
	writeFile(file)
	str=""
});


//配置服务端口
var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log(host);
	console.log(port);
	console.log('Example app listening at http://%s:%s', host, port);
})




//中奖名单写如文件
function writeFile(file){
	fs.appendFile(file,str,function(err){
		if (err) {
			console.log("fail"+err);
		}else{
			console.log("写入文件ok")
		}
	})
}
