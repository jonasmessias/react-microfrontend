export function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-colors">
        <span className="text-2xl font-bold">🏪</span>
        <div className="flex flex-col leading-tight">
          <span className="text-xs text-gray-300">Bem-vindo ao</span>
          <span className="text-sm font-bold">MicroShop</span>
        </div>
      </div>
    </div>
  );
}
