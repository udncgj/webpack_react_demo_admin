//cookie操作
function getCookie(name){
	var aName = document.cookie.split(';');
	for(var i=0; i<aName.length; i++){
		while(aName[i].indexOf(' ')!=-1){
			aName[i] = aName[i].replace(' ','');
		}
		var arr = aName[i].split('=');
		if(arr[0] == name){
			return arr[1];
		}
	}
}
function setCookie(name,value){
	var date = new Date();
	var delDay = 7;//保存7天时间
	date.setTime(date.getTime()+delDay*24*3600*1000);
	document.cookie = name+"="+value+";"+"expires="+date.toGMTString();
}
function delCookie(name){
	var date = new Date();
	date.setTime(date.getTime()-10000);
	document.cookie = name+"="+";"+"expires="+date.toGMTString();
}
const cookie = {
    get:getCookie,
    set:setCookie,
    del:delCookie
};
export default cookie;