export interface Geometry {
  type: GeometryType;
  coordinates: number[][] | number[][][];
}

export type GeometryType = "Polygon" | "LineString";