type Fn = (...args: any) => any

class RAFSetTimeoutImp {
  private instance: number | null

  private now = Date.now

  private current = this.now()

  private old = this.now()

  constructor(private callback: Fn, private time: number = 0) {
    const fn = () => {
      if (this.current - this.old > this.time) {
        this.callback()
        this.old = this.now()
        this.clear()
        return
      }
      this.current = this.now()
      this.instance = window.requestAnimationFrame(fn)
    }
    this.instance = window.requestAnimationFrame(fn)
  }

  public clear() {
    window.cancelAnimationFrame(this.instance as number)
    this.instance = null
  }
}

export function RAFSettimeout(callback: Fn, time: number) {
  const instance = new RAFSetTimeoutImp(callback, time)
  return instance.clear.bind(instance)
}
