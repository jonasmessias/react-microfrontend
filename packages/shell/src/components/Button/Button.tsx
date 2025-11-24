import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-microshop-yellow hover:bg-microshop-yellow-hover active:bg-microshop-yellow text-gray-900 font-medium transition-colors',
  secondary:
    'bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-300 text-gray-900 font-medium transition-colors',
  link: 'bg-transparent border-0 shadow-none text-microshop-yellow-bright hover:text-microshop-yellow hover:underline p-0 transition-colors',
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

  const classes =
    `text-sm px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-microshop-orange ${variantClass} ${widthClass} ${disabledClass} ${className}`.trim();

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
