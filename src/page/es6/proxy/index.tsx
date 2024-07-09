import React, { useEffect } from 'react';
import LazyManClass from './utils';

function TestProxy() {
  function proxyGet() {
    const handle: any = {
      get(target: any, propKey: string, receiver: any) {
        console.log(target, receiver);
        if (propKey === 'b') {
          return receiver;
        }
        return target[propKey];
      },
      set(target: any, propKey: string | number, value: any, receiver: any) {
        console.log(5);
        target[propKey] = value;
        return value;
      },
      apply: function(target: any, thisBinding: any, args: any[]) {
        console.log(target, thisBinding);
        return args[0];
      },
    };

    const proxy = new Proxy({
      console: function(x: any) {
        console.log(x);
        return x;
      }
    }, handle);
    proxy.console(4);
    // const propter = proxy.b;
    // proxy.c = 2;
    // console.log(propter, propter === proxy);
    // console.log(proxy.apply({ a: 6, fn: function() {return 9} }, [1]));
  }

  function number() {
    // const numberHandle = {
    //   get(target, propKey, receiver) {
    //     console.log(this, propKey);
    //     return receiver;
    //   },
    //   apply(target, bind, args) {
    //     return args[0];
    //   }
    // }
    const proxy: any = new Proxy(Number, {
      get(target, propKey, receiver) {
        console.log(this);
        return receiver;
      },
      apply(target, bind, args) {
        console.log(this);
        return proxy;
      }
    });
    proxy.add = function(num: number) {
      console.log(this);
      return this + num;
    };
    proxy.minus = function(num: number) {
      console.log(this);
      return this - num;
    };
    const result = proxy(3).add(4);
    console.log(result);
  }

  useEffect(() => {
    function LazyMan(name: string) {
      return new LazyManClass(name);
    }
    const lazyman = LazyMan('Tony');

    lazyman.eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
  })

  useEffect(() => {
    proxyGet();
    number();
    const handler = {
      defineProperty (target: any, key: string, descriptor: any) {
        console.log(target, key, descriptor);
        target[key] = descriptor.value;
        return true;
      }
    };
    const target = {};
    const proxy = new Proxy(target, handler);
    Object.defineProperty(proxy, 'foo', {
      value: 'bar',
      writable: true,
      configurable: true,
      enumerable: true,
    });
    // proxy.foo = 'bar' // 不会生效
    console.log(proxy, target);
  }, []);
  return (
    <div>
      <h3>Proxy</h3>
      <code>

      </code>
    </div>
  );
}

export default TestProxy;
