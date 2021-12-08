import React, { Component } from 'react';

// 资源
import img from '../../assets/img/no_data.png';
import styles from './index.less';

interface Props {
  title: string, // 显示的文本
  className?: string,
  img?: any // 图片
}

class WNoData extends Component<Props> {
  static defaultProps = {
    title: '暂无数据',
    className: '',
    img: img
  };
  render() {
    let { title, className } = this.props;
    return (
      <div className={`${styles["no-data-box"]} ${className}`}>
        <img className={styles["img"]} src={img} alt="" />
        <p className={styles["title"]}>{title}</p>
      </div>
    );
  }
}

export default WNoData;