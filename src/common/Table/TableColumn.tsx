import React, { Component } from 'react';

import { valFmt } from '../../assets/js/utils';
import './index.less';

interface Props {
  data: any; // 显示的数据
  index: number; // 第几列
  label?: any; // 头部单元格显示内容
  prop?: string; // 字段属性名
  width?: string; // 单元格宽度
  ellipsis: boolean; // 是否超出省略
  align: string; // 列的对齐方式
  className?: string;
  fmt?: string; // 空数据时显示的占位
  render?: (...param: any) => any; // 渲染col内容
  onClick?: (...param: any) => any; // 单击单元格
}

class WTableColumn extends Component<Props> {
  static defaultProps = {
    data: {},
    ellipsis: false,
    align: '',
    prop: '',
    className: '',
    fmt: '',
  };
  click = (data: any, index: number, e: any) => {
    this.props.onClick && this.props.onClick(data, index, e);
  };
  render() {
    let { data, index, render, prop, children, width, className, fmt, ellipsis, align } =
      this.props;
    return (
      <div
        onClick={this.click.bind(this, data, index)}
        className={`col ${className}`}
        style={{ width, justifyContent: align }}
      >
        {ellipsis ? (
          <div className="col-ellipsis">
            {render ? render(data, index) : prop ? valFmt(data[prop], fmt) : children}
          </div>
        ) : render ? (
          render(data, index)
        ) : prop ? (
          valFmt(data[prop], fmt)
        ) : (
          children
        )}
      </div>
    );
  }
}

export default WTableColumn;
