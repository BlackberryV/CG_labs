import Disk from './classes/disk/Disk';
import Plain from './classes/plain/Plain';
import Sphere from './classes/sphere/Sphere';
import Vector from './classes/vector/Vector';
import Screen from "./classes/screen/Screen";
import Camera from "./classes/camera/Camera";
import Raytracer from "./rayTrace/rayTracer";

const camera = new Camera(30, new Vector(0, 0, 0));
const screen = new Screen(100, 100);
const objects = [
  new Sphere(new Vector(0, 0, 1), 0.05),
  new Sphere(new Vector(0.2, 0.2, 1), 0.2),
  new Sphere(new Vector(-0.2, -0.2, 1), 0.2),
]
const lightDirection = new Vector(0, 0, -1).normalize()

const rayTracer = new Raytracer(camera, screen);
rayTracer.trace(objects, lightDirection);

