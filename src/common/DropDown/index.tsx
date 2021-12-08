import React, { Component } from 'react';

import WIcon from '../Icon';
import styles from './index.less';

interface Props {
  options: [], // 下拉菜单选项
  name?: string,
  prop?: string,
  placeholder: string,
  expanded: boolean, // 默认是否展开
  curIndex: number,
  disabled: boolean,
  width: string,
  canInput: boolean, // 能否输入
  value?: string,  // 输入框的值
  maxLength?: number,
  className: string,
  leftNode?: any,  // 输入框左边插槽
  rightNode?: any,  // 输入框右边插槽
  onSelect: (...param: any) => any,  // 选中下拉菜单选项
  onChange: (...param: any) => any,  // 输入事件
  onEnter: (...param: any) => any,  // 回车事件
  optionRight: (...param: any) => any,  // 选项插槽
  optionLeft: (...param: any) => any,  // 选项插槽
}

class WDropDown extends Component<Props> {
  static defaultProps = {
    options: [],
    placeholder: '请选择',
    expanded: false,
    curIndex: 0,
    disabled: false,
    canInput: false,
    className: '',
    onChange: () => { },
    onEnter: () => { },
    onSelect: () => { },
    optionRight: () => { },
    optionLeft: () => { },
  };

  state = {
    ifExpanded: true,
  };

  componentDidMount() {
    let { expanded } = this.props;
    this.setState({
      ifExpanded: expanded,
    });

    document.addEventListener('click', this.hide);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.hide);
  }
  // 点击其他区域隐藏
  hide = () => {
    if (this.props.disabled) return false;
    this.setState({ ifExpanded: false });
  };

  // 双向绑定数据
  change = (e: any) => {
    const target = e.target,
      value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.onChange(this.props.name, value);
  };

  // 回车提交
  keyPress = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      this.props.onEnter(this.props.name);
    }
  };

  // 整体点击
  click = (status: boolean, e: any) => {
    e.preventDefault();
    if (this.props.disabled) return false;
    this.toggle(status, e);
  };
  // 切换显示隐藏
  toggle = (status: boolean, e: any) => {
    if (this.props.disabled) return false;
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();  // 阻止冒泡，防止触发全局事件
    this.setState({ ifExpanded: !status });
  };

  // 单击选项
  select = (item: any, index: number) => {
    this.props.onSelect(index, this.props.name, item);
  };

  render() {
    let { ifExpanded } = this.state;
    let { value, curIndex, placeholder, maxLength, className, leftNode, rightNode, options, canInput, width, prop, optionLeft, optionRight } = this.props;
    return (
      <div className={`${styles["el-dropdown"]} ${className}`} style={{ width: width }} onClick={this.click.bind(this, ifExpanded)}>
        {leftNode}
        {!canInput ?
          <div className={`${styles["i-txt"]} ${curIndex < 0 && styles["i-txt-place"]}`}>
            {curIndex >= 0 ?
              ((prop && options[curIndex]) ? options[curIndex][prop] :
                (typeof options[curIndex] === 'object' ? JSON.stringify(options[curIndex]) : options[curIndex])
              )
              : placeholder}
          </div> :
          <input type="text" value={value} autoComplete="off"
            className={`${styles["i-txt"]}`}
            onChange={this.change} onKeyPress={this.keyPress}
            maxLength={maxLength} placeholder={placeholder} />
        }
        {rightNode}
        <WIcon className="icon-arrow" onClick={this.toggle.bind(this, ifExpanded)} code="&#xeb6d;" />
        {/* options */}
        {(ifExpanded && options.length > 0) &&
          <div className={styles["s-i-box"]}>
            {
              options.map((item, index) => {
                return (
                  <div className={`${styles["dd-item"]} ${index === curIndex ? styles["active"] : ""}`} key={Math.random().toString(36).substr(2)} onClick={this.select.bind(this, item, index)}>
                    {optionLeft(item, index)}
                    {prop ? item[prop] : (typeof item === 'object' ? JSON.stringify(item) : item)}
                    {optionRight(item, index)}
                  </div>
                );
              })
            }
          </div>
        }
      </div>
    );
  }
}

export default WDropDown;