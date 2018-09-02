'use strict'
//加载模块
var fs = require('fs'),
    url =require('url'),
    path = require('path'),
    http = require('http');

var root = path.resolve(process.argv[2] || '.');//获取项目目录
console.log('Static root dir: ' + root);
var server = http.createServer(function(request, response){//创健服务器
    var pathname = url.parse(request.url).pathname;//分析请求目录
    var filepath = path.join(root, pathname);//得到请求的文件目录
    fs.stat(filepath, function(err, stats){
        if(!err &&stats.isFile()){//目录存在且是文件
            console.log('200' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);//把文件信息流导入response里
        }
        else{
            console.log('404' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});
server.listen(8000);//监听端口
console.log('running')