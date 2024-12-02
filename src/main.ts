import { MyDisplay } from '../core/myDisplay';
import { Parts } from './parts';
import './style.css'

export class Main extends MyDisplay {
  private _parts: Array<Parts> = [];

  constructor(opt: any) {
    super(opt);

    const num = 1
    for (let i = 0; i < num; i++) {
      const el = document.createElement('div');
      el.classList.add('l-item');
      this.el.appendChild(el);

      const p = new Parts({
        el: el,
        dispId: i,
      });

      this._parts.push(p);
    }
  }


  // 更新
  protected _update(): void {
    super._update();

  }
}


document.querySelectorAll('.l-main').forEach((el,i) => {
  new Main({
    el: el,
  })

  if(i == 1) {
    el.classList.add('-small')
  }
})
