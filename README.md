# H5活动

😀😁😂😄😅😆😇😉😊🙂🙃☺️😋😌😍😘😙😜😝🤑🤓😎🤗😏😶😑😒🙄🤔☹️😕😔😡😠😟😞😳👀
⚽️🏀🏈⚾️🎾🏐🏉🎱⛳️🏌🏓🏸🏒🏑🏏🎿⛷🏂⛸🏹🚴🏋⛹🛀🏄🏊🚣🎣🏇🕴🏆🎽🏅🎖🎯🎮🎳🇦
🇦🇫🇦🇱🇩🇿🇦🇸🇦🇩🇦🇴🇦🇮🇦🇶🇧🇸🇦🇿🇦🇹🇦🇺🇦🇼🇦🇲🇦🇷🇦🇬🇧🇭🇧🇩🇧🇧🇧


😀😁😂😄😅😆😇😉😊🙂🙃☺️😋😌😍😘😙😜😝🤑🤓😎🤗😏😶😑😒🙄🤔☹️😕😔😡😠😟😞😳👀
🇾🇧🇪🇧🇿🇧🇯🇧🇲🇧🇬🇧🇳🇻🇬🇧🇷🇧🇼🇧🇦🇧🇴🇧🇹🇧🇫🇧🇮🇨🇻🇰🇭🇨🇲🇨🇦

⚽️🏀🏈⚾️🎾🏐🏉🎱⛳️🏌🏓🏸🏒🏑🏏🎿⛷🏂⛸🏹🚴🏋⛹🛀🏄🏊🚣🎣🏇🕴🏆🎽🏅🎖🎯🎮🎳



### 项目结构


    ├── README.md  // 项目文档
    ├── document.md  // 接口文档规范模板
    ├── config  // 环境接口配置
    │   ├── config_1and1.js
    │   └── test.js  // 测试模块
    ├── controle  // 控制器文件
    │   ├── 1and1  // 1+1活动模块的控制器文件
    │   │   └── index.js
    │   └── test  
    │   │   └── test.js  // 测试模块的控制器文件
    ├── public  // 资源
    │   ├── css  // 样式表[其中css_module文件是sass_module文件编译生成的，结构是对应一致的]
    │   │   ├── base  // 公共
    │   │   ├── css_module
    │   │   └── sass_module  // 下级目录是对应项目文件的样式表
    │   └── js  // 前端js
    │   │   ├── base  // 公共
    │   │   ├── sea_module  // 下级目录是对应项目文件的js
    │   │   ├── test
    │   │   └── util  // 封装了ajax以及cookie操作等
    ├── util
    │   └── http.js  // 封装了http请求
    ├── views  // 视图层
    │   ├── layouts
    │   │   ├── index_1and1.hbs  // 主模板
    │   │   └── test
    │   ├── pages  // 项目对应的页面文件
    │   │   ├── 1and1  // 1+1活动模块的页面
    │   │   ├── error  // 异常页面
    │   │   └── test  // 测试
    │   └── partials  // 组件
    │   │   └── common_1and1  // 1+1活动模块的组件
    │   │   │   ├── footer.hbs  // footer组件
    │   │   │   ├── header.hbs  // header组件
    │   │   │   └── nav.hbs  // 导航组件
    ├── app.js  // 基本应用配置
    ├── gulpfile.js  // 工程化配置
    ├── routes.js  // 路由文件
    └── package.json  // 项目配置目录

##### 运行

    npm install  // 安装项目依赖

    npm run dev  // 执行启动脚本

    gulp sass:watch  // 监听sass文件编译，开启后任意修改scss并保存文件将执行编译
##### 项目运用到的主要技术

```
1.nodejs 服务器用的是Express框架搭建的，目录是根据项目实际情况自己生成的[只用到了核心中间键]

2.handlebars 模板引擎[便于业务处理]

3.gulp 前端构建工具[压缩、编译、处理静态资源]

4.sass 前端样式是sass编写的[使用sass主要是为了做模块化样式处理，便于维护]
```



#####  [项目部署相关](http://www.jianshu.com/p/ee935729f49c)



##### [模板引擎语法 ==> Handlebars](http://www.ghostchina.com/introducing-the-handlebars-js-templating-engine/)



#####  [Sass语法](http://www.sasschina.com/guide/)



##### [npm生态](https://www.npmjs.com/)



##### 特别说明async模块的使用 [点击查看](https://github.com/tonyjiafan/reptile--/blob/master/urls/news.js)

```
'use strict'
const request = require('request'),
      async = require('async'),
      cheerio = require('cheerio');
exports.url = function(app){
  app.get('/news',function(req,res){
    async.waterfall([
   	function(callback){
      let basicUrl = 'http://voice.hupu.com/nba'; //虎扑新闻页面
          request(basicUrl,function (error, response, body){
            if (!error && response.statusCode == 200) {
              let $ = cheerio.load(body),resData = {success:true,datas:[]};
              $('.news-list ul').children().each(function(index,element){
                let news = {};
                  news.title = $(element).find('.list-hd h4>a').text(); //标题
                  news.des = $(element).find('.list-content .J_share_title').text(); //简单内容
                  news.createTime = $(element).find('.otherInfo .other-left > a').text(); //创建时间
                  news.comeFrom = $(element).find('.otherInfo .other-left > .comeFrom a').text(); //消息来源
                  resData.datas.push(news)
              })
              let listData = resData;
              callback(null,listData)   // 参数缺一不可
            } else { //请求失败
              resData.success = false;
              res.send(resData)
            }
          })
    },function(listData,callback){
      console.log(listData.datas[0])
        res.render('pages/news',{
          title:'虎扑篮球新闻',
          layout:'layouts/layout',
          listData:listData.datas
        })
    }],function(err,result){
  			return result
  	})

  })
}
```



##### 结语

```
    整个项目的基本配置如上所述，后期在项目实际开发过程中会遇到很多拓展模块和组件以及一些依赖模块的注入，具体根据项目需求而定了解第3方依赖模块请点击 npm生态 查看。
```
