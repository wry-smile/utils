var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  RAFSetInterval: () => RAFSetInterval,
  RAFSettimeout: () => RAFSettimeout
});
module.exports = __toCommonJS(src_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RAFSetInterval,
  RAFSettimeout
});
