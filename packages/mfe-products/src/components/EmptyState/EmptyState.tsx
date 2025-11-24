import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
      <div className="w-24 h-24 mx-auto text-gray-300 mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-microshop-link hover:text-microshop-link-hover hover:underline"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
