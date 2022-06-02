import React, { useState, useEffect, useRef, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { isTouchDevice } from '../../assets/js/utils';

import './index.less';

// 定位tip位置
const setPosi = (childNode: any, refNode: any, props: any) => {
  if (!childNode || !refNode) return false;

  let { dir } = props,
    childPosi = childNode.getBoundingClientRect(),
    refPosi = refNode.getBoundingClientRect(),
    refW = refPosi.right - refPosi.left,
    refH = refPosi.bottom - refPosi.top,
    childW = childPosi.right - childPosi.left,
    childH = childPosi.bottom - childPosi.top,
    tipX = 0,
    tipY = 0,
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
    scrolleft = document.body.scrollLeft || document.documentElement.scrollLeft;
  if (dir === 'bottom') {
    tipX = childPosi.left + childW / 2 - refW / 2;
    tipY = childPosi.bottom + 8 + 6;
  } else if (dir === 'left') {
    tipX = childPosi.left - refW - 8 - 6;
    tipY = childPosi.top + childH / 2 - refH / 2;
  } else if (dir === 'right') {
    tipX = childPosi.right + 8 + 6;
    tipY = childPosi.top + childH / 2 - refH / 2;
  } else {
    // top
    tipX = childPosi.left + childW / 2 - refW / 2;
    tipY = childPosi.top - refH - 8 - 6;
  }
  // console.log("childPosi", childPosi);
  // console.log("refPosi", refNode);
  // console.log("refPosi", refPosi);
  // console.log(tipX, tipY);

  refNode.style.left = tipX + scrolleft + 'px';
  refNode.style.top = tipY + scrollTop + 'px';
};

// 需要tooltip的容器
let TooltipChild = (props: any, ref: any): any => {
  return (
    <>
      {React.Children.map(props.children, (child: any) => {
        return React.cloneElement(child, {
          ref: ref,
          // ref: props.childRef,
          className: [child.props.className, 'tooltip-wrap'].join(' '),
          onMouseDown: (e: MouseEvent) => {
            if (isTouchDevice() && e.type !== 'touchstart') return false;
            props.mouseDown(e);
            child.props.onMouseDown && child.props.onMouseDown(e);
          },
          onTouchStart: (e: TouchEvent) => {
            props.mouseDown(e);
            props.mouseEnter(e);
            child.props.onTouchStart && child.props.onTouchStart(e);
          },
          onTouchEnd: (e: TouchEvent) => {
            props.mouseLeave(e);
            child.props.onTouchEnd && child.props.onTouchEnd(e);
          },
          onMouseEnter: (e: MouseEvent) => {
            props.mouseEnter(e);
            child.props.onMouseEnter && child.props.onMouseEnter(e);
          },
          onMouseLeave: (e: MouseEvent) => {
            props.mouseLeave(e);
            child.props.onMouseLeave && child.props.onMouseLeave(e);
          },
        });
      })}
    </>
  );
};
TooltipChild = forwardRef(TooltipChild);

let InnerTooltip = (props: any): any => {
  let dirClass = 'top',
    { dir } = props;
  if (['top', 'bottom', 'right', 'left'].includes(dir)) {
    dirClass = dir;
  }
  return (
    <div
      className={`tooltip-box dir-${dirClass} ${props.className}`}
      ref={props.tooltipRef}
      onClick={props.click}
      onMouseLeave={props.mouseLeave}
      onMouseEnter={props.mouseEnter}
    >
      {props.content}
    </div>
  );
};

// tooltip内容
let TooltipCont = (props: any) => {
  useEffect(() => {
    if (!props.tooltipRef.current) return;
    // console.log('只第一次执行');
    setPosi(props.childNode, props.tooltipRef.current, props);
    // return () => {
    //   props.tooltipRef.current && document.body.removeChild(props.tooltipRef.current);
    // }
  }, [props.node]);

  useEffect(() => {
    if (!props.node) return;
    if (!props.show) {
      props.tooltipRef.current.style.display = 'none';
    } else {
      props.tooltipRef.current.style.removeProperty('display');
      // props.tooltipRef.current.removeAttribute("style");
      setPosi(props.childNode, props.tooltipRef.current, props);
    }
  }, [props.show]);
  return (
    props.node &&
    ReactDOM.createPortal(
      <InnerTooltip
        {...props}
        tooltipRef={props.tooltipRef}
        click={props.click}
        mouseLeave={props.mouseLeave}
        mouseEnter={props.mouseEnter}
      />,
      document.body,
    )
  );
};

const Tooltip = (props: any) => {
  let [show, setShow] = useState(false),
    [node, setNode] = useState(false),
    [isDrag, setIsDrag] = useState(false), // 拖动中
    [isLeave, setIsLeave] = useState(true), // 是否离开
    tooltipRef = useRef(null),
    childRef = useRef(null),
    showTimer: any = null,
    hideTimer: any = null;

  // show
  useEffect(() => {
    if (!show) return;
    if (!node) {
      setNode(true); // 第一次的时候新增节点
    }
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [show]);
  // isDrag
  useEffect(() => {
    if (isDrag) {
      window.addEventListener('mousemove', draging);
      window.addEventListener('touchmove', draging);
      window.addEventListener('mouseup', dragEnd);
      window.addEventListener('touchend', dragEnd);
    } else {
      window.removeEventListener('mousemove', draging);
      window.removeEventListener('touchmove', draging);
      window.removeEventListener('mouseup', dragEnd);
      window.removeEventListener('touchend', dragEnd);
      if (isLeave) {
        hide();
      }
    }
    return () => {
      window.removeEventListener('mousemove', draging);
      window.removeEventListener('touchmove', draging);
      window.removeEventListener('mouseup', dragEnd);
      window.removeEventListener('touchend', dragEnd);
    };
  }, [isDrag, isLeave]);

  const mouseDown = () => {
    // console.log('mouseDown');
    setIsDrag(true);
  };
  const draging = () => {
    // console.log('mousemove');
    if (isDrag) {
      if (hideTimer) window.clearTimeout(hideTimer);
      setPosi(childRef.current, tooltipRef.current, props);
    }
  };
  const dragEnd = () => {
    // console.log('mouseup');
    setIsDrag(false);
  };
  // mouseEnter
  const mouseEnter = () => {
    // console.log('mouseEnter');
    if (!isDrag) {
      setIsLeave(false);
    }
    if (showTimer) window.clearTimeout(showTimer);
    if (hideTimer) window.clearTimeout(hideTimer);
    showTimer = window.setTimeout(() => {
      setShow(true);
    }, 200);
  };
  // mouseLeave
  const mouseLeave = () => {
    // console.log('mouseLeave');
    if (!isDrag) {
      hide();
    } else {
      setIsLeave(true);
    }
  };
  // 隐藏
  const hide = () => {
    if (showTimer) clearTimeout(showTimer);
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      // console.log('隐藏');
      setShow(false);
    }, 200);
  };
  // 单击提示内容
  const clickTip = (e: any) => {
    e.preventDefault();
    e && e.stopPropagation();
  };

  return (
    <>
      <TooltipChild
        ref={childRef}
        {...props}
        mouseLeave={mouseLeave}
        mouseEnter={mouseEnter}
        mouseDown={mouseDown}
      />
      <TooltipCont
        tooltipRef={tooltipRef}
        childNode={childRef.current}
        {...props}
        show={show}
        node={node}
        click={clickTip}
        mouseLeave={mouseLeave}
        mouseEnter={mouseEnter}
      />
    </>
  );
};

Tooltip.defaultProps = {
  content: '',
  dir: 'top', // top、bottom、left、right
  className: '',
};

export default Tooltip;
