import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le dossier content
const contentDir = path.join(__dirname, '../client/public/content');
const outputFile = path.join(contentDir, 'pages.json');

// Fonction pour extraire le titre du frontmatter
function extractTitle(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return null;
  
  const frontmatter = match[1];
  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  
  return titleMatch ? titleMatch[1].trim() : null;
}

// Lire tous les fichiers .md dans le dossier content
function generatePagesIndex() {
  try {
    const files = fs.readdirSync(contentDir);
    const pages = [];

    files.forEach(file => {
      if (file.endsWith('.md') && file !== 'home.md') {
        const filePath = path.join(contentDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const title = extractTitle(content);
        
        if (title) {
          const slug = file.replace('.md', '');
          pages.push({ slug, title });
        }
      }
    });

    // Écrire le fichier pages.json
    fs.writeFileSync(outputFile, JSON.stringify(pages, null, 2));
    console.log(`✅ pages.json généré avec ${pages.length} page(s)`);
  } catch (error) {
    console.error('❌ Erreur lors de la génération de pages.json:', error);
    process.exit(1);
  }
}

generatePagesIndex();

