import { Geometry } from './geometry';

export interface Maraude {
  id: string;
  name: string;
  description: string;
  image: string;
  geometry: Geometry;
}