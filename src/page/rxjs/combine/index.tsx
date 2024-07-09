import React from 'react';
import { combineLatest, take, zip, withLatestFrom } from 'rxjs/operators';
import { interval, Observable, from } from 'rxjs';

import './style.less';

class Combibe extends React.PureComponent<{}, {}> {
  componentDidMount() {
    // this._testCombieLatest();
    // this._testZip();
    this._testWithLatestFrom();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // (window as any).gclick();
  }

  _testCombieLatest() {
    const source: Observable<number> = interval(600).pipe(take(5));
    const source1: Observable<number> = interval(600).pipe(take(2));
    const example = source.pipe(
      combineLatest(source1, (x, y) => {
        console.log(x, y);
        return x + y;
      })
    );
    example.subscribe(value => {
      console.log('combineLatest result:', value);
    });
    console.log(
      // eslint-disable-next-line no-multi-str
      "const source: Observable<number> = interval(600).pipe(take(5));\n\
    const source1: Observable<number> = interval(600).pipe(take(2));\n\
    const example = source.pipe(\n\
      combineLatest(source1, (x, y) => {\n\
        console.log(x, y);\n\
        return x + y;\n\
      })\n\
    );\n\
    example.subscribe(value => {\n\
      console.log('result:', value);\n\
    });"
    );
  }

  _testZip() {
    const source: Observable<string> = from('Inigo');
    const source1: Observable<number> = interval(600).pipe(take(5));
    const example = source.pipe(
      zip(source1, (x, y) => {
        console.log(x, y);
        return x + y;
      })
    );
    example.subscribe(value => {
      console.log('zip result:', value);
    });
    console.log(
      // eslint-disable-next-line no-multi-str
      "const source: Observable<string> = from('Inigo');\n\
    const source1: Observable<number> = interval(600).pipe(take(3));\n\
    const example = source.pipe(\n\
      combineLatest(source1, (x, y) => {\n\
        console.log(x, y);\n\
        return x + y;\n\
      })\n\
    );\n\
    example.subscribe(value => {\n\
      console.log('result:', value);\n\
    });"
    );
  }

  _testWithLatestFrom() {
    const source = from('inigo').pipe(
      zip(interval(500), (x, y) => {
        // console.log('source', x, y);
        return x;
      })
    );
    const source1 = from('10101').pipe(
      zip(interval(400), (x, y) => {
        // console.log('source1', x, y);
        return x;
      })
    );
    const example = source.pipe(
      withLatestFrom(source1, (a, b) => {
        console.log('ab', a, b);
        return b === '1' ? a.toUpperCase() : a;
      })
    );
    example.subscribe(value => {
      console.log('result: ', value);
    });

    console.log(
      // eslint-disable-next-line no-multi-str
      "const source = from('inigo').pipe(\n\
      zip(interval(500), (x, y) => {\n\
        console.log('source', x, y);\n\
        return x;\n\
      })\n\
    );\n\
    const source1 = from('10101').pipe(\n\
      zip(interval(400), (x, y) => {\n\
        console.log('source1', x, y);\n\
        return x;\n\
      })\n\
    );\n\
    const example = source.pipe(\n\
      withLatestFrom(source1, (a, b) => {\n\
        // console.log('ab', a, b);\n\
        return b === '1' ? a.toUpperCase() : a;\n\
      })\n\
    );\n\
    example.subscribe(value => {\n\
      console.log('result: ', value);\n\
    });"
    );
  }

