import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Observable, fromEvent, of } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { ObserverParam } from './Types';

function Home() {
  const [a, setA] = useState(1);
  // const [b, setB] = useState(2);
  const observer = useRef<Observable<ObserverParam>>();

  function onSubscribe() {
    observer.current && observer.current.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
    console.log('subscribe end');
  }
  useEffect(() => {
    observer.current = new Observable<ObserverParam>((subscriber) => {
      try {
        subscriber.next({ id: '1' });
        subscriber.next({ id: '2' });
        // const dd = of({id: '1'}, {id: '2'});
        // // console.log(of({id: '1'}, {id: '2'}))
        // dd.subscribe({
        //   next: v => {
        //     console.log(v);
        //   },
        //   complete: () => {
        //     console.log(44)
        //   }
        // })
        // throw new Error('抛出错误');
        setTimeout(() => {
          subscriber.next({ id: '3' });
          subscriber.complete();
        }, 1000);

        // subscriber.next({ id: '3' }); // 执行了complete后无效
      } catch (error) {
        subscriber.error(error);
      }
    });
  });

  useEffect(() => {
    const source = fromEvent(document.body, 'click').pipe(
      map((e) => of(1, 2, 3)),
      concatAll()
    );
    source.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (error) => {
        console.log(error);
      },
    });
    // (window as any).gclick();
    // GET('user').subscribe(res => {
    //   console.log('res', res);
    // })
  })

  return <Suspense fallback={<div>loading...</div>}>
  <div>
    this is home<button onClick={onSubscribe}>obverser</button>
    <button onClick={() => setA(4)}>修改 state.b</button>
    <p>a:{a}</p>
    {/* <p>b:{b}</p> */}
  </div>
</Suspense>
}

/* class Home extends React.Component<{}, {}> {
  state = {
    a: 1,
    b: 2,
  };
  observer = new Observable<ObserverParam>((subscriber) => {
    try {
      subscriber.next({ id: '1' });
      subscriber.next({ id: '2' });
      // const dd = of({id: '1'}, {id: '2'});
      // // console.log(of({id: '1'}, {id: '2'}))
      // dd.subscribe({
      //   next: v => {
      //     console.log(v);
      //   },
      //   complete: () => {
      //     console.log(44)
      //   }
      // })
      // throw new Error('抛出错误');
      setTimeout(() => {
        subscriber.next({ id: '3' });
        subscriber.complete();
      }, 1000);

      // subscriber.next({ id: '3' }); // 执行了complete后无效
    } catch (error) {
      subscriber.error(error);
    }
  });

  componentDidMount() {
    const source = fromEvent(document.body, 'click').pipe(
      map((e) => of(1, 2, 3)),
      concatAll()
    );
    source.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (error) => {
        console.log(error);
      },
    });
    // (window as any).gclick();
    GET('user').subscribe(res => {
      console.log('res', res);
    })
  }

  onSubscribe = () => {
    this.observer.subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
    console.log('subscribe end');
  };
  directChange = () => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.a = 4;
  };
  directChangeb = () => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.setState({
      b: 3,
    });
  };
  render() {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <div>
          this is home<button onClick={this.onSubscribe}>obverser</button>
          <button onClick={this.directChange}>直接修改 state.a</button>
          <button onClick={this.directChangeb}>修改 state.b</button>
          <p>a:{this.state.a}</p>
          <p>b:{this.state.b}</p>
        </div>
      </Suspense>
    );
  }
} */

export default Home;
