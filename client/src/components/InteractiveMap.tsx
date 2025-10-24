import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface Structure {
  nom: string;
  description: string;
  telephone: string;
  adresse: string;
  lat: number;
  lng: number;
}

interface InteractiveMapProps {
  structures: Structure[];
}

export default function InteractiveMap({ structures }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Créer la carte
    const map = L.map(mapRef.current).setView([45.7875, 4.7975], 14);

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Icône personnalisée orange
    const orangeIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Regrouper les structures par adresse
    const structuresByAddress = new Map<string, Structure[]>();
    structures.forEach((structure) => {
      const key = `${structure.lat.toFixed(4)},${structure.lng.toFixed(4)}`;
      if (!structuresByAddress.has(key)) {
        structuresByAddress.set(key, []);
      }
      structuresByAddress.get(key)!.push(structure);
    });

    // Ajouter les marqueurs
    structuresByAddress.forEach((structuresAtLocation) => {
      const firstStructure = structuresAtLocation[0];
      const marker = L.marker([firstStructure.lat, firstStructure.lng], { icon: orangeIcon }).addTo(map);
      
      let popupContent = '<div style="padding: 8px;">';
      
      structuresAtLocation.forEach((structure, index) => {
        if (index > 0) {
          popupContent += '<hr style="margin: 12px 0; border-color: #e5e7eb;" />';
        }
        popupContent += `
          <h3 style="font-weight: bold; color: #ea580c; margin-bottom: 4px;">${structure.nom}</h3>
          <p style="font-size: 14px; color: #374151; margin-bottom: 8px;">${structure.description}</p>
          ${structure.telephone ? `<p style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
            <strong>Tél :</strong> ${structure.telephone}
          </p>` : ''}
          <p style="font-size: 12px; color: #6b7280;">
            <strong>Adresse :</strong> ${structure.adresse}
          </p>
        `;
      });
      
      popupContent += '</div>';
      marker.bindPopup(popupContent);
    });

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [structures]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg"
      style={{ zIndex: 0 }}
    />
  );
}

