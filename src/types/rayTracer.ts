import Sphere from '../classes/sphere/Sphere';
import Vector from '../classes/vector/Vector';

export interface IRayTracer {
  objects: any[];
  screenWidth: number;
  screenHeight: number;
  cameraPosition: Vector;
  screenDistance: number;
  screenDown: Vector;
  screenRight: Vector;
  lightDirection: Vector;
}
