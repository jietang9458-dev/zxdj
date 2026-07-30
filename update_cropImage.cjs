const fs = require('fs');
let content = fs.readFileSync('src/utils/cropImage.ts', 'utf-8');

const targetReturn = `  return new Promise((resolve, reject) => {
    let quality = 0.9;
    const attemptCompress = () => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        if (blob.size / 1024 / 1024 > maxSizeMB && quality > 0.1) {
          quality -= 0.1;
          attemptCompress();
        } else {
          resolve(new File([blob], 'cropped.jpg', { type: 'image/jpeg' }));
        }
      }, 'image/jpeg', quality);
    };
    attemptCompress();
  });`;

const replaceReturn = `  const isPng = imageSrc.startsWith('data:image/png');
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
          resolve(new File([blob], \`cropped.\${ext}\`, { type: mimeType }));
        }
      }, mimeType, isPng ? undefined : quality);
    };
    attemptCompress();
  });`;

content = content.replace(targetReturn, replaceReturn);
fs.writeFileSync('src/utils/cropImage.ts', content);
