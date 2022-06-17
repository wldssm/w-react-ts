import React, { Component, createRef } from 'react';

import './index.less';

interface Props {
  src: string; // 图片src来源
  scale: string | number; // 当前比例%
  minScale: string | number; // 最小比例%
  maxScale: string | number;
  center: boolean; // 切换src后是否保持居中
  className: string;
  onZoomin: (...param: any) => any; // 放大缩小
  onClick: (...param: any) => any; // 单击。为了图片预览单击关闭
  onImgLoaded: (...param: any) => any; // 图片加载成功
  onImgError: (...param: any) => any; // 图片加载失败
}

interface size {
  w: number;
  h: number;
}

// 注：调用时给组件添加key。
class WImgZoomin extends Component<Props> {
  static defaultProps = {
    src: '', // 图片src来源
    scale: '', // 当前比例%
    minScale: 2, // 最小比例%
    maxScale: 400,
    center: true,
    className: '',
    onZoomin: () => {}, // 放大缩小
    onClick: () => {},
    onImgLoaded: () => {},
    onImgError: () => {},
  };

  state = {
    isLoading: true, // 图片是否加载中
    curImgW: 0, // 图片当前显示宽
    curImgH: 0,
    curLeft: 0, // 图片左边偏移量
    curTop: 0,
  };
  imgBoxRef: React.RefObject<HTMLDivElement> = createRef();
  imgSize: size = { w: 0, h: 0 }; // 图片原始宽、高
  boxSize: size = { w: 0, h: 0 }; // 容器宽、高
  startX = 0; // 鼠标相对页面的位置（鼠标按下）
  startY = 0;
  pageX = 0; // 鼠标相对页面的位置（鼠标移动）
  pageY = 0;
  startDist = 0; // 初始两指距离
  isDrag = false; // 拖动中
  clickTimer = 0;
  startTime = 0;
  endTime = 0;

  // 当前图片缩放比例
  get imgScale(): number {
    let curImgW = Number(this.state.curImgW) || 0;
    if (!this.imgSize.w || !curImgW) return 0;
    return parseInt((curImgW / this.imgSize.w) * 100 + '');
  }
  // 父组件传入的缩放比例
  get initScale(): number {
    let { scale, minScale, maxScale } = this.props,
      minS = Number(minScale),
      maxS = Number(maxScale),
      scaleNum = Number(('' + scale).split('%')[0]);
    scaleNum = scaleNum < minS ? minS : scaleNum;
    scaleNum = scaleNum > maxS ? maxS : scaleNum;
    return scaleNum || 100;
  }

  componentDidMount() {
    setTimeout(() => {
      this.loadImg();
    }, 0);
    // this.imgBoxRef?.current?.addEventListener('pointerdown', this.mouseDown, { passive: false });
    this.imgBoxRef?.current?.addEventListener('wheel', this.wheelImg, { passive: false });

    this.imgBoxRef?.current?.addEventListener('touchstart', this.mouseDown, { passive: false });
    this.imgBoxRef?.current?.addEventListener('touchmove', this.mouseMove, { passive: false });
    this.imgBoxRef?.current?.addEventListener('touchend', this.mouseUp, { passive: false });

    this.imgBoxRef?.current?.addEventListener('mouseenter', this.mouseEnter, { passive: false });
    this.imgBoxRef?.current?.addEventListener('mouseleave', this.stopMove, { passive: false });

    this.imgBoxRef?.current?.addEventListener('mousedown', this.mouseDown, { passive: false });
    this.imgBoxRef?.current?.addEventListener('mousemove', this.mouseMove, { passive: false });
    this.imgBoxRef?.current?.addEventListener('mouseup', this.mouseUp, { passive: false });
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.src !== prevProps.src) {
      this.loadImg(false);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.clickTimer);
    this.imgBoxRef?.current?.removeEventListener('wheel', this.wheelImg);

    this.imgBoxRef?.current?.removeEventListener('touchstart', this.mouseDown);
    this.imgBoxRef?.current?.removeEventListener('touchmove', this.mouseMove);
    this.imgBoxRef?.current?.removeEventListener('touchend', this.mouseUp);

    this.imgBoxRef?.current?.removeEventListener('mouseenter', this.mouseEnter);
    this.imgBoxRef?.current?.removeEventListener('mouseleave', this.stopMove);

