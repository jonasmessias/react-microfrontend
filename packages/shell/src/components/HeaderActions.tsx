export interface HeaderActionsProps {
  cartItemCount: number;
}

export function HeaderActions({ cartItemCount }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
        <div className="flex flex-col leading-tight text-xs">
          <span className="text-gray-300">Olá, Visitante</span>
          <span className="font-bold">Conta e Listas</span>
        </div>
      </div>

      <div className="px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
        <div className="flex flex-col leading-tight text-xs">
          <span className="text-gray-300">Devoluções</span>
          <span className="font-bold">e Pedidos</span>
        </div>
      </div>

      <div className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors relative">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {cartItemCount > 0 && (
          <span className="absolute top-0 right-0 bg-microshop-orange-dark text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartItemCount}
          </span>
        )}
        <span className="font-bold text-sm ml-1">Carrinho</span>
      </div>
    </div>
  );
}
