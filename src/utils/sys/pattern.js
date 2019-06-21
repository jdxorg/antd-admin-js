export const idCard = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
export const hkCard = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}\((\d|[aA])\)$/;
export const aoMenCard = /^[1|5|7][0-9]{6}[0−9Aa]/;
export const taiWanCard = [/[0-9]{10}/,/[0-9]{10}\(([A-Za-z]|[0-9]{2})\)/,/[0-9]{8}/];
export const email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
//固话
export const phone = /^((\d2,3)|(\d{3}\-))?(0\d2,3|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
//手机
export const mobile = /^(13|14|15|18|17)\d{9}$/;
//固话和移动
export const mobileAndTel =  /(^(\d{3,4}-)?\d{7,8})$|^1[3|4|5|7|8][0-9]\d{8}$/;
// 验证整数或小数
export const intOrFloat = /^\d+(\.\d+)?$/;
// 验证整数 可正负数
export const integer = /^([+]?[0-9])|([-]?[0-9])+\d*$/;
// 只能是正整数
export const numOnly = /^[1-9]\d*$/;
//验证正整数
export const number = /^[1-9]\d*$/;
// 验证货币
export const currency = /^\d+(\.\d+)?$/;
//验证有效的货币 可两位有效的小数 
export const money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
// 验证QQ,从10000开始
export const qq = /^[1-9]\d{4,9}$/;
export const age = /^[1-9]\d{4,9}$/;
export const chinese = /^[\u4E00-\u9FA5]+$/;
//验证是否包含中文
export const isChinese =  /.*[\u4e00-\u9fa5]+.*$/;
// 验证英文
export const english =  /^[A-Za-z]+$/;
// 验证是否包含空格和非法字符
export const unnormal =/.+/;
export const password = /^[a-zA-Z\d\s~!@#$%^&*]+$/;
// 验证邮政编码
export const zip = /^[1-9]\d{5}$/;
export const ip = /d+.d+.d+.d+/;
//验证日期格式
export const date = /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/;
