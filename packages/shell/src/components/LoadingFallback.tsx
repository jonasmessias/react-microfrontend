interface LoadingFallbackProps {
  text: string;
}

export function LoadingFallback({ text }: LoadingFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-microshop-orange-dark rounded-full animate-spin mb-4" />
      <p className="text-base font-medium text-gray-600">{text}</p>
    </div>
  );
}