    this.imgBoxRef?.current?.removeEventListener('mousedown', this.mouseDown);
    this.imgBoxRef?.current?.removeEventListener('mousemove', this.mouseMove);
    this.imgBoxRef?.current?.removeEventListener('mouseup', this.mouseUp);

    this.setState = () => {
      return;
    };
  }

  // 加载图片
  loadImg = (init = true) => {
    let { src, scale } = this.props;
    if (!src) return false;
    let imgBox: any = this.imgBoxRef.current,
      boxW = imgBox?.clientWidth,
      boxH = imgBox?.clientHeight;

    let img = new Image();
    img.onload = (e: any) => {
      let imgW = e.target.width,
        imgH = e.target.height,
        curImgW = imgW,
        curImgH = imgH,
        { center } = this.props,
        { curLeft, curTop } = this.state;

      this.imgSize = { w: imgW, h: imgH };
      this.boxSize = { w: boxW, h: boxH };
      if (scale) {
        // 初始设置缩放比例
        let scaleNum = this.initScale;
        curImgW = (imgW * scaleNum) / 100;
        curImgH = (imgH * scaleNum) / 100;
      } else if (imgW > boxW || imgH > boxH) {
        // 没有设置比例，则初始不超出容器
        let boxRatio = boxW / boxH,
          imgRatio = imgW / imgH;
        if (boxRatio > imgRatio) {
          curImgH = boxH;
          curImgW = curImgH * imgRatio;
        } else {
          curImgW = boxW;
          curImgH = curImgW / imgRatio;
        }
      }
      if (init || center) {
        curLeft = (boxW - curImgW) / 2;
        curTop = (boxH - curImgH) / 2;
      }

      this.setState(
        {
          curImgW,
          curImgH,
          curLeft,
          curTop,
          isLoading: false,
        },
        () => {
          if (!scale) {
            this.props.onZoomin(this.imgScale);
          }
        },
      );
    };
    img.src = src;
  };

  // 鼠标按下
  mouseDown = (e: any) => {
    // e?.persist(); // 兼容react合成事件，否则无法获取pageX等属性
    e?.preventDefault();
    e?.stopPropagation();
    this.isDrag = true;
    if (e.type === 'touchstart') {
      let touch = e.touches[0];
      if (e.touches.length > 1) {
        let touch2 = e.touches[1],
          diffX = Math.abs(touch.pageX - touch2.pageX),
          diffY = Math.abs(touch.pageY - touch2.pageY);

        this.startDist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)); // 两点之间的距离
        this.startX = (touch.pageX + touch2.pageX) / 2;
        this.startY = (touch.pageY + touch2.pageY) / 2;
      } else {
        this.startX = touch.pageX;
        this.startY = touch.pageY;
      }
    } else {
      this.startX = e.pageX;
      this.startY = e.pageY;
    }
    if (this.clickTimer) clearTimeout(this.clickTimer);
    this.startTime = Date.now();
  };
  // 鼠标移动
  mouseMove = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e.type === 'touchmove') {
      let touch = e.touches[0];
      if (e.touches.length > 1) {
        let touch2 = e.touches[1],
          diffX = Math.abs(touch.pageX - touch2.pageX),
          diffY = Math.abs(touch.pageY - touch2.pageY),
          curDist = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2)), // 两点之间的距离
          curScale = parseInt((curDist / this.startDist) * 100 + '');
        this.pageX = (touch.pageX + touch2.pageX) / 2;
        this.pageY = (touch.pageY + touch2.pageY) / 2;
        this.zoominImg(curScale, true);
        this.startDist = curDist;
      } else {
        this.pageX = touch.pageX;
        this.pageY = touch.pageY;
      }
    } else {
      this.pageX = e.pageX;
      this.pageY = e.pageY;
    }
    if (this.isDrag) {
      let diffX = this.pageX - this.startX,
        diffY = this.pageY - this.startY;
      this.setState(
        (pre: any) => {
          return {
            curLeft: diffX + pre.curLeft,
            curTop: diffY + pre.curTop,
          };
        },
        () => {
          this.startX = this.pageX;
          this.startY = this.pageY;
        },
      );
    }
  };
  // 鼠标进入
  mouseEnter = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e.buttons > 0) {
      this.isDrag = true;
    }
  };
  // 鼠标抬起、离开
  mouseUp = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    this.isDrag = false;
    this.endTime = Date.now();
    if (this.endTime - this.startTime <= 200) {
      this.clickTimer = setTimeout(() => {
        this.props.onClick();
      }, 100);
    }
  };
  stopMove = (e: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    this.isDrag = false;
  };

  // 滚轮放大缩小e.deltaY>0下滚，<0上滚
  wheelImg = (e: any) => {
    e?.preventDefault();
    e?.nativeEvent?.stopImmediatePropagation(); // 阻止冒泡，防止触发全局事件
    e.stopPropagation();
    let type = e.deltaY > 0 ? 'narrow' : 'enlarge';
    this.zoominImg(type, true);
  };
  // 放大缩小图片(narrow缩小，enlarge放大)(isHandEvent是否手动操作)
  zoominImg = (type?: string | number, isHandEvent?: boolean) => {
    let minScale = Number(this.props.minScale),
      maxScale = Number(this.props.maxScale),
      curScale = this.imgScale,
      curImgW = this.imgSize.w,
      curImgH = this.imgSize.h,
      speed = 0;
    switch (type) {
      case 'narrow':
        // console.log('narrow');
        // curScale = curScale - 1;
        speed = (curScale - minScale) / 20;
        curScale = curScale - speed;
        curScale = curScale > minScale ? curScale : minScale;
        break;
      case 'enlarge':
        // console.log('enlarge', curScale);
        speed = (maxScale - curScale) / 20;
        speed = speed > 1 ? speed : 2;
        curScale = curScale + speed;
        curScale = curScale < maxScale ? curScale : maxScale;
        break;
      default:
        if (typeof type === 'number') {
          curScale = type;
          curScale = (curScale / 100) * this.imgScale;
          curScale = curScale > minScale ? curScale : minScale;
          curScale = curScale < maxScale ? curScale : maxScale;
        } else {
          curScale = this.initScale;
        }
        break;
    }
    curImgW = (curScale / 100) * this.imgSize.w;
    curImgH = (curScale / 100) * this.imgSize.h;

    // console.log('curScale', curScale, curImgW, curImgH);
    this.setState(
      {
        curImgW,
        curImgH,
        ...this.calcTranslate(curScale, isHandEvent),
      },
      () => {
        if (type === 'narrow' || type === 'enlarge') {
          this.props.onZoomin(this.imgScale);
        }
      },
    );
  };
  // 计算图片偏移量
  calcTranslate = (curScale: number, isHandEvent?: boolean) => {
    curScale = curScale || this.imgScale;
    let { curImgW, curImgH, curLeft, curTop } = this.state,
      boxPosi: any = this.imgBoxRef?.current?.getBoundingClientRect() || {},
      // 尺寸变化
      diffW = curImgW - (curScale / 100) * this.imgSize.w,
      diffH = curImgH - (curScale / 100) * this.imgSize.h,
      // 位置比例
      posiXRatio = 1 / 2,
      posiYRatio = 1 / 2;
    if (isHandEvent) {
      // 鼠标位置相对容器的左右、上下比例
      posiXRatio = (this.pageX - boxPosi.left) / (boxPosi.right - boxPosi.left);
      posiYRatio = (this.pageY - boxPosi.top) / (boxPosi.bottom - boxPosi.top);
    }
    return {
      curLeft: curLeft + diffW * posiXRatio,
      curTop: curTop + diffH * posiYRatio,
    };
  };

  // 图片加载成功
  onImgLoaded = (e: any) => {
    this.props.onImgLoaded(e);
  };
  // 图片加载失败
  onImgError = (e: any) => {
    this.props.onImgError(e);
  };

  render() {
    // onMouseDown onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onWheel
    let { src, className } = this.props;
    let { curImgW, curImgH, curLeft, curTop } = this.state;
    return (
      <div className={`img-box ${className}`} ref={this.imgBoxRef}>
        <img
          src={src}
          alt=""
          style={{
            width: `${curImgW}px`,
            height: `${curImgH}px`,
            transform: `translate(${curLeft}px, ${curTop}px)`,
          }}
          onLoad={this.onImgLoaded}
          onError={this.onImgError}
          draggable="false"
        />
      </div>
    );
  }
}

export default WImgZoomin;
