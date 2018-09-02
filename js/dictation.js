//从loclstorage 里随机抽取单词显示到#trans里
var ans;//答案
var ajax = new XMLHttpRequest();
var p = document.getElementById('trans');
var inp = document.getElementsByTagName('input')[0];
var comfirm = document.getElementById('confirm');
var start = document.getElementById('start');
var stop = document.getElementById('stop');
var count = 0;
var right = 0;
var wrong = 0;
ajax.onreadystatechange = function(){
    if(ajax.readyState == 4){
        if(ajax.status == 200){
            var data = JSON.parse(ajax.responseText);
            if(data.basic){
                var audio = document.createElement('audio');
                audio.src = data.basic['us-speech'];
                audio.autoplay = true;//播放语音
                var text = data.translation.toString() + '\n';
                for(let i of data.basic.explains){
                    text += i +'\n';
                }
                p.innerText = text;//显示中文释义
                return;
            }
        }
        p.innerText="网络有问题请检查您的网络设置";
    }
    

}
function begin(){
    inp.value = '';
    answer.innerText = '';
    do{
        var r = Math.floor(Math.random()*26 + 97);
        r = String.fromCharCode(r);
        r = localStorage.getItem(r);
    }while(!r)//直到存在
    r = JSON.parse(r);//解析成数组
    var len = r.length;
    var word = Math.floor(Math.random()*len);
    word = r[word];
    ans = word.query;
    var url = '/?q=' + ans;
    ajax.open('get', url);
    ajax.send();
}
function compare(){  
    var answer = document.getElementById('answer');
    if(inp.value){
        if(inp.value == ans){//如果拼写正确则开始下一个
            answer.innerText = "回答正确";
            setTimeout(begin,1500);
            right++;
            count++;
        }
        else{
            answer.innerText = "回答错误，答案为:\n" + ans;
            count++;
            wrong++;
            setTimeout(begin,1500);
        }
    }
    else{
        alert('输入为空！')
    }
}
inp.onkeydown = function(e){if (e.keyCode == 13) compare();}
comfirm.onclick = compare;
start.onclick = function(){inp.focus();begin();};
stop.onclick = function(){
    alert("本次测试总共 "+count +' 个单词\n答对: ' + right + '个\n答错: ' +wrong+"个");
    count = 0;
    right = 0
    wrong = 0;
}