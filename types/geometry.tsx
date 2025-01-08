export interface Geometry {
  type: GeometryType;
  coordinates: number[] | number[][] | number[][][];
}

export type GeometryType = "Polygon" | "LineString";

export interface Feature {
  type: "Feature";
  properties: { [key: string]: any };
  geometry: Geometry;
}