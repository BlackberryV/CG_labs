import Vector from './classes/vector/Vector';
import Screen from './classes/screen/Screen';
import Camera from './classes/camera/Camera';
import Raytracer from './rayTrace/rayTracer';
import Triangle from './classes/triangle/Triangle';
import {
  MatrixTransformation,
  MatrixTransformations,
} from './services/matrixTransformationFactory';

const camera = new Camera(60, new Vector(0, 0, 1));
const screen = new Screen(300, 300);
const rayTracer = new Raytracer(camera, screen);

const objects = [
  new Triangle(
    new Vector(0, 0, 0.1),
    new Vector(0.1, 0, 0),
    new Vector(0, 0.1, 0)
  ),
  new Triangle(
    new Vector(0, 0, -0.1),
    new Vector(-0.1, 0, 0),
    new Vector(0, -0.1, 0)
  ),
];

const lightDirection = new Vector(1, 1, 1).normalize();

const outputFile = 'output.ppm';

const matrixTransformations: MatrixTransformations[] = [
  {
    type: MatrixTransformation.ROTATE,
    degrees: Math.PI / 4,
    axis: new Vector(0, 0, 1),
  },
  {
    type: MatrixTransformation.SCALE,
    scaleVector: new Vector(1, 1, 2),
  },
  {
    type: MatrixTransformation.TRANSLATE,
    translation: new Vector(0, 5, 10),
  },
];

rayTracer.trace(objects, lightDirection, outputFile, matrixTransformations);
