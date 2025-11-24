import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <div className="w-24 h-24 mx-auto text-gray-300 mb-4">{icon}</div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
}
