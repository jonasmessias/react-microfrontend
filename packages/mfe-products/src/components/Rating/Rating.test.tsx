import { render, screen } from '@testing-library/react';
import { Rating } from './Rating';

describe('Rating', () => {
  it('should render correct number of filled stars', () => {
    const { container } = render(<Rating rating={3.5} reviewCount={100} />);
    const stars = container.querySelectorAll('svg');

    expect(stars).toHaveLength(5);
  });

  it('should display rating value', () => {
    render(<Rating rating={4.2} reviewCount={500} />);

    expect(screen.getByText('4.2')).toBeInTheDocument();
  });

  it('should display formatted review count', () => {
    render(<Rating rating={4.5} reviewCount={1500} />);

    expect(screen.getByText('(1,500)')).toBeInTheDocument();
  });

  it('should apply correct filled star color class', () => {
    const { container } = render(<Rating rating={4} reviewCount={100} />);
    const firstStar = container.querySelectorAll('svg')[0];

    expect(firstStar).toHaveClass('text-[#ffa541]');
  });

  it('should apply correct empty star color class', () => {
    const { container } = render(<Rating rating={2} reviewCount={100} />);
    const lastStar = container.querySelectorAll('svg')[4];

    expect(lastStar).toHaveClass('text-gray-300');
  });
});
