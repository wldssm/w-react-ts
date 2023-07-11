class WDrag {
  public el?: HTMLDivElement; // 可拖拽区域
  public elBox: HTMLDivElement; // 被拖拽的容器
  public draging: boolean; // 是否拖拽中
  public startInfo: { x: any; y: any };

  constructor(elBox: HTMLDivElement, el?: HTMLDivElement) {
    this.el = el;
    this.elBox = elBox;
    this.draging = false;
    this.startInfo = { x: 0, y: 0 };

    if (this.el) {
      this.el.style.cursor = 'move';
      this.el.addEventListener('mousedown', this.down, { passive: false });
      this.el.addEventListener('touchstart', this.down, { passive: false });
      // this.el.onmousedown = this.down.bind(this);
    } else {
      this.elBox.style.cursor = 'move';
      this.elBox.addEventListener('mousedown', this.down, { passive: false });
      this.elBox.addEventListener('touchstart', this.down, { passive: false });
    }
  }

  // 获取鼠标按下位置与容器的边距
  down = (e: any) => {
    // e?.preventDefault();
    // e?.stopPropagation();
    if (e.type === 'touchstart') {
      e = e.touches[0];
    }
    let boxInfo = this.elBox?.getBoundingClientRect(),
      x = e.pageX - boxInfo.x,
      y = e.pageY - boxInfo.y;

    this.startInfo = { x, y };
    document.addEventListener('mousemove', this.move, { passive: false });
    document.addEventListener('touchmove', this.move, { passive: false });
    document.addEventListener('mouseup', this.up, { passive: false });
    document.addEventListener('touchend', this.up, { passive: false });
  };
  move = (e?: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e.type === 'touchmove') {
      e = e.touches[0];
    }

    // 边界不超过可视区域
    let clientW = document.body.clientWidth || document.documentElement.clientWidth || 0, // 可见区域宽,
      clientH = document.body.clientHeight || document.documentElement.clientHeight || 0; // 可见区域高

    if (e.pageX >= 0 && e.pageX <= clientW) {
      this.elBox.style.left = e.pageX - this.startInfo.x + 'px';
    }
    if (e.pageY >= 0 && e.pageY <= clientH) {
      this.elBox.style.top = e.pageY - this.startInfo.y + 'px';
    }
  };
  up = (e: any) => {
    // e?.preventDefault();
    // e?.stopPropagation();

    document.removeEventListener('mouseup', this.up);
    document.removeEventListener('touchend', this.up);
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('touchmove', this.move);
    // document.onmousemove = null;
  };
}
export default WDrag;
