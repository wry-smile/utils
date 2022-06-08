export function useDrag(dragEl: HTMLElement) {
  function getPxValue(value: string) {
    if (value.includes('px')) return Number(value.replace(/px/g, ''))
    return Number(value)
  }

  dragEl.addEventListener('mousedown', (event) => {
    const domCX = event.clientX
    const domCY = event.clientY

    const domWidth = dragEl.offsetWidth
    const domHeight = dragEl.offsetHeight

    const bodyWidth = document.body.clientWidth
    const bodyHeight = window.innerHeight

    const minLeftMoveDistance = dragEl.offsetLeft
    const maxLeftMoveDistance = bodyWidth - domWidth - dragEl.offsetLeft

    const minTopMoveDistance = dragEl.offsetTop
    const maxTopMoveDistance = bodyHeight - domHeight - dragEl.offsetTop

    let leftPx = getPxValue(getComputedStyle(dragEl).left)
    let topPx = getPxValue(getComputedStyle(dragEl).top)

    leftPx += leftPx
    topPx += topPx
    document.onmousemove = (event) => {
      let leftMoveDistance = event.clientX - domCX
      let topMoveDistance = event.clientY - domCY

      // 边界处理
      if (-leftMoveDistance > minLeftMoveDistance)
        leftMoveDistance = -minLeftMoveDistance

      else if (leftMoveDistance > maxLeftMoveDistance)
        leftMoveDistance = maxLeftMoveDistance

      if (-topMoveDistance > minTopMoveDistance)
        topMoveDistance = -minTopMoveDistance

      else if (topMoveDistance > maxTopMoveDistance)
        topMoveDistance = maxTopMoveDistance

      dragEl.style.cssText += `;left: ${leftPx + leftMoveDistance}px; top: ${topPx + topMoveDistance}px;`
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
    }
  })
}
