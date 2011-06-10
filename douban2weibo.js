// ==UserScript==
// @name         Share Douban Item to Sina Weibo
// @namespace    http://xydonkey.blogbus.com/
// @include       http://movie.douban.com/subject/*
// @include       http://music.douban.com/subject/*
// @include       http://book.douban.com/subject/*
// @description  分享豆瓣条目至新浪微博
// under GPL 3.0 Lisence.
// ==/UserScript==

<<<<<<< HEAD

//Jesse's work
=======
// 自造 selector
function $$(w){
	return document.querySelectorAll(w);
};
function $(select){
	var name = select.substring(1);
	switch(select.charAt(0)){
		case '#':
			return document.getElementById(name);
		case '.':
			return document.getElementsByClassName(name);
		case '/':
			return document.getElementsByTagName(name);
		default:
			return document.getElementsByName(select);
	}
};
>>>>>>> douban2weibo/master

//题目
function getTitle(){
	return $("h1 span").text();
}

//评分：力荐、推荐、还行、较差、很差、默认值是空字符串
function getRating(){
    return ($("#rateword").text())?($("#rateword").text()):"未评";
}


//James's work

//短评
function getComment(){
    return $("#rating").parentNode.lastChild.innerHTML;
}

//状态，想读、在读、读过、默认值是"推荐"
function getState(){
    return $("#rating").parentNode.firstChild.innerHTML;
}

//组装微博内容
function generateWeiBo(){
    return getState()+"《"+getTitle()+"》" +getRating()+ getComment();
}

//封面地址
function getCover(){
    return document.getElementById('mainpic').firstChild.href;
}


var _w = 72 , _h = 16;
var param = {
	url:	location.href,
	type:	'3',
	title:	generateWeiBo(), 
	pic:   	getCover(), 
	rnd:	new Date().valueOf()
}
var temp = [];
for( var p in param ){
    temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
}
var share2Weibo = document.createElement('div');
share2Weibo.innerHTML += '<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>';
var rating = document.getElementById('rating');
var htmlContent =  rating.appendChild(share2Weibo);
