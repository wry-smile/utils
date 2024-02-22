
// const urlAlphabet = (() => {
//   const dicts: (string | number)[] = Array.from({ length: 10 }, (_, index) => index)

//   for (let i = 65; i <= 90; i++) {
//     dicts.push(String.fromCharCode(i))
//   }

//   for (let i = 97; i <= 122; i++) {
//     dicts.push(String.fromCharCode(i))
//   }

//   dicts.push(...['_', '-'])


//   return dicts.sort(() => Math.random() - 0.5).join('')
// })()

/**
 * @description string includes 0-9a-zA-Z_-
 */
const urlAlphabet = 'xQDLEdCZyzBnY_vcMIe-XFAGm9lWs8hV7ujafUSb6iHPO5gNK43wpTrtRq2k1J0o'

export function randomString(size = 16, dict = urlAlphabet) {
  let id = "";
  let i = size;
  const len = dict.length;
  while (i--)
    id += dict[Math.random() * len | 0];
  return id;
}

export function randomHexString(size = 6) {
  const dict = '2B0AD471FCG5368E9'
  return randomString(size, dict)
}
