import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { parseMarkdownEnhanced } from "@/utils/markdownParserEnhanced";
import Navigation from "@/components/Navigation";

interface PageData {
  title: string;
  date: string;
  description?: string;
  body: string;
  featured_image?: string;
}

export default function CMSPage() {
  const [, params] = useRoute("/pages/:slug");
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params?.slug) return;

    const loadPage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Charger le fichier markdown depuis le dossier public/content
        const response = await fetch(`/content/${params.slug}.md`);
        
        if (!response.ok) {
          throw new Error("Page non trouvée");
        }

        const content = await response.text();
        
        // Parser le frontmatter (métadonnées en haut du fichier)
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(frontmatterRegex);

        if (!match) {
          throw new Error("Format de page invalide");
        }

        const frontmatter = match[1];
        const body = match[2];

        // Parser les métadonnées
        const metadata: any = {};
        frontmatter.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            metadata[key.trim()] = valueParts.join(':').trim();
          }
        });

        setPageData({
          title: metadata.title || "Sans titre",
          date: metadata.date || "",
          description: metadata.description || "",
          featured_image: metadata.featured_image || "",
          body: body.trim()
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [params?.slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Page non trouvée</h1>
            <p className="text-gray-600 mb-6">{error || "Cette page n'existe pas"}</p>
            <a 
              href="/" 
              className="inline-block bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Convertir le Markdown en HTML avec le parser amélioré
  const htmlContent = parseMarkdownEnhanced(pageData.body, pageData.title);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <Navigation />
      
      {/* Header avec image si disponible */}
      {pageData.featured_image && (
        <div className="w-full h-64 md:h-96 overflow-hidden">
          <img 
            src={pageData.featured_image} 
            alt={pageData.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* En-tête de l'article */}
          <header className="mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              {pageData.title}
            </h1>
            
            {pageData.description && (
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                {pageData.description}
              </p>
            )}
            
            {pageData.date && (
              <time className="text-sm text-gray-500 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(pageData.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </header>
          
          {/* Contenu Markdown formaté */}
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-bold 
              prose-h1:text-4xl prose-h1:mb-4 prose-h1:text-gray-800
              prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-8 prose-h2:text-orange-600
              prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-6 prose-h3:text-purple-600
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-orange-600 prose-strong:font-bold
              prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
              prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
              prose-li:text-gray-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-purple-600
              prose-img:rounded-lg prose-img:shadow-md
            "
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Bouton retour */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à l'accueil
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

