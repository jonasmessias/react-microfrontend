import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-microshop-yellow-bright hover:bg-microshop-yellow-bright-hover active:bg-microshop-yellow-bright-active border border-microshop-yellow-bright-border shadow-sm text-gray-900 font-medium',
  secondary:
    'bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300 shadow-sm text-gray-900 font-medium',
  link: 'text-microshop-link hover:text-microshop-link-hover hover:underline',
};

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass = VARIANT_CLASSES[variant];
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const baseClass = variant === 'link' ? '' : 'text-sm py-2 px-4 rounded-lg transition-colors duration-150';

  const classes = `${baseClass} ${variantClass} ${widthClass} ${disabledClass} ${className}`.trim();

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
