import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('should render icon, title and description', () => {
    render(
      <EmptyState
        icon={<div data-testid="custom-icon">Icon</div>}
        title="No results"
        description="Try another search"
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try another search')).toBeInTheDocument();
  });

  it('should render action button when provided', () => {
    const handleAction = jest.fn();

    render(
      <EmptyState
        icon={<div>Icon</div>}
        title="Empty"
        description="No items"
        actionLabel="Add items"
        onAction={handleAction}
      />
    );

    const button = screen.getByRole('button', { name: 'Add items' });
    expect(button).toBeInTheDocument();
  });

  it('should call onAction when button is clicked', async () => {
    const handleAction = jest.fn();
    const user = userEvent.setup();

    render(
      <EmptyState
        icon={<div>Icon</div>}
        title="Empty"
        description="No items"
        actionLabel="Click me"
        onAction={handleAction}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('should not render action button when not provided', () => {
    render(<EmptyState icon={<div>Icon</div>} title="Empty" description="No items" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
