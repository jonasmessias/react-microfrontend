export interface NavigationProps {
  className?: string;
}

const NAV_ITEMS = [
  { label: 'Mais Vendidos', href: '#' },
  { label: 'Ofertas do Dia', href: '#' },
  { label: 'Prime', href: '#' },
  { label: 'Atendimento ao Cliente', href: '#' },
  { label: 'Livros', href: '#' },
  { label: 'Eletrônicos', href: '#' },
] as const;

export function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={`px-4 py-2 w-full ${className}`}>
      <div className="max-w-[1500px] mx-auto flex items-center gap-6 text-sm">
        <button className="flex items-center gap-1 px-2 py-1 border border-transparent hover:border-white rounded transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="font-bold">Todos</span>
        </button>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="px-2 py-1 border border-transparent hover:border-white rounded transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
