Vue.component('list-item', {
    props:['data'],
    template:`<div><li class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" :id="data.letter">{{data.letter.toUpperCase()}}<span class='badge badge-primary badge-pill'>{{data.count}}</span></li><div :id="'pad'+data.letter" style="display:none;"><p v-for="i in data.words" class="d-flex justify-content-between wordex"><span>{{i.query}}</span><span>{{i.translation}}</span><button class="btn btn-outline-danger" v-on:click='$emit("hide")'>delete</button></p></div></div>`,
})
var n = 97;
var a = [];
for(;n<123;n++){
    var cap =  String.fromCharCode(n);//首字母
    var sto = localStorage.getItem(cap);//提取记录
    if(sto){//如果存在
    sto = JSON.parse(sto);
    var o = {letter:cap,count:sto.length,words:sto};}
    else{
        var o = {letter:cap,count:0,words:[]};
    }
    a.push(o);
}
var notebook = new Vue({//创建vue实例
    el:"#notebook",
    data:{
        words:a
    },
    methods:{
        hide:function(e){console.log('hidding');console.log(e);}
    }
})
for(var i=97;i<123;i++){//使用jquery绑定slideToggle事件
    var s = '#' + String.fromCharCode(i);
    var fun = (function(i){//返回函数闭包
        return function(){
            var s = '#pad' + String.fromCharCode(i);
            $(s).slideToggle();
        }
    })(i);
    $(s).click(fun);
}
