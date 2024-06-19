import React, { Component } from 'react';

import WImgZoomin from '../ImgZoomin';
import WIcon from '../Icon';
import { getIndex } from '../../assets/js/utils';
import './index.less';

interface Props {
  src: string;
  show: boolean;
  list?: any;
  showPix: boolean; // 图片像素化
  className: string;
  onClose: (...param: any) => any;
}
class WViewImg extends Component<Props> {
  static defaultProps = {
    src: '',
    show: false,
    list: [],
    showPix: true,
    className: '',
    onClose: () => {},
  };
  state = {
    imgPath: '',
    scale: '',
    curIndex: 0,
    total: 0,
    curKey: Math.random().toString(36).substring(2),
  };
  componentDidUpdate(preProps: any) {
    let { src, show, list } = this.props,
      { imgPath } = this.state;
    if (show && (preProps.src !== src || preProps.list !== list || imgPath === '')) {
      this.init();
    }
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return (
      this.props.show !== nextProps.show ||
      this.props.src !== nextProps.src ||
      this.props.list !== nextProps.list ||
      this.state.curKey !== nextState.curKey ||
      this.state.scale !== nextState.scale ||
      this.state.curIndex !== nextState.curIndex ||
      this.state.imgPath !== nextState.imgPath
    );
  }

  init = () => {
    let { list, src } = this.props,
      len = list?.length || 0,
      curIndex = 0;
    if (len > 1) {
      curIndex = getIndex(list, src);
      curIndex = curIndex < 0 ? 0 : curIndex;
    }
    this.setState({ imgPath: src, curIndex, total: len }, () => {
      this.loadImg();
    });
  };

  // 图片初始占半屏
  loadImg = (imgPath?: any) => {
    imgPath = imgPath || this.state.imgPath;
    let img = new Image(),
      winW = window.innerWidth,
      winH = window.innerHeight,
      maxBoxW = winW * 0.9,
      maxBoxH = winH * 0.9,
      maxBoxRatio = maxBoxW / maxBoxH,
      minBoxW = winW / 2,
      minBoxH = winH / 2,
      minBoxRatio = minBoxW / minBoxH;
    img.onload = (e: any) => {
      let imgW = e.target.width,
        imgH = e.target.height,
        scale: string | number = '',
        imgRatio = imgW / imgH;
      if (imgW < minBoxW && imgH < minBoxH) {
        if (minBoxRatio > imgRatio) {
          scale = minBoxH / imgH;
        } else {
          scale = minBoxW / imgW;
        }
        scale = scale * 100;
      } else if (imgW > maxBoxW || imgH > maxBoxH) {
        if (maxBoxRatio > imgRatio) {
          scale = maxBoxH / imgH;
        } else {
          scale = maxBoxW / imgW;
        }
        scale = scale * 100;
      }
      if (scale !== this.state.scale) {
        this.setState({
          scale,
          curKey: Math.random().toString(36).substring(2),
        });
      }
    };
    img.src = imgPath;
  };

  // 切换图片
  switchImg = (type: any) => {
    let { list } = this.props,
      { curIndex } = this.state;
    curIndex = type === 'prev' ? curIndex - 1 : curIndex + 1;
    this.setState({ curIndex, imgPath: list[curIndex] }, () => {
      this.loadImg();
    });
  };

  close = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    this.setState({ imgPath: '' }, () => {
      this.props.onClose(e);
    });
  };
  render() {
    const { show, className, showPix } = this.props,
      { scale, curKey, curIndex, total, imgPath } = this.state;
    return (
      show && (
        <div className={`pop-model ${className}`}>
          <div className="view-img">
            {/* 图片切换 */}
            {
              <div className="l-img-switch">
                {curIndex > 0 && (
                  <div className="s-prev" onClick={() => this.switchImg('prev')}>
                    <WIcon code="&#xe660;" />
                  </div>
                )}
                {curIndex < total - 1 && (
                  <div className="s-next" onClick={() => this.switchImg('next')}>
                    <WIcon code="&#xe65f;" />
                  </div>
                )}
              </div>
            }
            <WImgZoomin
              src={imgPath}
              scale={scale}
              maxScale="1000"
              showPix={showPix}
              key={curKey}
              onClick={this.close}
            />
            {/* 页码 */}
            {total > 1 && (
              <p className="page-cont">
                {curIndex + 1}
                <span>/</span>
                {total}
              </p>
            )}
          </div>
          <div className="pop-mask"></div>
        </div>
      )
    );
  }
}

export default WViewImg;
