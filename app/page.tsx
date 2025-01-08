"use client";

import { useState, useRef, useEffect } from "react";
import Map, { ScaleControl, NavigationControl } from "react-map-gl/maplibre";
import type { MapRef, LngLatBoundsLike } from "react-map-gl/maplibre";
import { buffer, bbox, bboxPolygon, AllGeoJSON } from "@turf/turf";

import Menu from "@/components/Menu";
import MaraudeMap from "@/components/MaraudeMap";
import Loading from "@/components/Loading";
import OpenButton from "@/components/OpenButton";
import MaraudeCard from "@/components/MaraudeCard";
import Search from "@/components/Search";
import CloseButton from "@/components/CloseButton";

import { useMaraudes } from "@/components/MaraudeProvider";

import type { Maraude } from "@/types/maraude";
import type { Feature } from "@/types/geometry";


import "maplibre-gl/dist/maplibre-gl.css";

const BUFFER_UNITS = "kilometers";
const BUFFER_DISTANCE = 0.2;

export default function Home() {
  const mapRef = useRef<MapRef>(null); // Reference to the map
  const maraudesContext = useMaraudes();
  const maraudes = maraudesContext?.maraudes;
  const selectedMaraudeID = maraudesContext?.selectedMaraudeID;

  const setSelectedMaraudeID = maraudesContext?.setSelectedMaraudeID;
  const [isMapReady, setIsMapReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredMaraudeID, setHoveredMaraudeID] = useState<string | null>(null);
  const [addressFeature, setAddressFeature] = useState<Feature | null>(null);
  const [openDetailedPanel, setOpenDetailedPanel] = useState<boolean>(false);

  const onSelectMaraude = (id: string) => {
    setSelectedMaraudeID(id);
    setMenuOpen(true);
    setOpenDetailedPanel(true);
  };

  useEffect(() => {
    const map = mapRef.current;
    if (map && isMapReady) {
      if (addressFeature) {
        const boundingBox = bbox(addressFeature as AllGeoJSON);
        const boundingBoxPolygon = bboxPolygon(boundingBox);
        const buffered = buffer(boundingBoxPolygon, BUFFER_DISTANCE, {
          units: BUFFER_UNITS,
        });
        if (!buffered) return;
        const bounds: LngLatBoundsLike = bbox(buffered) as LngLatBoundsLike;
        map.fitBounds(bounds, {
          offset: [0, 0],
          duration: 2500,
        });
        return;
      }
    }
  }, [maraudes, isMapReady, addressFeature]);

  useEffect(() => {
    const map = mapRef.current;
    if (map && isMapReady) {
      if (selectedMaraudeID) {
        const maraude = maraudes.find((m) => m.id === selectedMaraudeID);
        const geometry = maraude?.geometry;
        if (maraude && geometry) {
          const boundingBox = bbox(geometry as AllGeoJSON);
          const boundingBoxPolygon = bboxPolygon(boundingBox);
          const buffered = buffer(boundingBoxPolygon, BUFFER_DISTANCE, {
            units: BUFFER_UNITS,
          });
          if (!buffered) return;
          const bounds: LngLatBoundsLike = bbox(buffered) as LngLatBoundsLike;
          map.fitBounds(bounds, {
            offset: [200, 0],
            duration: 2500,
          });
          return;
        }
      }
    }
  }, [maraudes, isMapReady, selectedMaraudeID]);

  return (
    <div className="w-full h-screen">
      <Menu
        maraudes={maraudes}
        menuOpen={menuOpen}
        selectedMaraudeID={selectedMaraudeID}
        onSelect={onSelectMaraude}
        onHover={setHoveredMaraudeID}
      />
      {openDetailedPanel && (
        <div className="absolute top-20 left-[450px] w-[400px] h-fit bg-white z-10 rounded-xl">
          <div className="relative">
            <div className="absolute top-2 right-2">
              <CloseButton onClick={() => setOpenDetailedPanel(false)} />
            </div>
            <MaraudeCard
              maraude={
                maraudes.find((m) => m.id === selectedMaraudeID) as Maraude
              }
            />
          </div>
        </div>
      )}
      {!isMapReady && (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
      <div className="absolute top-6 left-5 z-10 ">
        <div className="flex space-x-4 justify-between items-start">
          <div className="mt-0.5">
            <OpenButton open={menuOpen} setOpen={setMenuOpen} />
          </div>
          <Search setFeature={setAddressFeature} />
        </div>
      </div>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 2.3522,
          latitude: 48.8566,
          zoom: 14,
        }}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          opacity: isMapReady ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
        mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
        onLoad={() => setIsMapReady(true)}
        interactiveLayerIds={["polygon-layer", "line-layer"]}
      >
        <ScaleControl position="bottom-right" maxWidth={150} unit="metric" />
        <NavigationControl position="bottom-right" showCompass />
        <MaraudeMap
          maraudes={maraudes}
          addressFeature={addressFeature}
          onSelectMaraude={onSelectMaraude}
          hoveredMaraudeID={hoveredMaraudeID}
        />
      </Map>
    </div>
  );
}
