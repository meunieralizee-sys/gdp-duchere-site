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
                      <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <a href={`tel:${structure.telephone}`} className="hover:text-orange-600">
                        {structure.telephone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{structure.adresse}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>


        </div>
      </section>

      {/* Actions */}
      <section id="actions" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Nos Actions</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-purple-600 hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-orange-600" />
                  Marrainage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Programme de mentorat permettant aux jeunes de bénéficier de l'accompagnement d'un adulte référent pour les soutenir dans leur parcours d'insertion.
                </p>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                  <a href="#contact-marrainage">Devenir marraine/parrain</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600 hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-orange-600" />
                  T'change
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Rendez-vous réguliers tous les derniers vendredis du mois de 17h à 19h sur la Place Gisèle Halimi, pour échanger, s'informer et créer du lien entre jeunes et structures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600 hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-orange-600" />
                  Chantiers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">
                  Chantiers éducatifs permettant aux jeunes de s'impliquer dans des projets concrets tout en développant des compétences professionnelles et sociales.
                </p>
                <p className="text-sm text-gray-600 mt-2 bg-purple-50 p-3 rounded">
                  <strong>2024 :</strong> 8 chantiers dans le 9ème / 17 jeunes du QPV Duchère (sur 30 jeunes)
                </p>
              </CardContent>
            </Card>


          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">13</div>
              <div className="text-gray-700">Structures membres</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">16-25</div>
              <div className="text-gray-700">Ans (public cible)</div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">6+</div>
              <div className="text-gray-700">Réunions en 2024/2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Nous Contacter</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Formulaire général */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Contact Général</CardTitle>
                <CardDescription>Pour toute demande d'information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Pour nous contacter, envoyez-nous un email à :
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      📧 <a href="mailto:a.meunier@mllyon.org" className="text-orange-600 hover:underline">a.meunier@mllyon.org</a>
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      📧 <a href="mailto:margaux.jacquemin@afev.org" className="text-orange-600 hover:underline">margaux.jacquemin@afev.org</a>
                    </p>
                  </div>
                  <a 
                    href="mailto:a.meunier@mllyon.org,margaux.jacquemin@afev.org?subject=Contact depuis le site Groupe de Pairs"
                    className="w-full inline-block"
                  >
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      📨 Nous écrire
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Formulaire marrainage */}
            <Card id="contact-marrainage" className="border-purple-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-600">Marrainage</CardTitle>
                <CardDescription>Devenir marraine ou parrain d'un jeune</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Remplissez le formulaire Google pour devenir marraine ou parrain d'un jeune du quartier.
                  </p>
                  <a 
                    href="https://forms.gle/LzsngTe8M6uJpxxcA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block"
                  >
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      📝 Remplir le formulaire
                    </Button>
                  </a>
                  <p className="text-xs text-gray-500 text-center">
                    Le formulaire s'ouvrira dans un nouvel onglet
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Formulaire jeunes filles */}
            <Card id="contact-jeunes" className="border-purple-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-600">Jeunes Filles</CardTitle>
                <CardDescription>Être accompagnée par une marraine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Remplissez le formulaire Google pour être accompagnée par une marraine.
                  </p>
                  <a 
                    href="https://forms.gle/6xuDMHV2kBoc5mim8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block"
                  >
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      📝 Remplir le formulaire
                    </Button>
                  </a>
                  <p className="text-xs text-gray-500 text-center">
                    Le formulaire s'ouvrira dans un nouvel onglet
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Animateurs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8 text-gray-700">Animateurs de la Coordination</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="flex items-center justify-center h-24">
              <img src="/logo-mission-locale.jpg" alt="Mission Locale Lyon" className="h-20 object-contain" />
            </div>
            <div className="flex items-center justify-center h-24">
              <img src="/logo-repairs.png" alt="Le RePairs - AFEV" className="h-20 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold text-center mb-8 text-gray-700">Nos Partenaires Institutionnels</h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="flex items-center justify-center h-20">
              <img src="/logo-ville-lyon.jpg" alt="Ville de Lyon" className="h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center h-20">
              <img src="/logo-cite-educative.jpg" alt="Cité Éducative" className="h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center h-20">
              <img src="/logo-prefecture-rhone.jpg" alt="Préfecture du Rhône" className="h-16 object-contain" />
            </div>
            <div className="flex items-center justify-center h-20">
              <img src="/logo-metropole-lyon.png" alt="Métropole de Lyon" className="h-16 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">Groupe de Pairs Duchère</h4>
              <p className="text-gray-400 text-sm">
                Coordination 16/25 ans<br />
                Quartier de la Duchère<br />
                Lyon 9ème arrondissement
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#presentation" className="text-gray-400 hover:text-purple-600">Présentation</a></li>
                <li><a href="#structures" className="text-gray-400 hover:text-purple-400">Structures</a></li>
                <li><a href="#actions" className="text-gray-400 hover:text-purple-400">Actions</a></li>

                <li><a href="#contact" className="text-gray-400 hover:text-purple-400">Contact</a></li>
              </ul>
            </div>

          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024-2025 Groupe de Pairs Duchère - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

