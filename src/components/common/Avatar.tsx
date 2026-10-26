import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  online?: boolean;
}

const sizeClasses = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-28 h-28 text-2xl',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
  online,
}) => {
  const [imageError, setImageError] = useState(false);

  // Derive initials
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const baseSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`relative inline-block shrink-0 ${baseSize} ${className}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover rounded-2xl ring-1 ring-white/10"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 flex items-center justify-center font-bold text-white shadow-inner ring-1 ring-white/10">
          {initials}
        </div>
      )}

      {/* Online indicator badge only if specified */}
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-[#08080C] ${
            online ? 'bg-emerald-500' : 'bg-zinc-600'
          }`}
          title={online ? 'Online' : 'Offline'}
        />
      )}
    </div>
  );
};
