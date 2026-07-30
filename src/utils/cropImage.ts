export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number, y: number, width: number, height: number },
  maxSizeMB: number = 1
): Promise<File> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  const isPng = imageSrc.startsWith('data:image/png');
  const mimeType = isPng ? 'image/png' : 'image/jpeg';
  const ext = isPng ? 'png' : 'jpg';

  return new Promise((resolve, reject) => {
    let quality = 0.9;
    const attemptCompress = () => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        if (blob.size / 1024 / 1024 > maxSizeMB && quality > 0.1 && !isPng) {
          quality -= 0.1;
          attemptCompress();
        } else {
          resolve(new File([blob], `cropped.${ext}`, { type: mimeType }));
        }
      }, mimeType, isPng ? undefined : quality);
    };
    attemptCompress();
  });
}
