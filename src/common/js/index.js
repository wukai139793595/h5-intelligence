 /**
  * 将URL中的参数转换为对象
  * @author huhl
  * @param  {String}   url [请求的URL地址]
  * @return {Object}       [将请求的参数部分转换为一个对象]
  */
 export function param2Obj(url) {
   const search = url.split('?')[1]
   if (!search) {
     return {}
   }
   return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
 }

 /**
  * Date格式化
  * @author guoye
  * @param  {String}   formatDate(date, 'yyyy-MM-dd')
  * @return {Object}       []
  */
 export function formatDate(date, fmt) {
   if (/(y+)/.test(fmt)) {
     fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
   }
   let o = {
     'M+': date.getMonth() + 1,
     'd+': date.getDate(),
     'h+': date.getHours(),
     'm+': date.getMinutes(),
     's+': date.getSeconds()
   };
   for (let k in o) {
     if (new RegExp(`(${k})`).test(fmt)) {
       let str = o[k] + '';
       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
     }
   }
   return fmt;
 }

 function padLeftZero(str) {
   return ('00' + str).substr(str.length);
 }
