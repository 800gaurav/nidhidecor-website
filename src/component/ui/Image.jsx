// components/ImageViewer.js
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { LeftOutlined, RightOutlined, ZoomInOutlined, ZoomOutOutlined, CloseOutlined } from '@ant-design/icons';

const ImageViewer = ({ urls, visible, onClose, title }) => {
  const images = Array.isArray(urls) ? urls : [urls];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="80%"
      bodyStyle={{ padding: 0, background: 'black', textAlign: 'center' }}
      centered
    >
      {/* Close */}
      <Button
        onClick={onClose}
        shape="circle"
        icon={<CloseOutlined />}
        style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}
      />

      {/* Prev */}
      {images.length > 1 && (
        <Button
          onClick={prevImage}
          shape="circle"
          icon={<LeftOutlined />}
          style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', zIndex: 10 }}
        />
      )}

      {/* Image */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <img
          src={images[currentIndex]}
          alt={title}
          style={{ maxHeight: '80vh', objectFit: 'contain', transform: `scale(${zoom})`, transition: 'transform 0.3s' }}
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <Button
          onClick={nextImage}
          shape="circle"
          icon={<RightOutlined />}
          style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', zIndex: 10 }}
        />
      )}

      {/* Zoom Controls */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, background: 'white', padding: 8, borderRadius: 8 }}>
        <Button onClick={() => setZoom((z) => Math.min(z + 0.2, 3))} icon={<ZoomInOutlined />} />
        <Button onClick={() => setZoom((z) => Math.max(z - 0.2, 1))} icon={<ZoomOutOutlined />} />
      </div>
    </Modal>
  );
};

export default ImageViewer;
