import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface Page {
  slug: string;
  title: string;
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    // Récupérer la liste des pages depuis le CMS
    const loadPages = async () => {
      try {
        // Charger le fichier pages.json qui sera généré automatiquement
        const response = await fetch('/content/pages.json');
        if (response.ok) {
          const data = await response.json();
          setPages(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des pages:', error);
      }
    };

    loadPages();
  }, []);

  return (
    <header className="bg-gradient-to-r from-orange-600 via-purple-600 to-violet-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-4 hover:opacity-90 transition">
            <img src="/logo-gdp.png" alt="Groupe de Pairs" className="h-16 w-auto rounded-lg shadow-md" />
            <div>
              <h1 className="text-2xl font-bold">Groupe de Pairs</h1>
              <p className="text-sm text-purple-100">Coordination 16/25 ans - Duchère</p>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <a href="/" className="hover:text-purple-200 transition">Accueil</a>
            
            {/* Pages du CMS */}
            {pages.map((page) => (
              <a 
                key={page.slug}
                href={`/pages/${page.slug}`} 
                className="hover:text-purple-200 transition"
              >
                {page.title}
              </a>
            ))}
            
            <a href="/admin" className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-semibold">
              Admin
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            <a 
              href="/" 
              className="hover:text-purple-200 transition py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </a>
            
            {/* Pages du CMS */}
            {pages.map((page) => (
              <a 
                key={page.slug}
                href={`/pages/${page.slug}`} 
                className="hover:text-purple-200 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {page.title}
              </a>
            ))}
            
            <a 
              href="/admin" 
              className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-semibold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

