//本地缓存保存、获取
function localStorageSave(name, json) {
  localStorage.setItem(name, JSON.stringify(json));
}
function localStorageGet(name) {
  return JSON.parse(localStorage.getItem(name));
}
//本地缓存保存、获取
function sessionStorageSave(name, json) {
  sessionStorage.setItem(name, JSON.stringify(json));
}
function sessionStorageGet(name) {
  return JSON.parse(sessionStorage.getItem(name));
}
//form数据转json数据
function formJson(data) {
  var o = {};
  $.each(data, function () {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
}
function formUrl(data) {
  var result;
  $.each(data, function (index) {
    // console.log(this,index);
    if (!index) {
      result = this.name + '=' + this.value;
    } else {
      result += '&' + this.name + '=' + this.value;
    }
  });
  return result;
}
function jsonUrl(data) {
  var result;
  let num = 0;
  for(let i in data){
    if(num === 0){
      result = i + '=' + data[i];
    }else{
      result += '&' +  i + '=' + data[i];
    }
    num++;
  }
  return result;
}
//url的search读取
function urlSearch() {
  var url = location.search;
  if (url.indexOf('?') != -1) {
    let str = url.substr(1);
    let strs = str.split('&');
    let result = {};
    for (let i in strs) {
      let data = strs[i].split('=');
      result[data[0]] = data[1];
    }
    return result;
  } else {
    return {};
  }
}
//约定数据转换
function agreedDataReturn(type, data, val, text) {
  val = val || 'type';
  text = text || 'name';
  var result = '';
  data.forEach(function (item) {
    if (item[val] === type) {
      result = item[text];
    }
  });
  return result;
}
//约定数据转换
function agreedStrReturn(type, data) {
  var result = '';
  data.forEach(function (item) {
    if (item.name === type) {
      result = item.type;
    }
  });
  return result;
}
//date相关
function ymd(obj) {
  var date = new Date(obj);
  var y = 1900 + date.getYear();
  var m = "0" + (date.getMonth() + 1);
  var d = "0" + date.getDate();
  return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}
function ymdhms(obj) {
  var date = new Date(obj);
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var minuts = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + minuts
    + seperator2 + date.getSeconds();
  return currentdate;
}
//
const local = {
  set: localStorageSave,
  get: localStorageGet,
}
//
const session = {
  set: sessionStorageSave,
  get: sessionStorageGet,
}
//表单处理
const form = {
  json: formJson,//表单数据转成json
  urlData: formUrl,//表单数据转成?xxx=aaa
  jsonUrl: jsonUrl,
}
// 约定数据处理
const agreed = {
  data: agreedDataReturn,//返回value
  str: agreedStrReturn,//返回string
}
// 约定数据处理
const date = {
  ymd: ymd,//返回YYYY-MM-DD
  ymdhms: ymdhms,//返回YYYY-MM-DD HH-MM-SS
}
export {
  local,
  session,
  form,
  urlSearch,
  agreed,
  date,
}