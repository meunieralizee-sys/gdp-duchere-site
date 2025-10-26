import { useEffect, useState } from "react";
import { useRoute } from "wouter";

interface PageData {
  title: string;
  date: string;
  description?: string;
  body: string;
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page non trouvée</h1>
          <p className="text-muted-foreground mb-6">{error || "Cette page n'existe pas"}</p>
          <a href="/" className="text-primary hover:underline">Retour à l'accueil</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="prose prose-lg dark:prose-invert mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{pageData.title}</h1>
            {pageData.description && (
              <p className="text-xl text-muted-foreground mb-4">{pageData.description}</p>
            )}
            {pageData.date && (
              <time className="text-sm text-muted-foreground">
                {new Date(pageData.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </header>
          
          <div className="prose-content whitespace-pre-wrap">
            {pageData.body}
          </div>
        </article>
      </div>
    </div>
  );
}

