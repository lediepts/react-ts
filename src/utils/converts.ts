const MAX_SIZE = 500

export function toDataURL(
  src: string,
  maxSize = MAX_SIZE,
  callback: (data: string) => void,
  outputFormat: 'image/png' | 'image/jpeg' | 'image/webp' = 'image/png'
) {
  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.onload = function () {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (img.width > img.height && img.width > maxSize) {
      canvas.width = maxSize
      canvas.height = (maxSize * img.height) / img.width
    } else if (img.height > img.width && img.height > maxSize) {
      canvas.width = (maxSize * img.width) / img.height
      canvas.height = maxSize
    } else {
      canvas.width = img.width
      canvas.height = img.height
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const dataURL = canvas.toDataURL(outputFormat)
    callback(dataURL)
  }
  img.src = src
  if (img.complete || img.complete === undefined) {
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
    img.src = src
  }
}
export function videoCapture(
  video: HTMLVideoElement,
  maxSize = MAX_SIZE,
  rate = 1,
  callback: (data: string) => void,
  outputFormat: 'image/png' | 'image/jpeg' | 'image/webp' = 'image/png',
  flipX = -1
) {
  const canvas = document.createElement('canvas')
  const width = maxSize
  const height = maxSize * rate
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.save()
  ctx.translate(width, 0)
  ctx.scale(flipX, 1)
  ctx.drawImage(video, 0, 0, width, height)
  ctx.restore()
  callback(canvas.toDataURL(outputFormat))
}

export function loadCanvasAndResize(file: File, rate = 16 / 9) {
  return new Promise<HTMLCanvasElement>((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      if (img.width / img.height > rate) {
        // 幅あまった
        canvas.width = img.height * rate
        canvas.height = img.height
      } else {
        //　高あまった
        canvas.width = img.width
        canvas.height = img.width / rate
      }
      ctx.drawImage(
        img,
        canvas.width / 2 - img.width / 2,
        canvas.height / 2 - img.height / 2
      )
      resolve(canvas)
    }
    img.onerror = () => resolve(canvas)
  })
}
