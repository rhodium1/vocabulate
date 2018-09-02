# 查单词小应用
## 使用的工具

1. bootstrap(由于只是拿来练习js和vue的，所有懒得写样式了)
2. jQuery
3. vue
## 需要配合myserver.js的node服务器来使用
在myserver.js中调用了有道词典api, 当收到查单词请求后,服务器会调用api返回json格式的单词信息。

##index.html
查单词的首页，输入单词，点击search或者按下回车，就会发送ajax请求，服务器接收后返回单词信息，然后将信息渲染到视图中。查询过的单词会自动储存到LocalStorage里，最为单词本页面的数据

## dict.html
单词本，从LocalStorage里获取查询过的单词，按首字母分类，分别渲染到列表中，点击delete，删除该单词

##excise.html
听写练习，随机从LocalStorage获取一个单词，想服务器请求其音频，服务器返回一个url，自动创建audio元素并播放，在输入框中输入正确的单词拼写，如果输入错则在下方显示正确的单词拼写，输入正确直接开始下一个，点击停止终止练习，返回练习报告（正确率）