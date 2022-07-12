import React, { Component, createRef } from 'react';

import WIcon from '../Icon';
import WDrag from '../Drag';
import './index.less';

interface Props {
  show: boolean;
  value?: string;
  name: string;
  type: string; // 键盘类型（number数字键盘、text全键盘）
  inputDom: HTMLInputElement; // 获取焦点的input
  autoPosi: boolean; // true则位置随输入框变动
  className: string;
  onChange: (...param: any) => any; // 单击按键输入时触发
  onEnter: (...param: any) => any; // 单击回车时触发
  onClose: (...param: any) => any; // 单击关闭时触发
}

class VirtualKeyboard extends Component<Props> {
  static defaultProps = {
    show: false,
    value: '',
    name: '',
    type: 'text',
    // inputDom: HTMLInputElement,
    autoPosi: true,
    className: '',
    onChange: () => {},
    onEnter: () => {},
    onClose: () => {},
  };
  dragRef: React.RefObject<HTMLDivElement> = createRef();
  dragBoxRef: React.RefObject<HTMLDivElement> = createRef();
  inputDom: HTMLInputElement | null = null;
  keyboardEvent = null;
  state = {
    isCaps: false,
    isCtrl: false,
    curType: '', // 键盘类型
    downKey: '', // 当前按下的key
  };
  copyTxt = ''; // 复制的文本

