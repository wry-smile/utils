// src/module/RAFSetTimeout.ts
var RAFSetTimeoutImp = class {
  constructor(callback, time = 0) {
    this.callback = callback;
    this.time = time;
    this.now = Date.now;
    this.current = this.now();
    this.old = this.now();
    const fn = () => {
      if (this.current - this.old > this.time) {
        this.callback();
        this.old = this.now();
        this.clear();
        return;
      }
      this.current = this.now();
      this.instance = window.requestAnimationFrame(fn);
    };
    this.instance = window.requestAnimationFrame(fn);
  }
  clear() {
    window.cancelAnimationFrame(this.instance);
    this.instance = null;
  }
};
function RAFSettimeout(callback, time) {
  const instance = new RAFSetTimeoutImp(callback, time);
  return instance.clear.bind(instance);
}

// src/module/RAFSetInterval.ts
var RAFSetIntervalImp = class {
  constructor(callback, time = 0) {
    this.callback = callback;
    this.time = time;
    this.now = Date.now;
    this.current = this.now();
    this.old = this.now();
    const fn = () => {
      if (this.current - this.old > this.time) {
        this.callback();
        this.old = this.now();
      }
      this.current = this.now();
      this.instance = window.requestAnimationFrame(fn);
    };
    this.instance = window.requestAnimationFrame(fn);
  }
  clear() {
    window.cancelAnimationFrame(this.instance);
  }
};
function RAFSetInterval(callback, time) {
  const instance = new RAFSetIntervalImp(callback, time);
  return instance.clear.bind(instance);
}
export {
  RAFSetInterval,
  RAFSettimeout
};
