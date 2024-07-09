/* eslint-disable */
export default class LazyManClass {
  taskList: any;
  name: string;
  constructor(name: string) {
      this.taskList = [];
      this.name = name;
      console.log(`Hi I am ${this.name}`);
      setTimeout(() => {
          this.next();
      }, 0);
  }
  eat (name: string) {
      var that = this;
      var fn = (function (n) {
          return function () {
              console.log(`I am eating ${n}`)
              that.next();
          }
      })(name);
      this.taskList.push(fn);
      return this;
  }
  sleepFirst (time: number) {
      var that = this;
      var fn = (function (t) {
          return function () {
              setTimeout(() => {
                  console.log(`等待了${t}秒...`)
                  that.next();
              }, t * 1000);
          }
      })(time);
      this.taskList.unshift(fn);
      return this;
  }
  sleep (time: number) {
      var that = this
      var fn = (function (t) {
          return function () {
              setTimeout(() => {
                  console.log(`等待了${t}秒...`)
                  that.next();
              }, t * 1000);
          }
      })(time);
      this.taskList.push(fn);
      return this;
  }
  next () {
      var fn = this.taskList.shift();
      fn && fn();
  }
}
