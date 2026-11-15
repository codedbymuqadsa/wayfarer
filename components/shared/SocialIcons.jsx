// Minimal brand glyphs (lucide v1 no longer ships brand icons)
const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export const InstagramIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" /></svg>
);
export const FacebookIcon = (p) => (
  <svg {...base} {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>
);
export const XIcon = (p) => (
  <svg {...base} {...p}><path d="M4 4l16 16M20 4L4 20" /></svg>
);
export const YoutubeIcon = (p) => (
  <svg {...base} {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" /></svg>
);

export const socials = [
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://instagram.com' },
  { label: 'Facebook', Icon: FacebookIcon, href: 'https://facebook.com' },
  { label: 'X', Icon: XIcon, href: 'https://x.com' },
  { label: 'YouTube', Icon: YoutubeIcon, href: 'https://youtube.com' },
];
