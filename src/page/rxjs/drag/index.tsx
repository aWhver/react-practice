import React, { PureComponent } from 'react';
import { fromEvent } from 'rxjs';
import { map, takeUntil, concatAll } from 'rxjs/operators';
import { IState } from './Types';
import './style.less';

class Drag extends PureComponent<{}, IState> {
  oDrag: HTMLDivElement | null = null;
  oBody: HTMLBodyElement | null = null;

  static state: IState = {
    posX: 0,
    posY: 0
  };

  componentDidMount() {
    this.oDrag = document.querySelector('.drag') as HTMLDivElement;
    this.oBody = document.querySelector('body') as HTMLBodyElement;
    this._initEvent();
  }

  _initEvent() {
    const mousedown = fromEvent(this.oDrag as HTMLDivElement, 'mousedown');
    const mousemove = fromEvent(this.oBody as HTMLBodyElement, 'mousemove');
    const mouseup = fromEvent(this.oBody as HTMLBodyElement, 'mouseup');

    mousedown
      .pipe(
        map(() => mousemove),
        map(takeUntil(mouseup)),
        concatAll(),
        map((event: any) => {
          return { posX: event.clientX, posY: event.clientY };
        })
      )
      .subscribe({
        next: pos => {
          const { posX, posY } = pos;
          if (this.oDrag) {
            this.oDrag.style.top = `${posY}px`;
            this.oDrag.style.left = `${posX}px`;
          }
        }
      });
  }

  render() {
    return (
      <div className="drag-container">
        <div className="drag"></div>
      </div>
    );
  }
}

export default Drag;
