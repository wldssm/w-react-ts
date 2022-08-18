import React, { Component } from 'react';

import './index.less';

interface Props {
  dir: string; // 方向（horizontal、vertical）
  posi: string; // 水平分割线文本的位置（left、right、center）
}

class Divider extends Component<Props> {
  static defaultProps = {
    dir: 'horizontal',
    posi: 'center',
  };

  render() {
    let { dir, posi, children } = this.props;
    return (
      <div className={`divider-line divider-line-${dir} divider-${posi}`}>
        {dir === 'horizontal' && <div className="divider-txt">{children}</div>}
      </div>
    );
  }
}

export default Divider;
