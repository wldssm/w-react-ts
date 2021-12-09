import React, { Component } from 'react';

import WTableColumn from './TableColumn';
import './index.less';

interface Props {
  data: any[]; // 显示的数据
  className?: string;
  clickRow?: (...param: any) => any; // 单击行
  clickThCol?: (...param: any) => any; // 单击头部单元格
}

class WTable extends Component<Props> {
  static defaultProps = {
    data: [],
    className: '',
    clickRow: () => {},
    clickThCol: () => {},
  };

  clickThCol = (index: number, label: any, e: any) => {
    this.props.clickThCol && this.props.clickThCol(index, label, e);
  };

  clickRow = (item?: any, index?: number, e?: any) => {
    this.props.clickRow && this.props.clickRow.bind(this, item, index);
  };

  render() {
    let { data, children, className } = this.props;
    return (
      <div className={`table-container ${className}`}>
        {/* thead */}
        <div className="tb-th" onClick={this.clickRow.bind(this)}>
          {React.Children.map(children, (item: any, index) => {
            let { label, width } = item.props;
            return (
              <div
                onClick={this.clickThCol.bind(this, index, label)}
                className="col"
                style={{ width: width }}
                key={Math.random().toString(36).substr(2)}
              >
                {typeof label === 'function' ? label(index) : label}
              </div>
            );
          })}
        </div>
        {/* tbody */}
        <div className="tb-tbody">
          {data.map((item: any, index) => {
            return (
              <div
                onClick={this.clickRow.bind(this, item, index)}
                className="tb-row"
                key={Math.random().toString(36).substr(2)}
              >
                {React.Children.map(children, (child: any) => {
                  return React.cloneElement(child, {
                    data: item,
                    index: index,
                  });
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export { WTable, WTableColumn };
