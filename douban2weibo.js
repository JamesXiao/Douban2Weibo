// ==UserScript==
// @name         Share Douban Item to Sina Weibo
// @namespace    https://github.com/JamesXiao/Douban2Weibo
// @include       http://movie.douban.com/subject/*
// @include       http://music.douban.com/subject/*
// @include       http://book.douban.com/subject/*
// @description  分享豆瓣条目至新浪微博
// @author 	xydonkey, +C
// under GPL 3.0 Lisence.
// ==/UserScript==

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

//题目
function getTitle(){
	return $("/h1")[0].firstElementChild.innerHTML;
}

//评分：力荐、推荐、还行、较差、很差、默认值是空字符串
function getRating(){
    var ratingTable ={'5':'，力荐。','4':'，推荐。','3':'，还行。','2':'，较差。','1':'，很差。','':''};
    if ($("#n_rating")){
        var rate=$("#n_rating").value;
        return rateword=ratingTable[rate];
    } else
        return '';
}

//短评
function getComment(){
    if($("#interest_sect_level").firstChild.tagName=='DIV')
        return '\"' + $("#interest_sect_level").firstChild.lastChild.textContent + '\"';
    else
        return '';
}

//状态，想读、在读、读过
function getState(){
    if ($("#interest_sect_level").firstChild.tagName=="DIV")
        return $("#interest_sect_level").firstChild.firstChild.innerHTML;
    else
        return "";
}

//组装微博内容
function generateWeiBo(){
    return getState()+"《"+getTitle()+"》" +getRating()+ getComment();
}

//封面地址
function getCover(){
    return document.getElementById('mainpic').firstChild.href;
}

//新浪的链接
function getLink(){
    return "http://service.weibo.com/share/share.php?"+ temp.join('&');
}
var param = {
	url:	location.href,
	type:	'3',
	title:	generateWeiBo(),
	pic:   	getCover(),
	appkey: '3273825921',
	rnd:	new Date().valueOf()
}
var temp = [];
for( var p in param ){
    temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
}
var share2Weibo = document.createElement('div');
share2Weibo.innerHTML ='<a target="_blank" href="'+getLink()+'"> <img src="http://www.sinaimg.cn/blog/developer/wiki/16x16.png" alt="分享至新浪微博" title="分享至新浪微博" rel="v:image"></a>';

// Google Buzz 的链接
function getBuzzLink(){
    return "https://www.google.com/buzz/post?"+ temp.join('&');
}
param = {
	url:		location.href,
	message:	generateWeiBo(),
	imageurl:   	getCover(),
}
temp = [];
for( var p in param ){
    temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
}
share2Weibo.innerHTML +='&nbsp;<a target="_blank" href="'+getBuzzLink()+'"> <img src="http://code.google.com/apis/buzz/images/google-buzz-16x16.png" alt="分享至 Google Buzz" title="分享至 Google Buzz" rel="v:image"></a>';

if ($('#rating')){
    var add = $('#rating')
} else
    var add = $('#interest_sect_level');
var htmlContent =  add.appendChild(share2Weibo);
