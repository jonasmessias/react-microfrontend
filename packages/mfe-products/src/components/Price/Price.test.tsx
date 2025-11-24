import { render, screen } from '@testing-library/react';
import { Price } from './Price';

describe('Price', () => {
  it('should split and display price correctly', () => {
    render(<Price value={99.99} />);

    expect(screen.getByText('99')).toBeInTheDocument();
    expect(screen.getByText(',99')).toBeInTheDocument();
  });

  it('should handle integer prices', () => {
    render(<Price value={100} />);

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText(',00')).toBeInTheDocument();
  });

  it('should display currency symbol', () => {
    render(<Price value={50.5} />);

    expect(screen.getByText('R$')).toBeInTheDocument();
  });

  it('should apply custom size class when provided', () => {
    const { container } = render(<Price value={99.99} size="large" />);
    const integerPart = screen.getByText('99');

    expect(integerPart).toHaveClass('text-3xl');
  });

  it('should use default size when not provided', () => {
    const { container } = render(<Price value={99.99} />);
    const integerPart = screen.getByText('99');

    expect(integerPart).toHaveClass('text-2xl');
  });
});
