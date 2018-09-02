var fs = require('fs');
var hp = require('http');
var path = require('path');
var url = require('url');
var crypto = require('crypto');

var root = __dirname;
var server = hp.createServer(function(request, response){
    var query = url.parse(request.url).query;
    if(query && query.charAt(0) == 'q'){
        //如果有问询则请求翻译api
        try{
        var js = '';//接收json数据
        var word = query.slice(2);
        var sign = '1a69dcc1f6b35b0d'+ word +"3"+"yqqWwAqLO1UIMWUTd4Al6X7MF8hLt0bh";//数字签名 appKey+q+随机数+秘钥
        var md5 = crypto.createHash('md5');//创建哈希
        md5.update(sign);
        sign = md5.digest('hex');//对签名进行md5加密
        var apiUrl = "http://openapi.youdao.com/api?" + query + "&from=EN&to=zh_CHS&appKey=1a69dcc1f6b35b0d&salt=3&sign=" + sign;}
        catch(e){
            console.log(e);
            return;
        }
        hp.get(apiUrl,function(info){
            if(info.statusCode != 200){
                console.log(apiurl, "请求失败");
                info.resume();
                response.writeHead(404);
                return;
            }
            else{
                info.setEncoding('utf8');
                info.on('data',function(data){
                    js += data;
                });
                info.on('end',function(){
                    response.writeHead(200,{'conten-type':"application/json; charset=utf-8"});
                    response.end(js);
                })
            }
        })
    }
    else{
    var pathName = url.parse(request.url).pathname;//request的url的路径
    if(pathName == '/'){
        pathName += 'index.html'; 
    }
    var filePath = path.join(root, pathName)//合成文件路径
    fs.stat(filePath, function(err, stats){
        if(!err&&stats.isFile()){
            console.log(200, request.url);
            response.writeHead(200);
            fs.createReadStream(filePath).pipe(response);
        }
        else{
            console.log(404, request.url);
            response.writeHead(404);
            response.end("<h1>404 NOT FOUND</h1>");
        }
    });}
    
});
server.listen(8000);
console.log('server is running at 8000');