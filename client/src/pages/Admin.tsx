import { useEffect } from "react";

export default function Admin() {
  useEffect(() => {
    // Charger le script Decap CMS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
    script.async = true;
    document.body.appendChild(script);

    // Charger le widget Netlify Identity
    const identityScript = document.createElement("script");
    identityScript.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
    identityScript.async = true;
    document.body.appendChild(identityScript);

    // Configuration de la redirection après login
    identityScript.onload = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on("init", (user: any) => {
          if (!user) {
            window.netlifyIdentity.on("login", () => {
              document.location.href = "/admin/";
            });
          }
        });
      }
    };

    return () => {
      // Nettoyage lors du démontage du composant
      document.body.removeChild(script);
      document.body.removeChild(identityScript);
    };
  }, []);

  return (
    <div>
      {/* Decap CMS sera injecté ici */}
    </div>
  );
}

// Déclaration TypeScript pour netlifyIdentity
declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

