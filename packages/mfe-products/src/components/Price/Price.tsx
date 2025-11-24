import { splitPrice } from '../../lib/helpers';

interface PriceProps {
  value: number;
  size?: 'small' | 'medium' | 'large';
}

const SIZE_CLASSES = {
  small: 'text-xl',
  medium: 'text-2xl',
  large: 'text-3xl',
};

export function Price({ value, size = 'medium' }: PriceProps) {
  const { integer, decimal } = splitPrice(value);
  const sizeClass = SIZE_CLASSES[size];

  return (
    <div className="flex items-baseline">
      <span className="text-xs align-super text-gray-700 mr-1">R$</span>
      <span className={`${sizeClass} font-normal text-gray-900`}>{integer}</span>
      <span className="text-xs text-gray-700">,{decimal}</span>
    </div>
  );
}
