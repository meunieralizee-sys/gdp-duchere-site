# Configuration du site GDP Duchère

## ✅ Fichiers créés et corrigés

### 1. Configuration Netlify (`netlify.toml`)
- Commande de build configurée : `npm run build`
- Dossier de publication : `dist/public`
- Redirections SPA configurées
- Headers de sécurité ajoutés

### 2. Configuration Decap CMS
- `client/public/admin/config.yml` : Configuration complète du CMS
- `client/public/admin/index.html` : Interface d'administration
- Dossier `client/public/uploads/` : Pour stocker les images uploadées

## 🚀 Prochaines étapes

### Étape 1 : Activer Netlify Identity (pour l'authentification au CMS)

1. Connectez-vous à votre dashboard Netlify : https://app.netlify.com
2. Sélectionnez votre site "gdp-duchere"
3. Allez dans **Site configuration** → **Identity**
4. Cliquez sur **Enable Identity**
5. Dans **Registration preferences**, choisissez **Invite only** (pour que seuls les utilisateurs invités puissent se connecter)
6. Dans **External providers**, activez **GitHub** si vous voulez vous connecter avec votre compte GitHub
7. Dans **Services** → **Git Gateway**, cliquez sur **Enable Git Gateway**

### Étape 2 : Vous inviter comme administrateur

1. Toujours dans **Identity**, cliquez sur **Invite users**
2. Entrez votre adresse email
3. Vous recevrez un email d'invitation
4. Cliquez sur le lien dans l'email pour créer votre mot de passe

### Étape 3 : Résoudre le problème SSL

1. Dans votre dashboard Netlify, allez dans **Domain management**
2. Vérifiez que votre domaine `gdp-duchere.fr` est bien configuré
3. Si le certificat SSL n'est pas actif :
   - Cliquez sur **Verify DNS configuration**
   - Puis sur **Renew certificate** ou **Provision certificate**
4. Attendez quelques minutes que le certificat soit activé

### Étape 4 : Vérifier la configuration DNS chez LWS

Assurez-vous que les enregistrements DNS chez LWS pointent bien vers Netlify :

**Pour un domaine apex (gdp-duchere.fr) :**
- Type : `A`
- Nom : `@`
- Valeur : `75.2.60.5` (IP de Netlify)

**Pour le sous-domaine www :**
- Type : `CNAME`
- Nom : `www`
- Valeur : `[votre-site].netlify.app`

## 📝 Accéder à l'interface admin

Une fois Netlify Identity activé et le site redéployé :
1. Allez sur : `https://gdp-duchere.fr/admin/`
2. Connectez-vous avec votre email et mot de passe
3. Vous pourrez éditer le contenu de votre site !

## 🔧 Développement local

Pour tester le CMS en local :
```bash
npm install
npm run dev
```

Puis accédez à : `http://localhost:3000/admin/`

## ⚠️ Important

- Les modifications faites dans le CMS seront automatiquement commitées sur GitHub
- Chaque modification déclenchera un nouveau déploiement sur Netlify
- Pensez à supprimer le token GitHub après la configuration initiale pour plus de sécurité

