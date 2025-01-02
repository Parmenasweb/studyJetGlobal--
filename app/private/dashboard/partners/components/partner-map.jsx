"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users2, User } from "lucide-react";

export function PartnerMap({ partners, onPartnerClick }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = initializeMap;
      return () => {
        document.head.removeChild(script);
      };
    } else if (window.google) {
      initializeMap();
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && window.google) {
      updateMarkers();
    }
  }, [partners]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 2,
      center: { lat: 20, lng: 0 },
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }, { lightness: 17 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 18 }],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 16 }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#dedede" }, { lightness: 21 }],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            { visibility: "on" },
            { color: "#ffffff" },
            { lightness: 16 },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            { saturation: 36 },
            { color: "#333333" },
            { lightness: 40 },
          ],
        },
        {
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ color: "#fefefe" }, { lightness: 20 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
        },
      ],
    });

    mapRef.current = map;
    updateMarkers();
  };

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (!mapRef.current || !partners) return;

    const bounds = new window.google.maps.LatLngBounds();
    const infoWindow = new window.google.maps.InfoWindow();

    partners.forEach((partner) => {
      if (
        !partner.location?.coordinates?.lat ||
        !partner.location?.coordinates?.lng
      )
        return;

      const position = {
        lat: partner.location.coordinates.lat,
        lng: partner.location.coordinates.lng,
      };

      const marker = new window.google.maps.Marker({
        position,
        map: mapRef.current,
        title: partner.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor:
            partner.type === "university"
              ? "#0ea5e9"
              : partner.type === "agency"
              ? "#8b5cf6"
              : "#6b7280",
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "#ffffff",
        },
      });

      const Icon =
        partner.type === "university"
          ? Building2
          : partner.type === "agency"
          ? Users2
          : User;
      const content = `
        <div class="p-2 max-w-xs">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-medium">${partner.name}</span>
          </div>
          <div class="text-sm text-gray-600 mb-1">${
            partner.location.country
          }</div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              partner.type === "university"
                ? "bg-blue-100 text-blue-700"
                : partner.type === "agency"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-700"
            }">
              ${
                partner.type === "university"
                  ? "University"
                  : partner.type === "agency"
                  ? "Agency"
                  : "Independent Agent"
              }
            </span>
            <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              partner.status === "active"
                ? "bg-green-100 text-green-700"
                : partner.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }">
              ${
                partner.status.charAt(0).toUpperCase() + partner.status.slice(1)
              }
            </span>
          </div>
        </div>
      `;

      marker.addListener("click", () => {
        infoWindow.setContent(content);
        infoWindow.open(mapRef.current, marker);
        if (onPartnerClick) {
          onPartnerClick(partner);
        }
      });

      bounds.extend(position);
      markersRef.current.push(marker);
    });

    // Don't zoom too close if there's only one marker
    if (markersRef.current.length === 1) {
      mapRef.current.setZoom(4);
      mapRef.current.setCenter(bounds.getCenter());
    } else if (markersRef.current.length > 1) {
      mapRef.current.fitBounds(bounds);
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={mapRef}
        className="w-full h-[600px] rounded-lg overflow-hidden"
      />
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0ea5e9]" />
            <span className="text-sm">Universities</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#8b5cf6]" />
            <span className="text-sm">Agencies</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#6b7280]" />
            <span className="text-sm">Independent Agents</span>
          </div>
        </div>
      </div>
    </div>
  );
}
