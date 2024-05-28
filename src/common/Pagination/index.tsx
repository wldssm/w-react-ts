import React, { Component } from 'react';

import WIcon from '../Icon';
import './index.less';

interface Props {
  value: string; // 输入框的值，为了虚拟键盘，避免输入过程中就触发分页更新，值未矫正
  showTotal: boolean; // 显示总页数
  total: number;
  pageSize: number; // 每页显示条数
  curPage: number; // 当前页
  className: string;
  showNum: number; // 可见页码数，超出显示...。最小7，最大9
  onChange?: (...param: any) => any; // 切换页码、输入框回车、失去焦点触发
  onInput?: (...param: any) => any; // 输入框输入时触发
  onFocus?: (...param: any) => any; // 输入框获取焦点时触发
  onBlur?: (...param: any) => any; // 输入框失去焦点时触发
}

class WPagination extends Component<Props> {
  static defaultProps = {
    value: '',
    showTotal: true,
    total: 0,
    pageSize: 5,
    curPage: 1,
    className: '',
    showNum: 7,
  };

  state = {
    num: '', // 输入款
  };

  componentDidMount() {
    this.setState({ num: this.props.value });
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.value !== prevProps.value) {
      this.setState({ num: this.props.value });
    }
  }

  //总页数
  get pageNum() {
    let { total, pageSize } = this.props;
    return Math.ceil(total / pageSize);
  }

  // 获取页码
  getPageBtn = () => {
    let { curPage } = this.props;
    let pageArr = [],
      showNum = Math.max(this.props.showNum, 7);
    showNum = showNum % 2 === 0 ? showNum + 1 : showNum; // 确保奇数

    // 不显示...
    if (this.pageNum <= showNum) {
      for (let i = 0; i < this.pageNum; i++) {
        pageArr.push(i + 1);
      }
      return pageArr;
    }
    // 只显示一个...
    showNum = showNum - 2;
    if (curPage <= showNum) {
      // 当前页在前
      for (let i = 0; i < showNum; i++) {
        pageArr.push(i + 1);
      }
      return [...pageArr, '...', this.pageNum];
    }
    if (curPage > this.pageNum - showNum) {
      // 当前页在后
      for (let i = 0; i < showNum; i++) {
        pageArr.push(this.pageNum - showNum + i + 1);
      }
      return (pageArr = [1, '...', ...pageArr]);
    }
    // 显示两个...
    showNum = showNum - 2;
    for (let i = 0; i < showNum; i++) {
      pageArr.push(curPage - (showNum - 1) / 2 + i);
    }
    return [1, '...', ...pageArr, '...', this.pageNum];
  };

  prev = () => {
    let { curPage } = this.props;
    if (curPage === 1) return false;
    if (curPage > 1) {
      this.go(curPage - 1);
    }
  };
  next = () => {
    let { curPage } = this.props;
    if (curPage === this.pageNum) return false;
    if (curPage < this.pageNum) {
      this.go(curPage + 1);
    }
  };

  // 页码跳转
  go = (...param: any) => {
    let [page, index, pageArr] = [...param];
    if (page === '...' && pageArr) {
      page = Math.floor((pageArr[index - 1] + pageArr[index + 1]) / 2);
    }
    if (page < 1) {
      page = 1;
    } else if (page > this.pageNum) {
      page = this.pageNum;
    }
    this.props.onChange && this.props.onChange(page);
    window.scrollTo(0, 0);
    return page;
  };

  // 双向绑定数据
  change = (e?: any) => {
    const target = e.target,
      value = target.type === 'checkbox' ? target.checked : target.value,
      name = target.name;
    this.setState({ [name]: value });
    this.props.onInput && this.props.onInput(value);
  };

  // 回车提交
  keyPress = (e?: any) => {
    let curKey = e.keyCode || e.which || e.charCode;
    if (curKey === 13) {
      let num = this.state.num;
      this.go(Number(num) || 1);
    }
  };

  // 获得焦点
  inputFocus = (e: any) => {
    this.props.onFocus && this.props.onFocus(this.state.num, 'num', e);
  };

  // 失去焦点
  inputBlur = (e: any) => {
    let num = this.state.num;
    num = this.go(Number(num) || 1);
    this.props.onBlur && this.props.onBlur(num, 'num', e);
  };

  render() {
    let pageArr = this.getPageBtn(),
      { showTotal, total, curPage, className } = this.props;
    curPage = Number(curPage) || 1;
    return (
      <div className={`page-cont ${className}`}>
        {showTotal && (
          <p className="total">
            共<span>{total}</span>条
          </p>
        )}
        {this.pageNum > 0 && (
          <WIcon
            onClick={this.prev}
            code="&#xe660;"
            className={`num arrow ${curPage === 1 ? 'disabled' : ''}`}
          />
        )}
        {pageArr.map((item, index) => {
          return (
            <span
              onClick={this.go.bind(this, item, index, pageArr)}
              key={Math.random().toString(36).substring(2)}
              className={`num ${item === curPage ? 'active' : ''}`}
            >
              {item}
            </span>
          );
        })}
        {this.pageNum > 0 && (
          <WIcon
            onClick={this.next}
            code="&#xe65f;"
            className={`num arrow ${curPage === this.pageNum ? 'disabled' : ''}`}
          />
        )}
        {this.pageNum > 1 && (
          <div className="jumper">
            跳至
            <input
              type="text"
              onChange={this.change}
              value={this.state.num}
              autoComplete="off"
              name="num"
              onKeyPress={this.keyPress}
              onFocus={this.inputFocus}
              onBlur={this.inputBlur}
              spellCheck={false}
            />
            页
          </div>
        )}
      </div>
    );
  }
}

export default WPagination;
