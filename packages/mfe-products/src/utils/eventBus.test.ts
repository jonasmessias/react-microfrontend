import { CartAddItemEvent, EventBus } from './eventBus';

describe('EventBus (Products)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should emit and receive events', () => {
    const handler = jest.fn();
    const testData = { test: 'data' };

    EventBus.on('test:event', handler);
    EventBus.emit('test:event', testData);

    expect(handler).toHaveBeenCalledWith(testData);
  });

  it('should emit cart:add-item event with product data', () => {
    const handler = jest.fn();
    const cartData: CartAddItemEvent = {
      product: {
        id: '1',
        name: 'Test Product',
        price: 100,
        image: 'https://test.com/image.jpg',
        category: 'Test',
        description: 'Test description',
      },
      quantity: 1,
    };

    EventBus.on<CartAddItemEvent>('cart:add-item', handler);
    EventBus.emit<CartAddItemEvent>('cart:add-item', cartData);

    expect(handler).toHaveBeenCalledWith(cartData);
  });

  it('should return cleanup function', () => {
    const handler = jest.fn();

    const cleanup = EventBus.on('test:event', handler);

    EventBus.emit('test:event', { test: 'data' });
    expect(handler).toHaveBeenCalledTimes(1);

    cleanup();

    EventBus.emit('test:event', { test: 'data' });
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should handle product:search event', () => {
    const handler = jest.fn();
    const searchData = {
      searchTerm: 'laptop',
      category: 'Eletrônicos',
    };

    EventBus.on('product:search', handler);
    EventBus.emit('product:search', searchData);

    expect(handler).toHaveBeenCalledWith(searchData);
  });

  it('should handle product:search:clear event', () => {
    const handler = jest.fn();

    EventBus.on('product:search:clear', handler);
    EventBus.emit('product:search:clear', {});

    expect(handler).toHaveBeenCalled();
  });
});
