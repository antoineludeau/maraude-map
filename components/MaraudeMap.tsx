"use client";

import { useEffect, useState, useRef } from "react";
import {
  useMap,
  Source,
  Layer,
  Popup,
  MapMouseEvent,
  MapGeoJSONFeature,
  Marker,
} from "react-map-gl/maplibre";
import type { MapRef } from "react-map-gl/maplibre";
import { centroid, center, lineString, polygon } from "@turf/turf";

import { Maraude } from "@/types/maraude";
import { Feature } from "@/types/geometry";

interface HoveredFeature {
  name?: string;
  id: string;
  source: string;
}

interface PopupData {
  name: string;
  Position: { lat: number; lng: number };
}



export default function MaraudeMap({
  maraudes,
  addressFeature,
  onSelectMaraude,
  hoveredMaraudeID,
}: {
  maraudes: Maraude[];
  addressFeature: Feature | null;
  onSelectMaraude: (id: string) => void;
  hoveredMaraudeID: string | null;
}) {
  const map = useMap();
  const hoveredFeature = useRef<HoveredFeature | null>(null);
  const [popupData, setPopupData] = useState<PopupData | null>(null);

  useEffect(() => {
    const currentMap = map.current;
    const itemLayers = ["polygon-layer", "line-layer"];

    const onHover = (
      evt: MapMouseEvent & { features?: MapGeoJSONFeature[] | undefined }
    ) => {
      const feature = evt.features?.[0];
      const id = feature?.properties.id;
      const source = feature?.source;
      const name = feature?.properties.name;
      if (currentMap && source) {
        handleFeatureOnHover(currentMap, id, source, name);
      }
    };

    const onLeave = () => {
      if (currentMap) {
        handleFeatureOffHover(currentMap);
      }
    };

    const handleClick = (
      e: MapMouseEvent & { features?: MapGeoJSONFeature[] | undefined },
      cb: (id: string) => void
    ) => {
      const feature = e.features?.[0];
      const id = feature?.properties.id;
      if (id) {
        cb(id);
      }
    };

    if (currentMap) {
      itemLayers.forEach((itemLayer) => {
        currentMap.on("mouseleave", itemLayer, onLeave);
        currentMap.on("mousemove", itemLayer, (e) => onHover(e));
        currentMap.on("click", itemLayer, (e) =>
          handleClick(e, onSelectMaraude)
        );
      });
    }

    return () => {
      if (currentMap) {
        itemLayers.forEach((itemLayer) => {
          currentMap.off("mouseleave", itemLayer, onLeave);
          currentMap.off("mousemove", itemLayer, onHover);
          currentMap.off("click", itemLayer, (e) =>
            handleClick(e, onSelectMaraude)
          );
        });
      }
    };
  }, [map, maraudes, onSelectMaraude]);

  useEffect(() => {
    const currentMap = map.current;
    if (currentMap) {
      if (hoveredMaraudeID) {
        const feature = currentMap
          .queryRenderedFeatures({
            layers: ["polygon-layer", "line-layer"],
          })
          .find((f) => f.properties.id === hoveredMaraudeID);
        if (feature) {
          const id = feature.properties.id;
          const source = feature.source;
          const name = feature.properties.name;
          handleFeatureOnHover(currentMap, id, source, name);
        } else {
          handleFeatureOffHover(currentMap);
        }
      } else {
        handleFeatureOffHover(currentMap);
      }
    }
  }, [hoveredMaraudeID, maraudes]);

  const handleFeatureOnHover = (
    map: MapRef,
    id: string,
    source: string,
    name: string
  ) => {
    if (hoveredFeature.current) {
      const { id, source } = hoveredFeature.current;
      map.setFeatureState({ id, source }, { hover: false });
    }
    map.setFeatureState({ id, source }, { hover: true });
    hoveredFeature.current = {
      id,
      source,
      name,
    };

    const geometry = maraudes.find((maraude) => maraude.id === id)?.geometry;

    if (geometry) {
      let position;
      if (geometry.type === "Polygon") {
        position = centroid(polygon(geometry.coordinates as number[][][]));
      } else if (geometry.type === "LineString") {
        position = center(lineString(geometry.coordinates as number[][]));
      }

      setPopupData({
        name,
        Position: {
          lat: position?.geometry.coordinates[1] || 0,
          lng: position?.geometry.coordinates[0] || 0,
        },
      });
    }
  };

  const handleFeatureOffHover = (map: MapRef) => {
    if (hoveredFeature.current) {
      const { id, source } = hoveredFeature.current;
      map.setFeatureState({ id, source }, { hover: false });
      hoveredFeature.current = null;
      setPopupData(null);
    }
  };

  return (
    <>
      {popupData && (
        <Popup
          latitude={popupData.Position.lat}
          longitude={popupData.Position.lng}
          closeOnClick={false}
          closeButton={false}
          style={{ pointerEvents: "none" }}
        >
          <div className="text-sm font-semibold text-gray-800">
            {popupData.name}
          </div>
        </Popup>
      )}
      <Source
        id="polygon-source"
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: maraudes
            .filter((maraude) => maraude.geometry.type === "Polygon")
            .map((maraude) => ({
              type: "Feature",
              geometry: maraude.geometry,
              properties: {
                id: maraude.id,
                name: maraude.name,
              },
            })),
        }}
        promoteId="id"
      >
        <Layer
          id="polygon-layer"
          type="fill"
          paint={{
            "fill-color": "#399d99",
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              0.7,
              0.4,
            ],
          }}
        />
      </Source>
      <Source
        id="line-source"
        type="geojson"
        data={{
          type: "FeatureCollection",
          features: maraudes
            .filter((maraude) => maraude.geometry.type === "LineString")
            .map((maraude) => ({
              type: "Feature",
              geometry: maraude.geometry,
              properties: {
                id: maraude.id,
                name: maraude.name,
              },
            })),
        }}
        promoteId="id"
      >
        <Layer
          id="line-layer"
          type="line"
          paint={{
            "line-color": "#399d99",
            "line-width": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              8,
              4,
            ],
          }}
        />
      </Source>
      {addressFeature && (
        <Marker
          latitude={addressFeature.geometry.coordinates[1] as number}
          longitude={addressFeature.geometry.coordinates[0] as number}
        >
        </Marker>
      )}
    </>
  );
}
