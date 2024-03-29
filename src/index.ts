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
import WriterToFile from './classes/writer/WriterToFile';
import WriterToConsole from './classes/writer/WriterToConsole';

const camera = new Camera(30, new Vector(0, 1.5, -5));
const screen = new Screen(100, 100);
const rayTracer = new Raytracer(camera, screen);

const objects = [
  new Triangle(
    new Vector(0, -150, 10),
    new Vector(150, 150, 10),
    new Vector(-150, 150, 10)
  ),
];


const args = process.argv.slice(2);

const srcArg = args.find(arg => arg.includes('--src='));
const src = srcArg ? srcArg.split('=')[1] : null;

const outArg = args.find(arg => arg.includes('--out='));
const out = outArg ? outArg.split('=')[1] : null;


const triangles = ObjReader.readObjFile(src ? src : 'teapot.obj');

const lightDirection = new Vector(-0.5, -0.5, -1).normalize();

const outputFile = out;

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

const imageData = rayTracer.trace(triangles, lightDirection);

const writer = outputFile ? new WriterToFile(imageData, outputFile) : new WriterToConsole(imageData)

writer.write();