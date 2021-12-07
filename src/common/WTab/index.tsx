import React, { Component } from 'react';

import WTabPane from './WTabPane';
import styles from './index.less';

interface Props {
  initTag: string,
  className?: string,
  onClick?: (...param: any) => any,
}

class WTab extends Component<Props> {
  static defaultProps = {
    initTag: '',
    className: '',
    onClick: () => { }
  };

  state = {
    curTag: ''
  }

  componentDidMount() {
    if (this.props.initTag) {
      this.setState({ curTag: this.props.initTag })
    } else {
      let childs: any = this.props.children
      childs && this.setState({ curTag: childs[0]?.props.tag })
    }
  }

  click = (tag: string, index: number, item: any) => {
    this.props.onClick && this.props.onClick(tag, index, item);
    this.setState({ curTag: tag });
  };

  render() {
    let { children, className } = this.props;
    return (
      <div className={styles['tab-box']}>
        <div className={`${styles["t-top"]} ${className}`}>
          {
            React.Children.map(children, (item: any, i) => {
              let { label, tag } = item.props;
              return <div className={`${styles["item"]} ${tag === this.state.curTag ? styles["on"] : ''}`} onClick={this.click.bind(this, tag, i, item)} key={i}>
                {typeof label === 'function' ? label() : label}
              </div>;
            })
          }
        </div>
        {
          React.Children.map(children, (child: any, index) => {
            return React.cloneElement(child, {
              index: index,
              curTag: this.state.curTag
            });
          })
        }
      </div>
    );
  }
}

export { WTab, WTabPane };