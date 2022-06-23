type Fn = (...args: any) => any

class RAFSetIntervalImp {
  private instance: number

  private now = Date.now

  private current = this.now()

  private old = this.now()

  constructor(private callback: Fn, private time: number = 0) {
    const fn = () => {
      if (this.current - this.old > this.time) {
        this.callback()
        this.old = this.now()
      }
      this.current = this.now()
      this.instance = window.requestAnimationFrame(fn)
    }
    this.instance = window.requestAnimationFrame(fn)
  }

  public clean() {
    window.cancelAnimationFrame(this.instance)
  }
}

export function RAFSetInterval(callback: Fn, time: number) {
  const instance = new RAFSetIntervalImp(callback, time)
  return instance.clean.bind(instance)
}
