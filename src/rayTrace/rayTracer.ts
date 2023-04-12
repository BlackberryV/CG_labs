import fs from 'fs';
import Vector from '../classes/vector/Vector';
import Ray from '../classes/ray/Ray';
import Camera from '../classes/camera/Camera';
import Screen from '../classes/screen/Screen';
import Triangle from '../classes/triangle/Triangle';
import {
  MatrixTransformations,
  transformationFactory,
} from '../services/matrixTransformationFactory';

export default class Raytracer {
  private camera: Camera;
  private screen: Screen;

  constructor(camera: Camera, screen: Screen) {
    this.camera = camera;
    this.screen = screen;
  }

  trace(
    objects: Triangle[],
    lightDirection: Vector,
    outputFile?: string,
    rayTransformationSequence?: MatrixTransformations[]
  ): number[][] {
    const imageData: number[][] = [];

    for (let y = 0; y < this.screen.getHeight(); y++) {
      imageData[y] = [];

      for (let x = 0; x < this.screen.getWidth(); x++) {
        const ray = this.calculateRay(x, y, rayTransformationSequence);

        let dotProduct = 0;
        let closestIntersection: Vector | null = null;
        let closestObject = null;

        for (const object of objects) {
          const intersectionPoint = object.getIntersection(ray);
          if (
            intersectionPoint &&
            (!closestIntersection ||
              intersectionPoint.getDistanceTo(this.camera.getPosition()) <
                closestIntersection.getDistanceTo(this.camera.getPosition()))
          ) {
            closestIntersection = intersectionPoint;
            closestObject = object;
          }
        }
        if (closestIntersection) {
          if (closestObject === null) {
            imageData[y][x] = 0;
          } else {
            const normal = closestObject.getNormal(this.camera.getPosition());
            dotProduct = normal.dot(lightDirection);
            if (dotProduct < 0) {
              imageData[y][x] = 0;
            } else {
              const shadowRay = new Ray(closestIntersection, lightDirection);
              const inShadow = this.isInShadow(
                shadowRay,
                objects,
                closestObject
              );
              if (inShadow) {
                imageData[y][x] = 0;
              } else {
                imageData[y][x] = dotProduct;
              }
            }
          }
        } else {
          imageData[y][x] = 0;
        }
      }
      // const header = `P3\n${this.screen.getWidth()} ${this.screen.getHeight()}\n255\n`;
      // const body = imageData
      //   .map((row) =>
      //     row
      //       .map(
      //         (v) => `${v}`
      //       )
      //       .join(' ')
      //   )
      //   .join('\n');

      // const fileData = `${header}${body}`;
      // fs.writeFileSync(outputFile, fileData);

    }
    return imageData
  }

  private calculateRay(
    x: number,
    y: number,
    transformationSequence?: MatrixTransformations[]
  ): Ray {
    const halfScreenWidth = this.screen.getWidth() / 2;
    const halfScreenHeight = this.screen.getHeight() / 2;
    const fov = this.camera.getFOV();
    const aspectRatio = this.screen.getWidth() / this.screen.getHeight();

    const screenX = x + 0.5 - halfScreenWidth;
    const screenY = y + 0.5 - halfScreenHeight;

    const cameraX =
      (screenX / halfScreenWidth) * aspectRatio * Math.tan(fov / 2);
    const cameraY = (-screenY / halfScreenHeight) * Math.tan(fov / 2);
    const cameraZ = 1;

    const rayDirection = new Vector(-cameraX, -cameraY, cameraZ);

    if (transformationSequence) {
      const transformedRay = transformationFactory(
        transformationSequence,
        rayDirection
      );
      return new Ray(this.camera.getPosition(), transformedRay);
    }

    return new Ray(this.camera.getPosition(), rayDirection);
  }

  private isInShadow(
    shadowRay: Ray,
    objects: Triangle[],
    closestObject: Triangle
  ): boolean {
    let inShadow = false;
    for (const object of objects) {
      if (object !== closestObject && object.getIntersection(shadowRay)) {
        inShadow = true;
        break;
      }
    }
    return inShadow;
  }
}
