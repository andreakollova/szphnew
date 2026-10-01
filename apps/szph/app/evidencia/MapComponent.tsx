"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type ClubStat = {
  name: string;
  city: string;
  lat: number;
  lng: number;
  total: number;
  active: number;
  boys: number;
  girls: number;
};

export default function MapComponent({
  clubs,
  selectedClubs,
  onToggleClub,
}: {
  clubs: ClubStat[];
  selectedClubs: string[];
  onToggleClub: (name: string) => void;
}) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "",
      iconUrl: "",
      shadowUrl: "",
    });
  }, []);

  const slovakiaCenter: [number, number] = [48.6, 18.0];

  return (
    <MapContainer
      center={slovakiaCenter}
      zoom={8}
      className="h-full w-full"
      scrollWheelZoom={false}
      style={{ background: "#f5f7fb", zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clubs.map((club) => {
        const isActive =
          selectedClubs.length === 0 || selectedClubs.includes(club.name);
        const radius = Math.max(12, Math.min(28, 10 + club.total * 0.35));
        return (
          <CircleMarker
            key={club.name}
            center={[club.lat, club.lng]}
            radius={radius}
            pathOptions={{
              fillColor: isActive ? "#ffffff" : "#d1d5db",
              fillOpacity: isActive ? 0.95 : 0.5,
              color: isActive ? "#051937" : "#9ca3af",
              weight: 2.5,
            }}
            eventHandlers={{
              click: () => onToggleClub(club.name),
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -radius]}
            >
              <div className="text-center px-1">
                <div className="font-bold text-sm" style={{ color: "#051937" }}>
                  {club.name}
                </div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  {club.city}
                </div>
                <div
                  className="text-xl font-bold mt-1"
                  style={{ color: "#016fb4" }}
                >
                  {club.total}
                </div>
                <div className="text-xs" style={{ color: "#64748b" }}>
                  {club.active} aktívnych
                </div>
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
