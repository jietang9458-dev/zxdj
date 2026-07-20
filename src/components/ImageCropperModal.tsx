import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
import { X } from 'lucide-react';

interface ImageCropperModalProps {
  imageSrc: string;
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export default function ImageCropperModal({ imageSrc, onCropComplete, onCancel, aspectRatio }: ImageCropperModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      setIsCropping(true);
      const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels, 2); // Compress to under 2MB
      onCropComplete(croppedImageFile);
    } catch (e) {
      console.error(e);
      alert('裁剪失败');
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/90">
      <div className="flex justify-between items-center p-4 text-white">
        <h3 className="font-bold text-sm">图片裁剪 (自动压缩至2MB内)</h3>
        <button onClick={onCancel} className="p-2 hover:bg-white/20 rounded-full">
          <X size={20} />
        </button>
      </div>
      <div className="relative flex-1">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio || undefined}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={setZoom}
        />
      </div>
      <div className="p-6 flex gap-4 bg-black">
        <button 
          onClick={onCancel}
          className="flex-1 py-3 text-white font-bold bg-white/10 rounded-xl"
        >
          取消
        </button>
        <button 
          onClick={handleCrop}
          disabled={isCropping}
          className="flex-1 py-3 text-[#1A1108] font-bold bg-[#D4AF37] rounded-xl"
        >
          {isCropping ? '处理中...' : '确认裁剪'}
        </button>
      </div>
    </div>
  );
}
