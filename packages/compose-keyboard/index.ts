export enum ComposeKey {
  CTRL_AND_C = 'CTRL_AND_C',
}

export enum KeyboardKey {
  C = 'c',
}

window.document.addEventListener(ComposeKey.CTRL_AND_C, (event) => {

})

const CTRL_AND_C_EVENT = new CustomEvent(ComposeKey.CTRL_AND_C, {
  detail: {
    copy: true,
  },
})

window.addEventListener('keydown', (event) => {
  console.log(event.key)
  if (event.ctrlKey && event.key === KeyboardKey.C)
    window.document.dispatchEvent(CTRL_AND_C_EVENT)
})
