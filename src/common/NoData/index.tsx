import React, { Component } from 'react';

// 资源
import WIcon from '../Icon';
import img from '../../assets/img/no_data.png';
import './index.less';

interface Props {
  title: string; // 显示的文本
  className?: string;
  img?: any; // 图片
  middle?: boolean; // 是否垂直居中
  loading?: boolean; // 是否加loading
}

class WNoData extends Component<Props> {
  static defaultProps = {
    title: '暂无数据',
    className: '',
    img: img,
    middle: false,
    loading: false,
  };
  render() {
    let { title, className, middle, loading } = this.props;
    return (
      <div className={`no-data-box ${className}${middle ? ' middle' : ''}`}>
        <img className="img" src={img} alt="" />
        <div className="title">
          {loading && <WIcon className="i-loading" code="&#xe8fd;" />}
          {title}
        </div>
      </div>
    );
  }
}

export default WNoData;
