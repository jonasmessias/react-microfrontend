/**
 * EventBus - Communication utility for this MFE
 */
export class EventBus {
  static emit<T>(eventName: string, detail: T): void {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }

  static on<T>(eventName: string, handler: (detail: T) => void): () => void {
    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<T>;
      handler(customEvent.detail);
    };

    window.addEventListener(eventName, listener);
    return () => window.removeEventListener(eventName, listener);
  }
}

// Event payload types
export interface CartAddItemEvent {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
  };
  quantity: number;
}
