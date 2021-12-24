// 字段格式化
export function valFmt(val: any, sep: any = '-') {
  if (val == null || val === '') {
    return sep;
  }
  return val;
}

// 默认加密，type为1则解密
export function handleCode(value: any, type?: number) {
  if (value == null || value === '') return;
  return type === 1
    ? decodeURIComponent(window.atob(value))
    : window.btoa(encodeURIComponent(value));
}

// 获取刷新状态
export const isRefresh = (history: any) => {
  if (!history || history.action === 'POP') {
    sessionStorage.setItem('IS_REFRESH', 'true');
  } else {
    sessionStorage.setItem('IS_REFRESH', 'false');
  }
};

// 数据结构转换（平级转树形）
export const flatToTree = (
  data: [],
  rootId: any,
  key = 'id',
  pKey = 'parentId',
  childKay: string = 'children',
) => {
  let newArr: any[] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i][pKey] === rootId) {
      let temp: any = data.splice(i, 1)[0];
      if (data && data.length > 0) {
        temp[childKay] = flatToTree(data, temp[key], key, pKey, childKay);
      }
      newArr.push(temp);
      i--;
    }
  }
  return newArr;
};
// 树形转平级
export const treeToFlat = (data: any, childKay = 'children') => {
  let newArr: any[] = [];
  data.forEach((item: any) => {
    newArr.push(item);
    if (item[childKay] && item[childKay].length > 0) {
      newArr.push(...treeToFlat(item[childKay]));
    }
    delete item[childKay];
  });
  return newArr;
};

// 对象数组字段查找
export function getIndex(arr: any, val: any, key?: any) {
  return arr.findIndex((item: any) => {
    return key ? item[key] === val : item === val;
  });
}

// 初始化序号（自动补0）
export function setNum(index: any, len: number) {
  return (Array(len).join('0') + index).slice(-len);
}

// 递归遍历
export const deepClone = (source: any) => {
  let res: any = Array.isArray(source) ? [] : {};
  for (let key in source) {
    if (typeof source[key] === 'object') {
      res[key] = deepClone(source[key]);
    } else {
      res[key] = source[key];
    }
  }
  return res;
};

// 对象属性深层合并
export const deepExtend = (target: any, ...options: any) => {
  options &&
    options.forEach((option: any) => {
      for (let key in option) {
        if (typeof option[key] === 'object') {
          if (typeof target[key] !== 'object') {
            target[key] = Array.isArray(option[key]) ? [] : {};
          }
          target[key] = deepExtend(target[key], option[key]);
        } else {
          target[key] = option[key];
        }
      }
    });
  return target;
};

// 链式取值
export const $t = (data: object, str: string) => {
  return str.split('.').reduce(function (pre: any, cur) {
    return pre[cur];
  }, data);
};
