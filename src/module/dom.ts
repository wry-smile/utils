/**
 * @description get node offset
 * @param {HTMLElement} ele node
 * @returns
 */
export function getOffset(ele: HTMLElement): { top: number; left: number } {
  let el = ele
  let _x = 0
  let _y = 0
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft
    _y += el.offsetTop - el.scrollTop
    el = el.offsetParent as HTMLElement
  }
  return { top: _y, left: _x }
}
