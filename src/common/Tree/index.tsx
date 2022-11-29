import React, { Component } from 'react';

import WCheckBox from '../CheckBox';
import WIcon from '../Icon';
import './index.less';

interface Props {
  data: any[];
  label: string; // 文本字段名
  subNode: string; // 子节点字段名
  uniqueKey: string; // 标志唯一的字段名
  indent: number; // 层级缩进距离
  pl: number; // 左边缩进距离
  className: string;
  initExpanded: boolean; // 默认展开
  showCheck: boolean; // 显示复选框
  showArrow: boolean; // 显示箭头
  checkKey: string; // 控制是否选中的字段名
  checkDisabled: boolean; // 禁用选中
  clickNodeExpanded: boolean; // 单击节点折叠
  clickNodeChecked: boolean; // 单击节点选中
  expandAction: string; // 触发子节点折叠的方式:click、hover
  selectable: (...param: any) => any; // 是否可选中整个节点
  onClick: (...param: any) => any; // 点击节点
  onExpand: (...param: any) => any; // 切换节点显示隐藏
  onCheck: (...param: any) => any; // 点击选中
  leftNode: (...param: any) => any; // 插在文本左边的节点
  rightNode: (...param: any) => any;
}

class WTree extends Component<Props> {
  static defaultProps = {
    data: [],
    label: 'label',
    subNode: 'children',
    uniqueKey: 'id',
    indent: 32,
    pl: 0,
    className: '',
    initExpanded: true,
    showCheck: false,
    showArrow: true,
    checkKey: 'checked',
    checkDisabled: false,
    clickNodeExpanded: false,
    clickNodeChecked: false,
    expandAction: 'click',
    selectable: () => {},
    onClick: () => {},
    onExpand: () => {},
    onCheck: () => {},
    leftNode: () => {},
    rightNode: () => {},
  };

  nodeDepth = 0; // 节点初始层级
  _timer: any = null;

  componentDidMount() {
    if (this.props.initExpanded) {
      this.toggleTree(this.props.data, this.props.initExpanded);
      this.setState({});
    }
  }

  // 整个树折叠切换
  toggleTree = (data: any, expanded: boolean) => {
    data &&
      data.forEach((item: any) => {
        item.expanded = expanded;
        this.toggleTree(item[this.props.subNode], expanded);
      });
  };

  // 单击节点触发
  clickNode = (item: any, e: any) => {
    let { clickNodeExpanded, clickNodeChecked, checkKey } = this.props;
    if (clickNodeExpanded) {
      this.toggleNode(item, e);
    } else if (clickNodeChecked) {
      let status = typeof item[checkKey] == 'undefined' ? true : !item[checkKey];
      this.checkNode(item, status, e);
    }
    this.props.onClick({
      node: item,
      event: e,
    });
  };
  // 滑动节点触发
  hoverNode = (item: any, status: boolean, e: any) => {
    e.stopPropagation();
    let { expandAction, data, uniqueKey } = this.props;
    if (expandAction === 'click' || item.expanded === status) return;

    if (this._timer) clearTimeout(this._timer);

    this.changeChild(item, status, 'expanded');
    this.changeParent(data, item[uniqueKey], status, 'expanded');
    if (status) {
      this.props.onExpand({
        expanded: item.expanded,
        node: item,
      });
      this.setState({});
    } else {
      this._timer = setTimeout(() => {
        this.props.onExpand({
          expanded: item.expanded,
          node: item,
        });
        this.setState({});
      }, 300);
    }
  };

  // 切换节点显示隐藏
  toggleNode = (item: any, e: any) => {
    e.stopPropagation();
    item.expanded = !item.expanded;
    this.setState({});
    this.props.onExpand({
      expanded: item.expanded,
      node: item,
    });
  };

  // 切换节点选中状态
  checkNode = (item: any, status: boolean, e: any) => {
    e.stopPropagation();
    let { data, uniqueKey } = this.props;

    this.changeChild(item, status);
    this.changeParent(data, item[uniqueKey], status);
    this.props.onCheck({
      checked: status,
      node: item,
    });
    this.setState({});
  };

  // 切换子节点的状态（选中、折叠）
  changeChild = (data: any, status: boolean, curKey?: string) => {
    let { subNode, checkKey } = this.props,
      changeKey = curKey || checkKey;
    data &&
      data[subNode] &&
      data[subNode].forEach((item: any) => {
        item[changeKey] = status;
        this.changeChild(item, status, curKey);
      });
  };
  // 切换父节点的状态（选中、折叠）
  changeParent = (rootData: any, initId: any, status: boolean, curKey?: string) => {
    let { subNode, checkKey, uniqueKey } = this.props,
      changeKey = curKey || checkKey;
    return (
      rootData &&
      rootData.some((item: any) => {
        if (item[uniqueKey] === initId) {
          item[changeKey] = status;
          return true;
        }
        if (item[subNode] && item[subNode].length > 0) {
          let findStatus = this.changeParent(item[subNode], initId, status, curKey);
          if (findStatus) {
            let childStatus = this.getChildStatus(item, curKey);
            item[changeKey] = childStatus;
            return findStatus;
          }
        }
        return false;
      })
    );
  };
  // 获取子节点节点状态
  getChildStatus = (data: any, curKey?: string) => {
    let { subNode, checkKey } = this.props,
      changeKey = curKey || checkKey;
    return (
      data &&
      data[subNode] &&
      data[subNode].some((item: any) => {
        let status = typeof item[changeKey] == 'undefined' ? false : item[changeKey];
        return status;
      })
    );
  };

  // 设置左边缩进距离pl
  setPl = (nodeDepth: number): object => {
    let { indent, pl } = this.props;
    return { '--var-pl': nodeDepth * indent + pl + 'px' };
  };

  // 节点渲染
  treeRender = (data: any[], nodeDepth: number) => {
    const { label, subNode, selectable, checkKey, checkDisabled, showArrow, leftNode, rightNode } =
      this.props;
    return (
      data &&
      data.map((item) => {
        return (
          <div
            className={item.expanded ? 'tree-branch tree-branch-open' : 'tree-branch'}
            key={Math.random().toString(36).substring(2)}
          >
            <div
              className={`tree-name ${selectable(item) ? 'on' : ''}`}
              data-node-dept={nodeDepth}
              style={this.setPl(nodeDepth)}
              onClick={this.clickNode.bind(this, item)}
              onMouseEnter={this.hoverNode.bind(this, item, true)}
              onMouseLeave={this.hoverNode.bind(this, item, false)}
            >
              {leftNode(item)}
              {showArrow && item[subNode] && item[subNode].length > 0 && (
                <WIcon
                  className="icon-arrow"
                  onClick={this.toggleNode.bind(this, item)}
                  code={item.expanded ? '&#xeb6d;' : '&#xe609;'}
                />
              )}
              {this.props.showCheck && (
                <WCheckBox
                  disabled={checkDisabled}
                  checked={item[checkKey]}
                  onChange={this.checkNode.bind(this, item)}
                />
              )}
              <div className="tree-txt" title={item[label]}>
                {item[label]}
              </div>
              {rightNode(item)}
            </div>
            {item.expanded && item[subNode] ? (
              <div className="sub-branch-box">{this.treeRender(item[subNode], nodeDepth + 1)}</div>
            ) : null}
          </div>
        );
      })
    );
  };

  render() {
    let { data, className } = this.props;
    return <div className={`tree-box ${className}`}>{this.treeRender(data, this.nodeDepth)}</div>;
  }
}

export default WTree;
