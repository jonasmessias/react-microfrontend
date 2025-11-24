import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render button with children', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-microshop-yellow-bright');
  });

  it('should apply secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('border-gray-300');
  });

  it('should apply link variant classes', () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('text-microshop-link');
    expect(button).toHaveClass('hover:underline');
  });

  it('should apply fullWidth class when specified', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('w-full');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
