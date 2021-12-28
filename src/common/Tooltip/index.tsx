import React, { Component, createRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import InnerTooltip from './tooltip';

interface Props {
  content: string;
  dir: string; // 气泡框剪头方向：top、bottom、right、left
}

// const Test = React.forwardRef((props: any, ref: any) => (
//   <button ref={ref} className="FancyButton">
//     {props.children}
//   </button>
// ));

const TempTooltip = (props: any) => {
  console.log(props);

  const container = document.createElement('div');
  document.body.appendChild(container);
  return ReactDOM.createPortal(<InnerTooltip {...props} />, container);

  //  return   ReactDOM.render(<InnerTooltip {...this.props} />, container)
};

class Tooltip extends Component<Props> {
  static defaultProps = {
    content: '2323',
    dir: 'top',
    className: '',
  };

  state = {
    show: false,
  };
  timer = null;
  runwayRef: React.RefObject<HTMLInputElement> = createRef();

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
  }

  mouseEnter = (e: any) => {
    console.log(1);
    this.setState({ show: true });
    setTimeout(() => {
      console.log('显示');
      // this.test()
      console.log(<TempTooltip />);
    }, 10);
  };
  mouseLeave = (e: any) => {
    console.log(2);
    if (this.timer) clearTimeout(this.timer);
    this.setState({ show: false });
  };
  render() {
    let { children } = this.props,
      { show } = this.state;
    return (
      <>
        {React.Children.map(children, (child: any) => {
          return React.cloneElement(child, {
            className: [child.props.className, 'tooltip-wrap'].join(' '),
            onMouseEnter: (e: MouseEvent) => {
              this.mouseEnter(e);
              child.props.onMouseEnter && child.props.onMouseEnter(e);
            },
            onMouseLeave: (e: MouseEvent) => {
              this.mouseLeave(e);
              child.props.mouseLeave && child.props.mouseLeave(e);
            },
          });
        })}
        <TempTooltip {...this.props} />
      </>
    );
  }
}

export default Tooltip;
