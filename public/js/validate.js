// 正则封装
const regList = {
  trim: /^\s+|\s+$/g,     // 首尾空格
  phone: /^1[3456789]\d{9}$/,    // 验证手机号11位
  email: /^(\w+\.?\+?\w+)+@\w+\.\w+$/i,      // 邮箱
  int: /^\d*$/,   // 整数
};

// 验证是否为空
export function isEmpty(value) {
  value = ('' + value).replace(regList.trim, "");
  if (['', "null", "undefined"].includes('' + value)) {
    return true;
  }
  return false;
}

// 验证数字指定长度
export function numVerify(value, len) {
  value = value.replace(regList.trim, "");
  if (len) {
    let reg = new RegExp('^\\d{' + len + '}$');
    return reg.test(value);
  }
  return regList.int.test(value);
}


// 验证字段
export function fieldVerify(reg, value) {
  value = ('' + value).replace(regList.trim, "");
  return regList[reg].test(value);
}