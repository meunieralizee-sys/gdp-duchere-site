import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Page {
  slug: string;
  title: string;
  description?: string;
  date?: string;
}

export default function Home() {
  const [recentPages, setRecentPages] = useState<Page[]>([]);

  useEffect(() => {
    // Charger les pages récentes
    const loadRecentPages = async () => {
      try {
        const response = await fetch('/content/pages.json');
        if (response.ok) {
          const pages = await response.json();
          // Prendre les 3 dernières pages
          setRecentPages(pages.slice(-3).reverse());
        }
      } catch (error) {
        console.error('Erreur lors du chargement des pages:', error);
      }
    };

    loadRecentPages();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(234, 88, 12, 0.8), rgba(147, 51, 234, 0.8)), url(/duchere-aerien.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Accompagner les jeunes de 16 à 25 ans sur le quartier de la Duchère
            </h2>
            <p className="text-xl mb-8">
              Une coordination partenariale pour l'insertion sociale et professionnelle des jeunes Duchérois
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <a href="/pages/contact">Nous contacter</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <a href="/pages/presentation">En savoir plus</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dernières publications */}
      {recentPages.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Dernières publications</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {recentPages.map((page) => (
                <Card key={page.slug} className="border-purple-200 hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-orange-600">
                      <a href={`/pages/${page.slug}`} className="hover:underline">
                        {page.title}
                      </a>
                    </CardTitle>
                    {page.description && (
                      <CardDescription>{page.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {page.date && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        {new Date(page.date).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                    <a 
                      href={`/pages/${page.slug}`}
                      className="text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      Lire la suite →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Présentation rapide */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Bienvenue sur le site du Groupe de Pairs</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Le Groupe de Pairs est une coordination partenariale qui accompagne les jeunes de 16 à 25 ans 
              du quartier de la Duchère dans leur insertion sociale et professionnelle. Depuis 2006, nous 
              mobilisons les acteurs locaux pour répondre aux besoins des jeunes Duchérois.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-purple-600 text-white">
                <a href="/pages/presentation">Découvrir notre mission</a>
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                <a href="/pages/structures">Nos structures membres</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 via-purple-600 to-violet-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Groupe de Pairs</h3>
              <p className="text-purple-100">
                Coordination 16/25 ans - Quartier de la Duchère
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><a href="/pages/presentation" className="text-purple-100 hover:text-white transition">Présentation</a></li>
                <li><a href="/pages/structures" className="text-purple-100 hover:text-white transition">Structures</a></li>
                <li><a href="/pages/contact" className="text-purple-100 hover:text-white transition">Contact</a></li>
                <li><a href="/admin" className="text-purple-100 hover:text-white transition">Administration</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-purple-100">
                Mission Duchère<br />
                12 bis Place Gisèle Halimi<br />
                69009 Lyon
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-400 text-center text-purple-100">
            <p>&copy; {new Date().getFullYear()} Groupe de Pairs - Duchère. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

