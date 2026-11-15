'use client';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistButton({ type, slug, label, variant = 'floating', showText = false }) {
  const { has, toggle } = useWishlist();
  const saved = has(type, slug);
  return (
    <button
      type="button"
      className={`wish-btn wish-btn--${variant} ${saved ? 'is-saved' : ''}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from wishlist` : `Save ${label} to wishlist`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(type, slug, label);
      }}
    >
      <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
      {showText && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  );
}
