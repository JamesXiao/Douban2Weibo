// ==UserScript==
// @name         Share Douban Item to Sina Weibo
// @namespace    http://xydonkey.blogbus.com/
// @include       http://movie.douban.com/subject/*
// @include       http://music.douban.com/subject/*
// @include       http://book.douban.com/subject/*
// @description  分享豆瓣条目至新浪微博
// under GPL 3.0 Lisence.
// ==/UserScript==


//Jesse's work

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
    return "这本书不错";
}

//状态，想读、在读、读过、默认值是"推荐"
function getState(){
    return "推荐";
}

//组装微博内容
function generateWeiBo(){
    return "我"+getState()+"《"+getTitle()+"》" +getRating()+ getComment();
}

//封面地址
function getCover(){
    return '';
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
