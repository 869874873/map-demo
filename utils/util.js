/**
 * 工具类
 */
class Util {
  static formatTime(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();


    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':');
  };
  static formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  };

 
  
};
 /**
 * 用于判断空，Undefined String Array Object
 */
// function isBlank(str) {
//   if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
//     return true
//   } else if (
//     Object.prototype.toString.call(str) === '[object String]' ||
//     Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
//     return str.length == 0 ? true : false
//   } else if (Object.prototype.toString.call(str) === '[object Object]') {
//     return JSON.stringify(str) == '{}' ? true : false
//   } else {
//     return true
//   }

// }

module.exports = Util;