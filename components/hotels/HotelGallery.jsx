'use client';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import Img from '@/components/shared/Img';
import Modal from '@/components/shared/Modal';

export default function HotelGallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(0);

  const openAt = (i) => { setFull(i); setOpen(true); };
  const step = useCallback((d) => setFull((i) => (i + d + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, step]);

  return (
    <>
      <div className="gallery">
        <button type="button" className="gallery__main" onClick={() => openAt(active)} aria-label="Open photo gallery">
          <Img src={images[active]} alt={`${name} photo ${active + 1}`} priority />
        </button>
        <div className="gallery__thumbs">
          {images.map((src, i) => (
            <button type="button" key={src + i} className={`gallery__thumb ${i === active ? 'is-active' : ''}`} onClick={() => setActive(i)} onDoubleClick={() => openAt(i)} aria-label={`Show photo ${i + 1}`}>
              <Img src={src} alt="" />
            </button>
          ))}
        </div>
        <button type="button" className="btn btn--light btn--sm gallery__all" onClick={() => openAt(active)}>
          <Images size={16} /> View all {images.length} photos
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={`${name} — photos`} size="full" variant="gallery">
        <div className="lightbox">
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous photo"><ChevronLeft size={26} /></button>
          <Img src={images[full]} alt={`${name} photo ${full + 1}`} className="lightbox__img" />
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next photo"><ChevronRight size={26} /></button>
          <span className="lightbox__count">{full + 1} / {images.length}</span>
        </div>
        <div className="lightbox__strip">
          {images.map((src, i) => (
            <button type="button" key={src + i} className={i === full ? 'is-active' : ''} onClick={() => setFull(i)} aria-label={`Photo ${i + 1}`}><Img src={src} alt="" /></button>
          ))}
        </div>
      </Modal>
    </>
  );
}
