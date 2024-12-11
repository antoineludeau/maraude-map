"use client";

import { useState, useEffect, useCallback } from "react";
import { MapMouseEvent, useMap, Source, Layer } from "react-map-gl/maplibre";

import { Geometry, GeometryType } from "@/types/geometry";

export default function DrawTool({
  setGeometry,
}: {
  setGeometry: React.Dispatch<React.SetStateAction<Geometry | null>>;
}) {
  const map = useMap();
  const [points, setPoints] = useState<number[][]>([]); // Store points
  const [drawingMode, setDrawingMode] = useState<GeometryType | null>(null); // Track if we are drawing
  const [closedPolygon, setClosedPolygon] = useState<Geometry | null>(null); // Store closed polygons
  const [lines, setLines] = useState<Geometry | null>(null); // Store lines

  useEffect(() => {
    if (drawingMode === "Polygon" && points.length > 2) {
      const newClosedPolygon = {
        type: "Polygon" as GeometryType,
        coordinates: [[...points, points[0]]],
      };
      setClosedPolygon(newClosedPolygon);
    }
    if (drawingMode === "LineString" && points.length > 1) {
      setLines({
        type: "LineString",
        coordinates: points,
      });
    }
  }, [points, drawingMode]);

  const handleClick = useCallback((e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setPoints((prevPoints) => [...prevPoints, [lng, lat]]);
  }, []);

  useEffect(() => {
    if (map && map.current) {
      const currentMap = map.current;
      if (drawingMode) {
        currentMap.on("click", handleClick);
      } else {
        currentMap.off("click", handleClick);
      }

      return () => {
        currentMap.off("click", handleClick);
      };
    }
  }, [map, drawingMode, handleClick]);

  const startDrawing = (mode: GeometryType) => {
    setPoints([]);
    setDrawingMode(mode);
  };

  const validate = () => {
    setDrawingMode(null);
    setPoints([]);
    if (closedPolygon) {
      setGeometry(closedPolygon);
    }
    if (lines) {
      setGeometry(lines);
    }
  };

  const clearDrawing = () => {
    setPoints([]);
    setClosedPolygon(null);
    setLines(null);
    setDrawingMode(null);
    setGeometry(null);
  };

  return (
    <>
      <div className="absolute top-0 right-0 p-4 bg-white flex space-x-2 ">
        {(!drawingMode && !closedPolygon && !lines) && (
          <button
            className="hover:bg-gray-100"
            onClick={() => startDrawing("Polygon")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon
                points="4,4 20,4 18,18 6,18"
                className="stroke-current text-gray-500"
                fill="none"
              />
            </svg>
          </button>
        )}
        {!drawingMode&& !closedPolygon && !lines && (
          <button
            className="hover:bg-gray-100"
            onClick={() => startDrawing("LineString")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* First line */}
              <path d="M4 4 L20 4" className="stroke-current text-gray-500" />

              {/* Second line (angled) */}
              <path d="M4 4 L4 20" className="stroke-current text-gray-500" />
            </svg>
          </button>
        )}
        {drawingMode && (
          <button className="hover:bg-gray-100" onClick={validate}>
            Validate
          </button>
        )}
        {(points.length > 0 || closedPolygon || lines) && (
          <button className="hover:bg-gray-100" onClick={clearDrawing}>
            Clear all
          </button>
        )}
      </div>
      {closedPolygon && (
        <Source
          id="draw-polygon-source"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: closedPolygon,
                properties: {},
              },
            ],
          }}
        >
          <Layer
            id="draw-polygon-layer"
            type="fill"
            paint={{
              "fill-color": "#088",
              "fill-opacity": 0.4,
            }}
          />
        </Source>
      )}
      {lines && (
        <Source
          id="draw-line-source"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: lines,
              },
            ],
          }}
        >
          <Layer
            id="draw-line-layer"
            type="line"
            paint={{
              "line-color": "#007cbf",
              "line-width": 4,
            }}
          />
        </Source>
      )}
      {points.length > 0 && (
        <Source
          id="points"
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: points.map((point, i) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: point,
              },
              properties: { index: i },
            })),
          }}
        >
          <Layer
            id="point-layer"
            type="circle"
            paint={{
              "circle-radius": 8,
              "circle-color": "#007cbf",
            }}
          />
        </Source>
      )}
    </>
  );
}
