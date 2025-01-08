'use client';

import { useState, useRef } from "react";
import Map, { ScaleControl, NavigationControl } from "react-map-gl/maplibre";
import type { MapRef } from "react-map-gl/maplibre";

import MaraudeForm from "@/components/MaraudeForm";
import DrawTool from "@/components/DrawTool";
import Loading from "@/components/Loading";
import { useMaraudes } from "@/components/MaraudeProvider";

import type { Geometry } from "@/types/geometry";

const CreateMaraude = () => {
  const mapRef = useRef<MapRef>(null); // Reference to the map
  const [isMapReady, setIsMapReady] = useState(false);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const maraudesContext = useMaraudes();
  const setMaraudes = maraudesContext?.setMaraudes;
  return (
    <div className="w-full h-screen flex">
      <div className="w-[500px]">
        <MaraudeForm
          geometry={geometry}
          setGeometry={setGeometry}
          setMaraudes={setMaraudes}
        />
      </div>
      <div className="w-full flex-1">
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
          <DrawTool setGeometry={setGeometry} />
        </Map>
      </div>
    </div>
  );
};

export default CreateMaraude;
