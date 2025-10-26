import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MapPin, Phone, Users, Target, Calendar, Heart } from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";
import Navigation from "@/components/Navigation";

export default function Home() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    message: "",
    type: "general"
  });

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    alert(`Formulaire ${type} soumis ! (Fonctionnalité à implémenter)`);
  };

  const structures = [
    {
      nom: "ALTM",
      description: "Agence Lyon Tranquillité & Médiation",
      telephone: "04 26 53 16 48",
      adresse: "40 Boulevard de Balmont, 69009 Lyon",
      lat: 45.7885624,
      lng: 4.8012681
    },
    {
      nom: "Arc-en-Ciel",
      description: "École ÊTRE Rhône - Formation des jeunes",
      telephone: "06 25 71 45 72",
      adresse: "100 Rue des Fougères, 69009 Lyon",
      lat: 45.7797801,
      lng: 4.7951516
    },
    {
      nom: "Centre Social Duchère Plateau",
      description: "Animation de la vie sociale du quartier",
      telephone: "04 78 35 31 33",
      adresse: "235 Avenue du Plateau, 69009 Lyon",
      lat: 45.7831514,
      lng: 4.7946028
    },
    {
      nom: "Centre Social Sauvegarde",
      description: "Centre social de proximité",
      telephone: "04 78 35 77 47",
      adresse: "26 Avenue Rosa Parks, 69009 Lyon",
      lat: 45.7868333,
      lng: 4.7916342
    },
    {
      nom: "CIO",
      description: "Centre d'Information et d'Orientation",
      telephone: "04 78 47 82 47",
      adresse: "3 Square Averroès, 69009 Lyon",
      lat: 45.7873937,
      lng: 4.7942743
    },
    {
      nom: "Club Lyon La Duchère",
      description: "Football et insertion sociale",
      telephone: "04 78 31 02 01",
      adresse: "264 Avenue Andrei Sakharov, 69009 Lyon",
      lat: 45.7874306,
      lng: 4.7996219
    },
    {
      nom: "Le Lien Théâtre",
      description: "Médiation et création artistique",
      telephone: "04 69 16 08 86",
      adresse: "237 Rue des Érables, 69009 Lyon",
      lat: 45.7830051,
      lng: 4.7968241
    },
    {
      nom: "Le RePairs - AFEV",
      description: "Espace d'accueil et d'information jeunesse (Animateur)",
      telephone: "04 37 37 25 23",
      adresse: "20 Avenue du Plateau, 69009 Lyon",
      lat: 45.7841961,
      lng: 4.794268
    },
    {
      nom: "Mission Duchère",
      description: "Pilote du Groupe de Pairs - Grand Projet de Ville",
      telephone: "04 37 49 73 90",
      adresse: "12 bis Place Gisèle Halimi, 69009 Lyon",
      lat: 45.7863,
      lng: 4.7969
    },
    {
      nom: "Mission Locale Lyon",
      description: "Insertion professionnelle des jeunes (Animateur)",
      telephone: "04 72 56 99 99",
      adresse: "8 Place Gisèle Halimi, 69009 Lyon",
      lat: 45.7861928,
      lng: 4.7966915
    },
    {
      nom: "MJC Duchère",
      description: "Maison des Jeunes et de la Culture",
      telephone: "04 78 35 39 21",
      adresse: "237 Rue des Érables, 69009 Lyon",
      lat: 45.7830051,
      lng: 4.7968241
    },
    {
      nom: "Prévention Spécialisée - Métropole de Lyon",
      description: "Accompagnement de proximité pour les 10-25 ans (à partir de septembre 2025)",
      telephone: "",
      adresse: "454 Avenue de la Sauvegarde, 69009 Lyon",
      lat: 45.7874323,
      lng: 4.7901688
    },
    {
      nom: "Sport dans la Ville",
      description: "Insertion par le sport",
      telephone: "04 37 46 12 80",
      adresse: "15 Quai de la Gare d'Eau Bâtiment 2, 69009 Lyon",
      lat: 45.7780,
      lng: 4.8050
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation avec le nouveau composant */}
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
                <a href="#contact">Nous contacter</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                <a href="#structures">Découvrir nos structures</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section id="presentation" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Notre Mission</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-purple-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Target className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Coordination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Coordonner l'action des structures intervenant auprès des jeunes de 16 à 25 ans dans une perspective d'insertion sociale et professionnelle.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Accompagnement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Organiser une prise en charge partenariale et globale des jeunes nécessitant un accompagnement socialisant préalable à l'emploi durable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Heart className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Citoyenneté</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Favoriser l'accès à la citoyenneté par l'apprentissage des codes sociaux et la construction de repères spatio-temporels.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-purple-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Les Origines</h3>
            <p className="text-gray-700 mb-4">
              Depuis 2006, les élus de la Ville de Lyon et du 9ème arrondissement ont mobilisé les acteurs intervenant auprès du public de 16 à 25 ans pour répondre au malaise de certains jeunes du quartier de la Duchère. Cette mobilisation a conduit à la création d'une coordination partenariale portée par la Mission Locale de Lyon.
            </p>
            <p className="text-gray-700">
              Le diagnostic établi en commun a souligné la nécessité d'une intervention partenariale et coordonnée, impliquant les Centres Sociaux, la MJC, l'équipe Métropolitaine de Prévention Spécialisée et la Mission Locale.
            </p>
          </div>
        </div>
      </section>

      {/* Galerie du quartier */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Le Quartier de la Duchère</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/duchere-panorama.jpg" alt="Vue panoramique de la Duchère" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/duchere-quartier.jpg" alt="Quartier de la Duchère" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/duchere-renovation.jpg" alt="Rénovation du quartier" className="w-full h-64 object-cover" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Un Quartier en Transformation</h3>
            <p className="text-gray-700 mb-4">
              Situé sur la 3ème colline de Lyon dans le 9ème arrondissement, en belvédère sur la ville-centre, la Duchère surplombe Vaise et jouxte les communes d'Écully et de Champagne-au-Mont-d'Or.
            </p>
            <p className="text-gray-700 mb-4">
              Le quartier a connu une profonde rénovation urbaine depuis 2003, transformant la Duchère en un écoquartier attractif labellisé. Cette mutation urbaine se poursuit avec de nouveaux projets visant à améliorer la qualité de vie des habitants.
            </p>
            <p className="text-gray-700">
              Le Groupe de Pairs s'inscrit dans cette dynamique de territoire en accompagnant les jeunes vers l'insertion sociale et professionnelle, le loisirs, le sport, l'accès aux droits ou encore la citoyenneté, contribuant ainsi à faire vivre le quartier et à soutenir sa cohésion sociale.
            </p>
          </div>
        </div>
      </section>

      {/* Structures membres */}
      <section id="structures" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Nos Structures Membres</h2>
          <p className="text-center text-gray-600 mb-12">13 structures investies dans l'accompagnement des jeunes</p>

          {/* Carte interactive */}
          <div className="mb-12 max-w-4xl mx-auto">
            <InteractiveMap structures={structures} />
            <p className="text-sm text-gray-500 mt-4 text-center">
              <MapPin className="inline w-4 h-4 mr-1" />
              Cliquez sur les marqueurs pour voir les détails de chaque structure
            </p>
          </div>

          {/* Liste des structures */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {structures.map((structure, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="text-orange-600">{structure.nom}</CardTitle>
                  <CardDescription>{structure.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {structure.telephone && (
                    <div className="flex items-start gap-2 text-sm">
                      <Phone className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{structure.telephone}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{structure.adresse}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Actions */}
      <section id="actions" className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Nos Actions</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-purple-600">Accompagnement Individuel</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Orientation et construction de projet professionnel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Accès aux droits et aux services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Soutien dans les démarches administratives</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-purple-600">Actions Collectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Ateliers thématiques et sorties culturelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Activités sportives et de loisirs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Projets citoyens et solidaires</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Actualités */}
      <section id="actus" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Actualités</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-purple-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>15 octobre 2025</span>
                </div>
                <CardTitle className="text-orange-600">Nouvelle équipe de prévention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  À partir de septembre 2025, une équipe de Prévention Spécialisée interviendra sur le quartier pour accompagner les 10-25 ans.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>1 octobre 2025</span>
                </div>
                <CardTitle className="text-orange-600">Journée portes ouvertes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Venez découvrir les actions du Groupe de Pairs et rencontrer les structures partenaires lors de notre journée portes ouvertes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>20 septembre 2025</span>
                </div>
                <CardTitle className="text-orange-600">Nouveau projet sportif</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lancement d'un nouveau projet d'insertion par le sport en partenariat avec le Club Lyon La Duchère et Sport dans la Ville.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-gradient-to-br from-orange-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Nous Contacter</h2>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-purple-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-600">Envoyez-nous un message</CardTitle>
                <CardDescription>Nous vous répondrons dans les plus brefs délais</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSubmit(e, formData.type)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom complet</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-purple-600 text-white">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Coordonnées</h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Mission Duchère</p>
                <p>12 bis Place Gisèle Halimi</p>
                <p>69009 Lyon</p>
                <p className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  04 37 49 73 90
                </p>
              </div>
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
                <li><a href="#presentation" className="text-purple-100 hover:text-white transition">Présentation</a></li>
                <li><a href="#structures" className="text-purple-100 hover:text-white transition">Structures</a></li>
                <li><a href="#actions" className="text-purple-100 hover:text-white transition">Actions</a></li>
                <li><a href="#actus" className="text-purple-100 hover:text-white transition">Actualités</a></li>
                <li><a href="#contact" className="text-purple-100 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-purple-100">
                Mission Duchère<br />
                12 bis Place Gisèle Halimi<br />
                69009 Lyon<br />
                04 37 49 73 90
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

