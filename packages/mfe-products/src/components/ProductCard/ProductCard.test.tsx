import { fireEvent, render, screen } from '@testing-library/react';
import { Product } from '../../types/product';
import { EventBus } from '../../utils/eventBus';
import { ProductCard } from './ProductCard';

// Mock EventBus
jest.mock('../../utils/eventBus', () => ({
  EventBus: {
    emit: jest.fn(),
  },
}));

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
  image: 'https://test.com/image.jpg',
  category: 'Test Category',
  description: 'Test description',
};

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', mockProduct.image);
  });

  it('should display product price correctly', () => {
    render(<ProductCard product={mockProduct} />);

    // Price should be formatted and displayed
    const priceElement = screen.getByText('99');
    expect(priceElement).toBeInTheDocument();
  });

  it('should have "Adicionar ao carrinho" button', () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: /adicionar ao carrinho/i });
    expect(addButton).toBeInTheDocument();
  });

  it('should emit cart:add-item event when clicking add to cart', () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole('button', { name: /adicionar ao carrinho/i });
    fireEvent.click(addButton);

    expect(EventBus.emit).toHaveBeenCalledWith('cart:add-item', {
      product: mockProduct,
      quantity: 1,
    });
  });

  it('should display rating stars', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    // Check that stars are rendered (5 stars) - they are SVGs, not img tags
    const stars = container.querySelectorAll('svg[viewBox="0 0 20 20"]');
    expect(stars).toHaveLength(5);
  });

  it('should display free shipping text', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/frete grátis/i)).toBeInTheDocument();
  });

  it('should have hover effect classes', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const card = container.firstChild;
    expect(card).toHaveClass('hover:shadow-lg');
  });
});
