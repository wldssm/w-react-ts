// 字段格式化
export function valFmt(val: any, sep: any = '-') {
  if (val == null || val === '') {
    return sep;
  }
  return val;
}

// 对象数组字段查找(i是否区分大小写)
export function getIndex(arr: any, val: any, key?: any, i = false) {
  return arr.findIndex((item: any) => {
    if (key) {
      return i && typeof item[key] === 'string' && typeof val === 'string'
        ? item[key]?.toLowerCase() === val.toLowerCase()
        : item[key] === val;
    }
    return i && typeof item === 'string' && typeof val === 'string'
      ? item.toLowerCase() === val.toLowerCase()
      : item === val;
  });
}

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

// 判断触摸设备
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
};

// 判断是否触摸事件
export const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
  return Boolean((event as TouchEvent).touches && (event as TouchEvent).touches.length);
};

// 判断是否鼠标事件
export const isMouseEvent = (event: MouseEvent | TouchEvent): event is MouseEvent => {
  return Boolean(
    ((event as MouseEvent).clientX || (event as MouseEvent).clientX === 0) &&
      ((event as MouseEvent).clientY || (event as MouseEvent).clientY === 0),
  );
};
