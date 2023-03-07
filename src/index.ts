import Sphere from './classes/sphere/Sphere';
import Vector from './classes/vector/Vector';
import rayTracer from './rayTrace/rayTracer';
import { IRayTracer } from './types/rayTracer';

const rayTracerConfig: IRayTracer = {
  screenWidth: 20,
  screenHeight: 20,
  objects: [new Sphere(new Vector(0, 0, 20), 5)],
  cameraPosition: new Vector(0, 0, 0),
  screenDistance: 10,
  screenDown: new Vector(0, -1, 0),
  screenRight: new Vector(1, 0, 0),
  lightDirection: new Vector(-1, -1, -1).normalize(),
};

rayTracer(rayTracerConfig);
