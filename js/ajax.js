window.onload = function () {
    var bt = document.getElementsByTagName('button')[0];//查询按钮
    var inp = document.getElementsByTagName('input')[0];//输入框
    var soundmark = document.getElementById('soundmark');//音标
    var trans = document.getElementById('translation');//中文翻译
    var exam = document.getElementById('example');//例子
    var play = document.getElementById('play');//鼠标经过播放音频
    var ajax = new XMLHttpRequest();//ajax对象
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {//数据接收完成
            if (ajax.status == 200 || ajax.status == 0) {
                var data = JSON.parse(ajax.responseText);
                if (data.basic) {
                    soundmark.innerText = data.basic['us-phonetic'];
                    trans.innerText = data.translation.toString();
                    var examText = '';
                    for (let i of data.basic.explains) {
                        examText += i.toString() + '\n';//详细解释
                    }
                    exam.innerText = examText;
                    var audio = document.getElementsByTagName('audio')[0];//语音
                    if (audio) {
                        document.body.removeChild(audio);
                    }
                    audio = document.createElement('audio');
                    audio.src = data.basic["us-speech"];//设置语音链接
                    document.body.appendChild(audio);
                    //把查询过的单词和意思保存到localstorage里
                    var query = data.query;
                    query = query.toLowerCase();//转化成小写
                    var arr = localStorage.getItem(query.charAt(0));
                    if(arr){//如果有往数组里添加
                        if(arr.indexOf(query) == -1){//之前没有查询过该单词
                        arr = JSON.parse(arr);//一个对象数组
                        var o = {query:query,translation:data.translation.toString()};
                        arr.push(o);
                        localStorage.setItem(query.charAt(0),JSON.stringify(arr));}
                    }
                    else{//之前没有查询过该字母开头的单词
                        arr = [];
                        var o = {};
                        o["query"] = query;
                        o['translation'] = data.translation.toString();
                        arr.push(o);
                        localStorage.setItem(query.charAt(0),JSON.stringify(arr));
                    }
                }
                else {
                    trans.innerText = "未找到此单词";
                }
            }
            else {
                trans.innerText = "网络错误";
            }
        }
    }
    var submit = function () {//查询函数
        if (inp.value) {
            var text = inp.value;
            var url = "/?q=" + text;
            ajax.open('get', url);//打开连接
            ajax.send();//发送请求
            inp.value = "";
        }
        else
            alert('不能为空');
    }
    bt.onclick = submit;
    inp.onkeydown = function (e) { if (e.keyCode == 13) submit(); };
    play.onmouseover = function () { var audio = document.getElementsByTagName('audio')[0]; audio.play(); }//鼠标经过音标时发音；
}