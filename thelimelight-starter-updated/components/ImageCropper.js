import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function ImageCropper({ onCropped }) {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 });
  const imgRef = useRef();

  function onSelectFile(e) {
    if(e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoaded(image) {
    imgRef.current = image;
  }

  async function makeClientCrop() {
    if(!imgRef.current) return;
    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    // draw cropped area scaled to 500x500
    ctx.drawImage(imgRef.current, 0,0, imgRef.current.naturalWidth, imgRef.current.naturalHeight, 0,0, 500,500);
    canvas.toBlob(blob => {
      onCropped(blob);
    }, 'image/jpeg', 0.9);
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {src && (
        <>
          <ReactCrop src={src} crop={crop} onChange={c => setCrop(c)} onImageLoaded={onImageLoaded} />
          <button type="button" onClick={makeClientCrop}>Crop & Use</button>
        </>
      )}
    </div>
  );
}
