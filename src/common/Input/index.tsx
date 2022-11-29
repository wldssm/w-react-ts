import React, { Component, createRef } from 'react';
import WIcon from '../Icon';

import { isEmpty } from '../../assets/js/validate';
import './index.less';

interface Props {
  type: string;
  value?: string; // 输入框的值
  name?: string;
  showPwd: boolean; // type为password是否显示明文
  showDel: boolean; // 是否显示删除按钮
  maxLength: number;
  placeholder: string;
  autoComplete: string; // 是否记住密码
  disabled: boolean;
  width: string;
  autoSize: boolean; // 宽度自适应
  className: string;
  onChange: (...param: any) => any; // 输入事件
  onEnter: (...param: any) => any; // 回车事件
  onFocus: (...param: any) => any; // 获得焦点事件
  onBlur: (...param: any) => any; // 失去焦点事件
  leftNode?: any; // 输入框左边插槽
  rightNode?: any; // 输入框右边插槽
}

class WInput extends Component<Props> {
  static defaultProps = {
    type: 'text',
    value: '',
    showPwd: false,
    showDel: false,
    className: '',
    placeholder: '请输入',
    autoComplete: 'off',
    autoSize: false,
    onChange: () => {},
    onEnter: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };
  state = {
    curValue: '',
  };
  inputRef: React.RefObject<HTMLInputElement> = createRef();
  cnFlag: boolean = false;

  componentDidMount() {
    this.setState({ curValue: this.props.value });
  }

  componentDidUpdate() {
    if (!this.cnFlag && this.props.value !== this.state.curValue) {
      this.setState({ curValue: this.props.value });
    }
  }

  // 输中文时触发
  compositionstart = () => {
    this.cnFlag = true;
  };
  compositionend = (e: any) => {
    const value = e.target?.value;
    this.setState({ curValue: value });
    this.props.onChange(value, this.props.name, e);
    this.cnFlag = false;
  };
  // 双向绑定数据
  change = (e: any) => {
    let value = e.target?.value;
    this.setState({ curValue: value });
    if (this.cnFlag) {
      value = this.props.value;
    }
    this.props.onChange(value, this.props.name, e);
  };

  // 清除输入框内容
  clearInput = (e: any) => {
    this.setState({ curValue: '' });
    this.props.onChange('', this.props.name, e);
    this.focus();
  };

  // 回车提交
  keyPress = (e: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      this.props.onEnter(this.state.curValue, this.props.name, e);
    }
  };

  // 让输入框获得焦点
  focus = () => {
    this.inputRef?.current?.focus();
  };

  // 获得焦点
  focusFunc = (e: any) => {
    this.props.onFocus(this.state.curValue, this.props.name, e);
  };

  // 失去焦点
  blur = (e: any) => {
    this.props.onBlur(this.state.curValue, this.props.name, e);
  };

  render() {
    let {
      value,
      type,
      showPwd,
      showDel,
      placeholder,
      maxLength,
      className,
      autoComplete,
      leftNode,
      rightNode,
      width,
      disabled,
      name,
      autoSize,
    } = this.props;
    let { curValue } = this.state;
    return (
      <div
        className={`i-txt-box ${className}${disabled ? ' disabled' : ''}`}
        style={{ width: width }}
      >
        {leftNode}
        {autoSize && <span className="i-txt i-txt-place">{value}</span>}
        <input
          ref={this.inputRef}
          type={type && !showPwd ? type : 'text'}
          value={curValue}
          autoComplete={autoComplete}
          className={`i-txt${autoSize ? ' i-txt-abs' : ''}`}
          name={name}
          onChange={this.change}
          onCompositionStart={this.compositionstart}
          onCompositionEnd={this.compositionend}
          onKeyPress={this.keyPress}
          onFocus={this.focusFunc}
          onBlur={this.blur}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          spellCheck={false}
        />
        {showDel && !isEmpty(curValue) && (
          <WIcon code="&#xe6e5;" className="i-del" onClick={this.clearInput} />
        )}
        {rightNode}
      </div>
    );
  }
}

export default WInput;
