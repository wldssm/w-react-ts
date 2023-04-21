import React, { Component } from 'react';

import WTableColumn from './TableColumn';
import './index.less';

interface Props {
  data: any[]; // 显示的数据
  showHeader: boolean; // 显示头部
  className?: string;
  clickRow?: (...param: any) => any; // 单击行
  clickThCol?: (...param: any) => any; // 单击头部单元格
  children?: React.ReactNode;
}

class WTable extends Component<Props> {
  static defaultProps = {
    data: [],
    showHeader: true,
    className: '',
    clickRow: () => {},
    clickThCol: () => {},
  };

  clickThCol = (index: number, label: any, e: any) => {
    this.props.clickThCol && this.props.clickThCol(index, label, e);
  };

  clickRow = (item?: any, index?: number, e?: any) => {
    this.props.clickRow && this.props.clickRow(item, index, e);
  };

  render() {
    let { data, children, className, showHeader } = this.props;
    return (
      <div className={`table-container ${className}`}>
        {/* thead */}
        {showHeader && (
          <div className="tb-th" onClick={this.clickRow.bind(this)}>
            {React.Children.map(children, (item: any, index) => {
              let { label, width, align } = item?.props || {};
              return (
                item?.props && (
                  <div
                    onClick={this.clickThCol.bind(this, index, label)}
                    className="col"
                    style={{ width, justifyContent: align }}
                    key={Math.random().toString(36).substring(2)}
                  >
                    {typeof label === 'function' ? label(index) : label}
                  </div>
                )
              );
            })}
          </div>
        )}
        {/* tbody */}
        <div className="tb-tbody">
          {data.map((item: any, index) => {
            return (
              <div
                onClick={this.clickRow.bind(this, item, index)}
                className="tb-row"
                key={Math.random().toString(36).substring(2)}
              >
                {React.Children.map(children, (child: any) => {
                  return (
                    child &&
                    React.cloneElement(child, {
                      data: item,
                      index: index,
                    })
                  );
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
