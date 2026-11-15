'use client';
import { useState } from 'react';

const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"><rect width="800" height="600" fill="#e6e2da"/><path d="M0 460 L220 280 L360 380 L520 220 L800 440 L800 600 L0 600Z" fill="#d8d3c8"/><circle cx="600" cy="150" r="44" fill="#f0ede6"/></svg>'
  );

// Image with graceful fallback so a failed remote photo never leaves a broken icon
export default function Img({ src, alt = '', className, priority = false, ...rest }) {
  const [failed, setFailed] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? FALLBACK : src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
