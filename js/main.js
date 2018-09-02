window.onload = function(){
    var bt = document.getElementsByTagName('button')[0];
    var inp = document.getElementsByTagName('input')[0];
    var submit = function(){
        var sc = document.createElement('script');
        sc.id = 'show';
        var sign = '1a69dcc1f6b35b0d'+ inp.value+"3"+"yqqWwAqLO1UIMWUTd4Al6X7MF8hLt0bh";
        var url = 'http://localhost:8000/'+'?q='+inp.value+"&from=EN&to=zh_CHS&appKey=1a69dcc1f6b35b0d&salt=3&sign="+sign;
        sc.src = url;
        document.body.appendChild(sc);
    }
    var reset = function(){
        setTimeout(function(){var sc = document.getElementById('show');document.body.removeChild(sc);},5000);
    }
    bt.onclick = submit;
    inp.onkeydown = function(e){ if(e.keyCode == 13) submit();};
    bt.onmouseup = reset;
    inp.onkeyup = function(e){if(e.keyCode==13)reset();}
}
function show(data){
    
    var audio = document.getElementsByTagName('audio')[0];
    var result = document.getElementById('result');
    var soundmark = document.getElementById('soundmark');
    var trans = document.getElementById('translation');
    var exam = document.getElementById('example');
    var examText = '';
    if(data.errorCode==0){//如果查询成功
    if(audio){result.removeChild(audio);}
    audio = document.createElement('audio');
    audio.src = data.basic['us-speech'];
    console.log(data);
    var control = document.querySelector('#result i.fa');
    control.onclick = function(){
        audio.play();
    }
    transText = "翻译: " + data.translation.toString()+'\n';
    for(let i of data.basic.explains){
        transText += (i +'\n');
    }
    trans.innerText = transText;//翻译
    soundmark.innerText = data.basic['us-phonetic'];
    for(let i of data.web){
        examText += (i.key +'\n');
        examText += (i.value.toString() + '\n')
    }
    exam.innerText = examText;}
    else{
        trans.innerText = "未找到此单词";
    }
}