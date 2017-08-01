
'use strict'
const  express = require('express'),
		   exphbs = require('express-handlebars'),
		   bodyParser = require('body-parser'),
		   cookieParser = require('cookie-parser'),
		   router = require('./routes'),  //配置 路由文件
		   app = express();

//请求主体解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookie解析
app.use(cookieParser());

//使用static中间件 制定public目录为静态资源目录,其中资源不会经过任何处理
app.use('/static',express.static(__dirname + '/public'));

//请求接口入口地址
router.urls(app);

//引用express-handlebars模板引擎
app.engine('.hbs',exphbs({
		defaultLayout: 'index',  //默认布局模板为mindex.hbs
		extname:'.hbs'
	})
);
app.set('view engine','.hbs');


//异常处理
let handleStatusError = (status) => {
		app.use((req,res,next) => {
		res.status(status)
		res.sendfile('views/pages/error/error.html')
	})
}
handleStatusError(404)
handleStatusError(500)


app.listen(5000,function(){
	console.log('Activity=>http://localhost:5000')
});