  render() {
    return (
      <div>
        <div>
          <h3>combineLatest: 处理多个异步行为输出到一个值,在浏览器查看</h3>
          <p>
            1、combineLatest的回调函数callback的参数和observer的数量相同,按照顺序
          </p>
          <p>
            2、用来计算的值是基于除了当前observer的外其他observer都是使用上一次输出的值
          </p>
          <div>
            <h5>当前例子：</h5>
            <div className="step">
              x: source, y: source1
              <p>
                1、source率先输出0，但是此时source1还没有输出，callback不执行
              </p>
              <p>2、source1输出0，source之前输出0，此时x，y分别为0，0，x+y=0</p>
              <p>
                3、source输出1，source1上一次输出0，此时x，y分别为1，0, x+y=1
              </p>
              <p>
                4、source1输出1，source上一次输出1，此时x，y分别为1，1, x+y=2
              </p>
              <p>
                5、source1结束，但source还没有结束，继续输出，source输出2，此时x，y分别为2，1,
                x+y=3
              </p>
              <p>6、source1结束，source输出3，此时x，y分别为3，1, x+y=4</p>
              <p>7、source1结束，source输出4，此时x，y分别为4，1, x+y=5</p>
            </div>
            不管是 source 还是 source1
            送出值来，只要另一方曾经有输出过值(即最后的值)，就会执行 callback
            并输出新的值，这就是 combineLatest
          </div>
        </div>
        <div>
          <h3>zip: 取每个observer索引相同的值同时输出到一个值,在浏览器查看</h3>
          <p>1、zip的回调函数callback的参数和observer的数量相同,按照顺序</p>
          <p>2、callback每个参数都是相同索引位置的值</p>
          <div>
            <h5>当前例子：</h5>
            <div className="step">
              x: source, y: source1
              <p>
                1、source率先输出第一个值I，但是此时source1还没有输出，callback不执行
              </p>
              <p>
                2、source1输出第一个值0，source之前输出第一个值0，此时x，y分别为I，0，x+y=
                I0
              </p>
              <p>
                3、source输出第二个值n，source1还没有输出第二个值，此时callback不执行
              </p>
              <p>
                4、source1输出第二个值1，source第二个值输出n，此时x，y分别为n，1,
                x+y=n1
              </p>
              <p>
                5、source第三个值i，但source1还没有输出第三个值，callback不执行
              </p>
              <p>
                6、source1输出第三个值2，source输出第三个值i，此时x，y分别为i，2,
                x+y=i2
              </p>
              <p>
                7、source第四个值g，但source1还没有输出第四个值，callback不执行
              </p>
              <p>
                8、source1输出第四个值3，source输出第三个值g，此时x，y分别为g，3,
                x+y=g3
              </p>
              <p>
                9、source第五个值o，但source1还没有输出第五个值，callback不执行
              </p>
              <p>
                10、source1输出第五个值4，source输出第三个值o，此时x，y分别为o，4,
                x+y=o4
              </p>
            </div>
            zip和combineLatest有所不同，如果所以不一致的话，是不会取前一个值用作元算，
            也可以看出2个obverser是交叉串行的， 不管是 source 还是 source1
            送出值来，不管另一方曾经有没有输出过值(即最后的值)，只要索引对不上就不会执行
            callback 并输出新的值，这就是 combineLatest. <br /> <br />
            利用 zip可以将同步变成异步，很适合用在建立示范用的资料。
            <br />
            <br />
            建议大家平常没事不要乱用 zip，除非真的需要。因为 zip 必须 cache
            住还没处理的元素，当我们两个 observable 一个很快一个很慢时，就会
            cache 非常多的元素，等待比较慢的那个
            observable。这很有可能造成内存相关的问题！
          </div>
        </div>
        <div>
          <h3>
            withLatestFrom: 处理多个异步行为输出到一个值,有关联性，在浏览器查看
          </h3>
          <p>
            1、有主从的关系,只有发起方(即调用withLatestFrom的observer)更新的时候，withLatestFrom的回调函数callback才会执行
          </p>
          <p>2、用来计算的值是基于次要的observer的上一次/本次输出的值</p>
          <div>
            <h5>当前例子：</h5>
            <div className="step">
              x: source, y: source1 <br />
              输出：InIGO <br />
              <p>
                1、从定时器可以看出，source500ms更新一次，source1每400ms更新一次,只有source更新了，example才会更新 <br/>
                source1率先输出1，但是此时source还没有输出，callback不执行
              </p>
              <p>2、source输出i，source1之前输出1，符合判断条件，i =&lt I</p>
              <p>
                3、source1输出0，source还没输出更新，callback不执行
              </p>
              <p>
                4、source输出n，source1上一次输出，不符合判断条件，n =&lt n
              </p>
              <p>
                5、source1输出1，source还没输出更新，callback不执行
              </p>
              <p>6、source输出i，source1之前输出1，符合判断条件，i =&lt I</p>
              <p>
                7、source1输出0，source还没输出更新，callback不执行
              </p>
              <p>8、source1输出1，source输出g，符合判断条件，g =&lt G</p>
              <p>9、source1结束输出，source输出o，取source1上次输出的值1，符合判断条件，o =&lt O</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Combibe;
