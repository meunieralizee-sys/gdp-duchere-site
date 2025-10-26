/**
 * Convertisseur Markdown simple en JavaScript pur
 * Supporte les fonctionnalités de base sans dépendances externes
 */

export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Échapper les caractères HTML pour éviter les injections
  html = html.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;');

  // Titres (H1 à H6)
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Gras (**texte** ou __texte__)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italique (*texte* ou _texte_)
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Liens [texte](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Code inline `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Listes non ordonnées
  html = html.replace(/^\s*[-*+]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Listes ordonnées
  html = html.replace(/^\s*\d+\.\s+(.+)$/gm, '<li>$1</li>');
  
  // Citations (> texte)
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

  // Ligne horizontale (---, ***, ___)
  html = html.replace(/^(---|\*\*\*|___)$/gm, '<hr />');

  // Paragraphes (lignes vides)
  const lines = html.split('\n');
  const paragraphs: string[] = [];
  let currentParagraph = '';

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Si c'est une ligne vide et qu'on a du contenu
    if (trimmedLine === '' && currentParagraph !== '') {
      // Ne pas wrapper les éléments HTML existants
      if (!currentParagraph.match(/^<(h[1-6]|ul|ol|blockquote|hr|li)/)) {
        paragraphs.push(`<p>${currentParagraph}</p>`);
      } else {
        paragraphs.push(currentParagraph);
      }
      currentParagraph = '';
    } 
    // Si c'est une ligne avec du contenu
    else if (trimmedLine !== '') {
      if (currentParagraph !== '') {
        currentParagraph += '<br />';
      }
      currentParagraph += trimmedLine;
    }
  }

  // Ajouter le dernier paragraphe s'il existe
  if (currentParagraph !== '') {
    if (!currentParagraph.match(/^<(h[1-6]|ul|ol|blockquote|hr|li)/)) {
      paragraphs.push(`<p>${currentParagraph}</p>`);
    } else {
      paragraphs.push(currentParagraph);
    }
  }

  html = paragraphs.join('\n');

  return html;
}

