import Sphere from './classes/sphere/Sphere';
import Vector from './classes/vector/Vector';
import Screen from "./classes/screen/Screen";
import Camera from "./classes/camera/Camera";
import Raytracer from "./rayTrace/rayTracer";

const camera = new Camera(30, new Vector(0, 0, 0));
const screen = new Screen(800, 500);
const rayTracer = new Raytracer(camera, screen);

const objects = [
  new Sphere(new Vector(0, 0, -5), 1),
  new Sphere(new Vector(2, 2, -5), 1)
]
const lightDirection = new Vector(-1, 0, 0).normalize()

const outputFile = 'output.ppm';

rayTracer.trace(objects, lightDirection, outputFile);

