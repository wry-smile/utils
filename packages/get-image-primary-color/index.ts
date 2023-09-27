export function useGetImagePrimaryColor(image: HTMLImageElement) {
  const canvas = document.createElement('canvas')
  canvas.style.display = 'none'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')

  image.onload = () => {
    const naturalImgSize = { width: image.naturalWidth, height: image.naturalHeight }

    canvas.width = naturalImgSize.width
    canvas.height = naturalImgSize.height

    ctx?.drawImage(image, 0, 0)

    ctx?.getImageData(0, 0, naturalImgSize.width, naturalImgSize.height)
  }
}
