import Vector from './classes/vector/Vector';
import Screen from './classes/screen/Screen';
import Camera from './classes/camera/Camera';
import Raytracer from './rayTrace/rayTracer';
import Triangle from './classes/triangle/Triangle';
import {
  MatrixTransformation,
  MatrixTransformations,
} from './services/matrixTransformationFactory';
import ObjReader from './services/ObjReader/ObjReader';

const camera = new Camera(30, new Vector(0, 1.5, -5));
const screen = new Screen(300, 300);
const rayTracer = new Raytracer(camera, screen);

// Instead of objects[] we will have this:

const objects = [
  new Triangle(
    new Vector(0, -150, 10),
    new Vector(150, 150, 10),
    new Vector(-150, 150, 10)
  ),
];

const triangles = ObjReader.readObjFile('teapot.obj').concat(objects);


const lightDirection = new Vector(-0.5, -0.5, -1).normalize();

const outputFile = 'output.ppm';

const matrixTransformations: MatrixTransformations[] = [
  {
    type: MatrixTransformation.ROTATE,
    degrees: Math.PI / 45,
    axis: new Vector(0, 0, 1),
  },
  {
    type: MatrixTransformation.SCALE,
    scaleVector: new Vector(1, 1, 1.1),
  },
  {
    type: MatrixTransformation.TRANSLATE,
    translation: new Vector(-0.5, 0.5, -1),
  },
];

rayTracer.trace(triangles, lightDirection,outputFile);