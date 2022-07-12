import React, { Component } from 'react';

import './index.less';

interface Props {
  name?: string;
  accept?: string; // 可上传文件类型
  disabled: boolean;
  multiple: boolean;
  className: string;
  onChange: (...param: any) => any; // 输入事件
}

class WUpload extends Component<Props> {
  static defaultProps = {
    accept: 'img',
    className: '',
    multiple: false,
    onChange: () => {},
  };
  acceptObj: any = {
    // 可上传格式
    pdf: ['application/pdf'],
    mp4: ['audio/mp4', 'video/mp4'],
    img: ['image/png', 'image/gif', 'image/jpg', 'image/jpeg', 'image/bmp'],
    apk: ['application/vnd.android.package-archive'],
    docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    all: ['*.*'],
  };

  // 双向绑定数据
  change = (e: any) => {
    let curEl = e.target || e.srcElement,
      files = [].slice.call(curEl.files);
    this.props.onChange(files, this.props.name, e);
    curEl.value = '';
  };

  render() {
    let { className, disabled, name, accept, multiple, children } = this.props;
    return (
      <div className={`upload-box ${className}${disabled ? ' disabled' : ''}`}>
        <input
          type="file"
          accept={this.acceptObj[accept || 'img']}
          name={name}
          multiple={multiple}
          onChange={this.change}
          disabled={disabled}
          spellCheck={false}
          title=""
        />
        {React.Children.map(children, (child: any) => {
          return (
            child &&
            React.cloneElement(child, {
              className: child.props.className + ' upload-cont',
            })
          );
        })}
      </div>
    );
  }
}

export default WUpload;
