/**
 * Convertisseur Markdown amélioré avec support des cartes d'action
 */

export function parseMarkdownEnhanced(markdown: string, pageTitle?: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Échapper les caractères HTML pour éviter les injections
  html = html.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;');

  // Détecter si c'est une page "Nos actions" ou similaire
  const isActionsPage = pageTitle?.toLowerCase().includes('action') || 
                        markdown.toLowerCase().includes('marrainage') ||
                        markdown.toLowerCase().includes('t\'change') ||
                        markdown.toLowerCase().includes('chantier');

  if (isActionsPage) {
    // Parser spécial pour les pages d'actions avec cartes
    html = parseActionsWithCards(html);
  } else {
    // Parser standard
    html = parseStandardMarkdown(html);
  }

  return html;
}

function parseActionsWithCards(markdown: string): string {
  let html = markdown;

  // Couleurs alternées pour les cartes
  const colors = ['#ea580c', '#9333ea']; // Orange et violet
  const icons = ['❤️', '📅', '👥', '🎯', '🌟', '💡']; // Icônes variées
  
  // Diviser le contenu en sections basées sur les titres H2
  const sections = html.split(/^##\s+/gm);
  const processedSections: string[] = [];

  sections.forEach((section, index) => {
    if (index === 0 && section.trim() === '') return; // Ignorer la première section vide

    const lines = section.split('\n');
    const title = lines[0].trim();
    const content = lines.slice(1).join('\n').trim();

    if (!title) return;

    // Choisir une couleur et une icône
    const colorIndex = (index - 1) % colors.length;
    const iconIndex = (index - 1) % icons.length;
    const color = colors[colorIndex];
    const icon = icons[iconIndex];

    // Parser le contenu de la section
    let parsedContent = content;

    // Gras
    parsedContent = parsedContent.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    parsedContent = parsedContent.replace(/__(.+?)__/g, '<strong>$1</strong>');

    // Italique
    parsedContent = parsedContent.replace(/\*(.+?)\*/g, '<em>$1</em>');
    parsedContent = parsedContent.replace(/_(.+?)_/g, '<em>$1</em>');

    // Liens - détecter les liens qui doivent devenir des boutons
    const buttonRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let hasButton = false;
    let buttonHtml = '';
    
    parsedContent = parsedContent.replace(buttonRegex, (match, text, url) => {
      hasButton = true;
      buttonHtml = `<a href="${url}" style="color: ${color}; text-decoration: none; border: 2px solid ${color}; padding: 8px 16px; border-radius: 6px; display: inline-block; margin-top: 10px; font-weight: 600; transition: all 0.3s;">${text}</a>`;
      return ''; // Retirer le lien du contenu principal
    });

    // Listes
    parsedContent = parsedContent.replace(/^\s*[-*+]\s+(.+)$/gm, '<li style="margin-bottom: 8px; color: #4b5563;">$1</li>');
    if (parsedContent.includes('<li')) {
      parsedContent = parsedContent.replace(/(<li.*<\/li>)/s, '<ul style="margin: 10px 0; padding-left: 20px;">$1</ul>');
    }

    // Paragraphes
    const contentLines = parsedContent.split('\n').filter(l => l.trim());
    const paragraphs = contentLines.map(line => {
      if (line.includes('<li') || line.includes('<ul') || line.includes('<strong>') && line.startsWith('<strong>')) {
        return line;
      }
      return `<p style="color: #4b5563; margin-bottom: 10px; line-height: 1.6;">${line}</p>`;
    }).join('\n');

    // Créer la carte
    const card = `
      <div style="border-left: 4px solid ${color}; padding: 20px; background: white; border-radius: 8px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h3 style="color: ${color}; margin-bottom: 12px; font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.8rem;">${icon}</span>
          ${title}
        </h3>
        <div style="margin-top: 12px;">
          ${paragraphs}
        </div>
        ${hasButton ? buttonHtml : ''}
      </div>
    `;

    processedSections.push(card);
  });

  return processedSections.join('\n');
}

function parseStandardMarkdown(markdown: string): string {
  let html = markdown;

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
    
    if (trimmedLine === '' && currentParagraph !== '') {
      if (!currentParagraph.match(/^<(h[1-6]|ul|ol|blockquote|hr|li)/)) {
        paragraphs.push(`<p>${currentParagraph}</p>`);
      } else {
        paragraphs.push(currentParagraph);
      }
      currentParagraph = '';
    } 
    else if (trimmedLine !== '') {
      if (currentParagraph !== '') {
        currentParagraph += '<br />';
      }
      currentParagraph += trimmedLine;
    }
  }

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