  componentDidMount() {
    this.setState({ curType: this.props.type });

    if (this.dragBoxRef.current && this.dragRef.current) {
      new WDrag(this.dragBoxRef.current, this.dragRef.current);
    }
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.type !== prevProps.type) {
      this.setState({ curType: this.props.type });
    }
    if (this.props.inputDom !== prevProps.inputDom) {
      this.inputDom = this.props.inputDom;
    }
    if (this.props.show !== prevProps.show) {
      // 神奇，不包在this.props.show !== prevProps.show判断里，会溢出。
      if (this.props.show) {
        if (this.props.type !== this.state.curType) {
          this.setState({ curType: this.props.type, downKey: '' });
        } else {
          this.setState({ downKey: '' });
        }
        this.updatePosi();
      }
    }
  }
  componentWillUnmount() {
    this.setState = () => {
      return;
    };
  }

  // 更新位置
  updatePosi = () => {
    let { inputDom, autoPosi } = this.props;
    if (!autoPosi) return;
    if (this.dragBoxRef.current && inputDom) {
      let inputPosi = inputDom.getBoundingClientRect(),
        keyPosi = this.dragBoxRef.current.getBoundingClientRect(),
        clientH = document.body.clientHeight || document.documentElement.clientHeight || 0, // 可见区域高
        clientW = document.body.clientWidth || document.documentElement.clientWidth || 0, // 可见区域宽
        showTop = inputPosi.y + inputPosi.height + 10,
        showLeft = inputPosi.x;
      if (this.props.type === 'number') {
        keyPosi.width = 362;
      }
      if (showTop + keyPosi.height > clientH) {
        showTop = clientH - keyPosi.height;
      }
      if (showLeft + keyPosi.width > clientW) {
        showLeft = clientW - keyPosi.width;
      }
      this.dragBoxRef.current.style.left = showLeft + 'px';
      this.dragBoxRef.current.style.top = showTop + 'px';
    }
  };

  // 单击背景
  clickWhole = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
  };

  // 关闭
  close = (e: any) => {
    this.props.onClose(e);
  };

  // 创建回车事件
  createEvent = (type: string) => {
    // this.inputDom?.focus();
    if (type === 'enter') {
      let { value, name } = this.props,
        keyboardEvent = new KeyboardEvent('keypress', {
          bubbles: true,
          cancelable: true,
          composed: true,
          which: 13,
          keyCode: 13,
          key: 'Enter',
          code: 'Enter',
        });
      this.inputDom?.dispatchEvent(keyboardEvent);
      this.inputDom?.blur();
      this.props.onEnter(value, name);
      return;
    }
  };

  // 单击按键
  keydown = (e: any, key: string | number, type?: string) => {
    e?.preventDefault();
    e?.stopPropagation();
    let { value } = this.props,
      newValue: string[] | string = ('' + value).split(''),
      initStart = this.inputDom?.selectionStart || 0,
      initEnd = this.inputDom?.selectionEnd || 0,
      maxLength = this.inputDom?.maxLength, // 没设值是-1
      { isCaps, isCtrl } = this.state;
    // console.log(1, initStart, initEnd, key, e);
    this.setState({ downKey: key });
    // 回车
    if (key === 'Enter') {
      this.createEvent('enter');
      this.updateInput(newValue, initStart, initEnd);
      return;
    }

    // 按住特殊键
    if (key === 'Ctrl') {
      this.setState({ isCtrl: !isCtrl });
      this.updateInput(newValue, initStart, initEnd);
      return;
    }

    // 切换大小写
    if (key === 'Caps') {
      this.setState({ isCaps: !isCaps });
      return;
    }

    // 切换键盘
    if (key === '123') {
      this.setState({ curType: 'number' });
      return;
    }
    if (key === 'abc') {
      this.setState({ curType: 'text' });
      return;
    }

    // 删除
    if (key === 'del') {
      let delLen = 1;
      if (initEnd === initStart && initStart > 0) {
        initStart -= 1;
      } else {
        delLen = initEnd - initStart;
      }
      newValue.splice(initStart, delLen);
      this.updateInput(newValue, initStart);
      return;
    }
    // 复制
    if (key === 'c' && isCtrl) {
      if (initEnd !== initStart) {
        this.copyTxt = newValue.slice(initStart, initEnd).join('');
        initStart = initEnd;
      }
      this.updateInput(newValue, initStart);
      return;
    }

    let curLen = newValue?.length || 0;
    // 粘贴
    if (key === 'v' && isCtrl) {
      let remainLen = this.copyTxt?.length || 0;
      if (maxLength && maxLength > 0) {
        remainLen = maxLength - (curLen - (initEnd - initStart));
      }
      newValue.splice(initStart, initEnd - initStart, this.copyTxt.substring(0, remainLen));
      initStart = initEnd + remainLen;
      this.updateInput(newValue, initStart);
      return;
    }

    // 输入
    if (maxLength && curLen === maxLength) {
      return;
    }
    if (isCaps && /^[a-zA-Z]$/.test('' + key)) {
      key = ('' + key).toUpperCase();
    } else if (key === 'Space') {
      key = ' ';
    }
    newValue.splice(initStart, initEnd - initStart, '' + key);
    initStart += 1;

    this.updateInput(newValue, initStart);
  };

  mouseUp = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    this.setState({ downKey: '' });
  };

  // 更新输入框焦点、值
  updateInput(valueArr: string[], start: number, end?: number) {
    let { name } = this.props,
      newValue = valueArr.join('');
    setTimeout(() => {
      if (this.inputDom) {
        this.inputDom.focus();
        this.inputDom.selectionStart = start;
        this.inputDom.selectionEnd = end || start;
      }
    }, 0);

    this.props.onChange(newValue, name, this.inputDom, start); // 把start传回去，因为调用时获取值还没有setState，取到的selectionStart不是最新的。
  }

  // 根据key获取全键的class
  getKeyClass = (key: string | number) => {
    let className = '',
      { isCaps, isCtrl, downKey } = this.state;
    switch (key) {
      case 'del':
        className = 'key key-del';
        break;
      case 'Caps':
        className = 'key key-caps';
        if (isCaps) className += ' active';
        break;
      case 'Enter':
        className = 'key key-enter';
        break;
      case 'abc':
      case '123':
        className = 'key key-switch';
        break;
      case 'Ctrl':
        className = 'key key-ctrl';
        if (isCtrl) className += ' active';
        break;
      case 'Space':
        className = 'key key-space';
        break;
      default:
        className = 'key';
        break;
    }
    if (downKey === key) {
      className += ' active';
    }
    return className;
  };
  // 根据key获取全检的显示
  getKeyShow = (key: string | number) => {
    if (key === 'del') {
      return <WIcon code="&#xe617;" />;
    }
    if (key === 'Enter') {
      return <span>回车</span>;
    }
    if (key === 'Space') {
      return <span></span>;
    }
    if (this.state.isCaps && /^[a-zA-Z]$/.test('' + key)) {
      return <span>{('' + key).toUpperCase()}</span>;
    }
    return <span>{key}</span>;
  };
  // 渲染按键
  keyRender = (type: string) => {
    let fullKeys = [
        'q',
        'w',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p',
        'del',
        'Caps',
        'a',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'Enter',
        'Ctrl',
        'z',
        'x',
        'c',
        'v',
        'b',
        'n',
        'm',
        '.',
        ':',
        '/',
        '\\',
        '123',
        'Space',
        '_',
        '—',
      ],
      numKeys = [1, 2, 3, 'del', 4, 5, 6, '-', 7, 8, 9, 'Enter', 'abc', 0, '.'],
      curKeys = numKeys;
    if (type === 'full') {
      curKeys = fullKeys;
    }
    return (
      <div className={`${type}-box`}>
        {curKeys.map((item, index) => {
          return (
            <div
              className={this.getKeyClass(item)}
              key={index}
              onMouseDown={(e) => this.keydown(e, item, type)}
              onMouseUp={this.mouseUp}
            >
              {this.getKeyShow(item)}
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    let { className, show } = this.props,
      { curType } = this.state;
    return (
      <div
        className={`virtualkeyboard${!show ? ' hide' : ''} ${className}`}
        ref={this.dragBoxRef}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={this.clickWhole}
      >
        <div className="k-head" ref={this.dragRef}>
          <WIcon code="&#xe706;" className="i-keyboard" />
          <span className="h-title">虚拟键盘</span>
          <WIcon code="&#xe600;" className="i-close" onClick={this.close} />
        </div>
        {curType === 'number' && this.keyRender('num')}
        {curType !== 'number' && this.keyRender('full')}
      </div>
    );
  }
}

export default VirtualKeyboard;
