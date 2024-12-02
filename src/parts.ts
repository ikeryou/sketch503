import { Func } from '../core/func';
import { MyDisplay } from '../core/myDisplay';
import { Tween } from '../core/tween';
import { DisplayConstructor } from '../libs/display';
import { Util } from '../libs/util';

export class Parts extends MyDisplay {

  private _t:string = '';
  private _r:string = '';
  private _rtList: Array<HTMLElement> = []

  constructor(opt: DisplayConstructor) {
    super(opt);

    this._c = Util.randomInt(0, 500);

    this._t = '海月';
    this._r = 'くらげ';

    const num = Func.val(20, 40)
    for (let i = 0; i < num; i++) {
      const ruby = (i % 2 != 0)  ? `<ruby>${this._t}<rt></rt></ruby>` : `<ruby>${this._r}<rt></rt></ruby>`
      if(i == 0) {
        this.el.innerHTML = ruby;
      } else {
        const list = this.qsAll('rt')
        const tg = list[list.length - 1]
        tg.innerHTML = ruby
      }
    }

    this.qsAll('rt').forEach((el) => {
      this._rtList.push(el)
      this.useGPU(el)
    })
  }




  // 更新
  protected _update(): void {
    super._update();

    Tween.set(this.el, {
      rotate: `${Util.radian(this._c * 0.25)}rad`,
      x: `${Math.sin(Util.radian(this._c * 1.25)) * 50}em`,
      y: `${Math.cos(Util.radian(this._c * -1.35)) * 100}em`,
    })


    this._rtList.forEach((val,i) => {
      const rad = Util.radian(i * 10 + this._c * 2)
      const v = Util.map(Math.sin(rad), 0.1, Func.val(1, 2), -1, 1)
      Tween.set(val, {
        padding: `${v}em`,
      })
    })
  }
}

