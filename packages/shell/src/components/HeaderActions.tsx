import { CartIcon } from './Icons';

export interface HeaderActionsProps {
  cartItemCount: number;
}

export function HeaderActions({ cartItemCount }: HeaderActionsProps) {
  const hasItems = cartItemCount > 0;

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
        <CartIcon className="w-8 h-8" />
        {hasItems && (
          <span className="absolute top-0 right-0 bg-microshop-orange-dark text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartItemCount}
          </span>
        )}
        <span className="font-bold text-sm ml-1">Carrinho</span>
      </div>
    </div>
  );
}
