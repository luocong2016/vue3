// https://github.com/yiminghe/async-validator

// 大陆身份证
export const IDCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;

// 汉字
export const chineseChart = /^[\u4e00-\u9fa5]{0,}$/;

// 手机号
export const phone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

// 固话
export const tel = /^\d{3}-\d{8}|\d{4}-\d{7}$/;

// 邮箱
export const email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

// 邮政
export const zipCode = /^[1-9]\d{5}(?!\d)$/;

// IOS
export const IOS = /ios|iphone|ipad|ipod/;