"use client";

import { useState, useRef, useEffect } from "react";
import Map, { ScaleControl, NavigationControl } from "react-map-gl/maplibre";
import type { MapRef, LngLatBoundsLike } from "react-map-gl/maplibre";
import { buffer, bbox, bboxPolygon } from "@turf/turf";

import "maplibre-gl/dist/maplibre-gl.css";

import MaraudeList from "@/components/MaraudeList";
import DrawTool from "@/components/DrawTool";
import MaraudeMap from "@/components/MaraudeMap";
import AddMaraudeMenu from "@/components/AddMaraudeMenu";
import type { Maraude } from "@/types/maraude";
import type { Geometry } from "@/types/geometry";

import initMaraudes from "@/data/maraudes.json";
import Loading from "@/components/Loading";

const BUFFER_UNITS = "kilometers";
const BUFFER_DISTANCE = 0.2;

export default function Home() {
  const mapRef = useRef<MapRef>(null); // Reference to the map
  const [isMapReady, setIsMapReady] = useState(false);
  const [maraudes, setMaraudes] = useState<Maraude[]>(
    initMaraudes as Maraude[]
  );
  const [selectedMaraudeID, setSelectedMaraudeID] = useState<string | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredMaraudeID, setHoveredMaraudeID] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [geometry, setGeometry] = useState<Geometry | null>(null);

  const onSelectMaraude = (id: string) => {
    setSelectedMaraudeID(id);
    setMenuOpen(true);
  };

  useEffect(() => {
    const map = mapRef.current;
    if (map && selectedMaraudeID) {
      const maraude = maraudes.find((m) => m.id === selectedMaraudeID);
      const geometry = maraude?.geometry;
      if (maraude && geometry) {
        const boundingBox = bbox(geometry as any);
        const boundingBoxPolygon = bboxPolygon(boundingBox);
        const buffered = buffer(boundingBoxPolygon, BUFFER_DISTANCE, {
          units: BUFFER_UNITS,
        });
        if (!buffered) return;
        const bounds: LngLatBoundsLike = bbox(buffered) as LngLatBoundsLike;
        map.fitBounds(bounds, {
          duration: 2500,
        });
      }
    }
  }, [selectedMaraudeID, maraudes]);

  return (
    <div className="w-full h-screen">
      <MaraudeList
        maraudes={maraudes}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        selectedMaraudeID={selectedMaraudeID}
        onSelect={onSelectMaraude}
        onHover={setHoveredMaraudeID}
        setEditMode={setEditMode}
      />
      <AddMaraudeMenu
        editMode={editMode}
        setEditMode={setEditMode}
        geometry={geometry}
        setGeometry={setGeometry}
        setMaraudes={setMaraudes}
        setSelectedMaraudeID={setSelectedMaraudeID}
      />
      {!isMapReady && (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
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
          onSelectMaraude={onSelectMaraude}
          hoveredMaraudeID={hoveredMaraudeID}
        />
        {editMode && <DrawTool setGeometry={setGeometry} />}
      </Map>
    </div>
  );
}
