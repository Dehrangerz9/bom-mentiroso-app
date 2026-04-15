import React from 'react';

interface AvatarProps {
  /** URL or imported image path for the avatar */
  src: string;
  alt: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const SIZE_CLASSES = {
  small: 'w-12 h-12',
  medium: 'w-24 h-24',
  large: 'w-32 h-32',
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'medium', className = '' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full object-cover shrink-0 ${SIZE_CLASSES[size]} ${className}`}
    />
  );
};

export default Avatar;
