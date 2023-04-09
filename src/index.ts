import Vector from './classes/vector/Vector';
import Screen from "./classes/screen/Screen";
import Camera from "./classes/camera/Camera";
import Raytracer from "./rayTrace/rayTracer";
import Triangle from "./classes/triangle/Triangle";

const camera = new Camera(30, new Vector(0, 0, -60));
const screen = new Screen(300, 300);
const rayTracer = new Raytracer(camera, screen);


const objects = [
  new Triangle(
    new Vector(0, 0, 50),
    new Vector(50, 0, 0),
    new Vector(0, 50, 0)
  ),
  new Triangle(
    new Vector(0, 0, -50),
    new Vector(-50, 0, 0),
    new Vector(0, -50, 0)
  )
]

const lightDirection = new Vector(-1, -1, -1).normalize()

const outputFile = 'output.ppm';

rayTracer.trace(objects, lightDirection, outputFile);