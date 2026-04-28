import { useState } from 'react';

interface Props { image: string; size?: number; }

export function NBALogo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center font-black text-red-500 uppercase tracking-tighter" style={{ fontSize: size * 0.4 }}>
      CAPS
    </div>
  );
}

export function FacebookIcon({ size = 20, className = "" }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
    </svg>
  );
}

export function InstagramIcon({ size = 20, className = "" }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 7.002c-2.757 0-4.998 2.24-4.998 4.998s2.241 4.998 4.998 4.998 4.998-2.24 4.998-4.998-2.241-4.998-4.998-4.998zm0 8.295c-1.817 0-3.296-1.478-3.296-3.297 0-1.819 1.479-3.297 3.296-3.297 1.817 0 3.296 1.478 3.296 3.297 0 1.819-1.479 3.297-3.296 3.297z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18.169 5.831c.655 0 1.185.53 1.185 1.185 0 .654-.53 1.185-1.185 1.185a1.186 1.186 0 01-1.185-1.185c0-.655.53-1.185 1.185-1.185z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 12c0-4.596 0-6.894 1.435-8.328C4.87 2.238 7.168 2.238 11.765 2.238h.47c4.597 0 6.895 0 8.33 1.434C22 5.106 22 7.404 22 12s0 6.894-1.435 8.328C19.13 21.762 16.832 21.762 12.235 21.762h-.47c-4.597 0-6.895 0-8.33-1.434C2 18.894 2 16.596 2 12zm2.036 0c0 3.945.003 5.485.91 6.392.908.908 2.447.91 6.392.91h1.324c3.945 0 5.484-.002 6.391-.91.908-.907.91-2.447.91-6.392v-1.324c0-3.945-.002-5.484-.91-6.391-.907-.908-2.447-.91-6.391-.91h-1.324c-3.945 0-5.485.003-6.392.91-.907.908-.91 2.447-.91 6.392V12z" fill="currentColor"/>
    </svg>
  );
}

const IMG_MAP: Record<string, string> = {
  bulls: '/caps/bulls.jpg',
  lakers: '/caps/lakers.jpg',
  celtics: '/caps/celtics.jpg',
  warriors: '/caps/warriors.jpg',
  knicks: '/caps/knicks.jpg',
  heat: '/caps/heat.jpg',
  spurs: '/caps/spurs.jpg',
  raptors: '/caps/raptors.jpg',
  suns: '/caps/suns.jpg',
  bucks: '/caps/bucks.jpg',
  magic: '/caps/magic.svg',
  rockets: '/caps/rockets.svg',
};

function FallbackSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="#000"/>
      <ellipse cx="100" cy="120" rx="70" ry="20" fill="#111"/>
      <ellipse cx="100" cy="90" rx="55" ry="45" fill="#222"/>
      <circle cx="100" cy="55" r="6" fill="#111"/>
      <text x="100" y="170" textAnchor="middle" fill="#444" fontSize="14" fontWeight="bold">🧢</text>
    </svg>
  );
}

export function getImageSrc(image: string): string | null {
  // If it's a base64 data URL or http URL, use directly
  if (image.startsWith('data:') || image.startsWith('http')) return image;
  // Otherwise look up built-in image
  return IMG_MAP[image] || null;
}

export default function TeamLogo({ image, size = 48 }: Props) {
  const [error, setError] = useState(false);
  const src = getImageSrc(image);

  if (!src || error) {
    return (
      <div
        className="rounded-lg overflow-hidden flex-shrink-0 bg-stone-800"
        style={{ width: size, height: size }}
      >
        <FallbackSVG size={size} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${image} cap`}
      width={size}
      height={size}
      className="rounded-lg object-cover flex-shrink-0"
      style={{ width: size, height: size }}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
