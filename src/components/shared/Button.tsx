import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base = 'w-full px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100';
  const variants = {
    primary:   'bg-accent text-gray-900 hover:bg-accent-dim shadow-md',
    secondary: 'bg-surface-overlay text-gray-200 hover:bg-border border border-border',
    ghost:     'text-gray-400 hover:text-gray-200 hover:bg-surface-overlay',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
