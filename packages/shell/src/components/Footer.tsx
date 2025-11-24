interface FooterProps {
  onScrollToTop: () => void;
}

const FOOTER_SECTIONS = [
  {
    title: 'Conheça-nos',
    links: ['Carreiras', 'Blog', 'Sobre o MicroShop', 'Relações com Investidores'],
  },
  {
    title: 'Ganhe Dinheiro',
    links: ['Venda na MicroShop', 'Anuncie seus produtos', 'Publique seu livro', 'Seja afiliado'],
  },
  {
    title: 'Pagamento',
    links: ['Cartões de crédito', 'Cartões de débito', 'Pix', 'Boleto'],
  },
  {
    title: 'Deixe-nos ajudá-lo',
    links: ['Sua conta', 'Frete e prazo de entrega', 'Devoluções e reembolsos', 'Ajuda'],
  },
] as const;

export function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer className="bg-microshop-blue text-white mt-12">
      <button
        onClick={onScrollToTop}
        className="w-full bg-microshop-blue-light hover:bg-microshop-blue-hover text-center py-3 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-microshop-orange focus:ring-inset"
        aria-label="Voltar ao topo"
      >
        <span className="text-sm font-medium">Voltar ao topo</span>
      </button>

      <div className="max-w-[1500px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-3">{section.title}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link) => (
                  <li key={link} className="hover:underline cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-microshop-dark py-6">
        <div className="max-w-[1500px] mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🏪</span>
            <span className="text-lg font-bold">MicroShop</span>
          </div>
          <p className="text-xs text-gray-400">
            © 2025 MicroShop - Demonstração de Microfrontends com Module Federation
          </p>
          <p className="text-xs text-gray-500 mt-2">
            React 18.3.1 + TypeScript + Tailwind CSS + Zustand
          </p>
        </div>
      </div>
    </footer>
  );
}
