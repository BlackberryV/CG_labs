import Sphere from '../classes/sphere/Sphere';
import Vector from '../classes/vector/Vector';

export interface IRayTracer {
  objects: Sphere[];
  screenWidth: number;
  screenHeight: number;
  cameraPosition: Vector;
  screenDistance: number;
  screenDown: Vector;
  screenRight: Vector;
  lightDirection: Vector;
}
