import fs from 'fs';
import Vector from '../classes/vector/Vector';
import Ray from '../classes/ray/Ray';
import Camera from '../classes/camera/Camera';
import Screen from '../classes/screen/Screen';
import Triangle from '../classes/triangle/Triangle';

export default class Raytracer {
  private camera: Camera;
  private screen: Screen;

  constructor(camera: Camera, screen: Screen) {
    this.camera = camera;
    this.screen = screen;
  }

  trace(objects: Triangle[], lightDirection: Vector, outputFile: string): void {
    const imageData: Vector[][] = [];

    for (let y = 0; y < this.screen.getHeight(); y++) {
      imageData[y] = [];

      for (let x = 0; x < this.screen.getWidth(); x++) {
        const ray = this.calculateRay(x, y);

        // let color = new Vector(0,0,0);
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
            imageData[y][x] = new Vector(0, 0, 0);
          } else {
            const normal = closestObject.getNormal(closestIntersection);
            const dotProduct = normal.dot(lightDirection);
            if (dotProduct < 0) {
              imageData[y][x] = new Vector(0, 0, 0);
            } else {
              const shadowRay = new Ray(
                closestIntersection,
                lightDirection.multiply(-1)
              );
              const inShadow = this.isInShadow(shadowRay, objects, closestObject);
              if (inShadow) {
                imageData[y][x] = new Vector(60, 60, 60);
              } else {
                imageData[y][x] = new Vector(255, 255, 255).multiply(
                  dotProduct
                );
              }
            }
          }
        } else {
          imageData[y][x] = new Vector(0, 0, 0);
        }
      }

      const header = `P3\n${this.screen.getWidth()} ${this.screen.getHeight()}\n255\n`;
      const body = imageData
        .map((row) =>
          row
            .map(
              (v) => `${Math.round(v.x)} ${Math.round(v.y)} ${Math.round(v.z)}`
            )
            .join(' ')
        )
        .join('\n');

      const fileData = `${header}${body}`;
      fs.writeFileSync(outputFile, fileData);
    }
  }

  private calculateRay(x: number, y: number): Ray {
    const halfScreenWidth = this.screen.getWidth() / 2;
    const halfScreenHeight = this.screen.getHeight() / 2;
    const fov = this.camera.getFOV();
    const aspectRatio = this.screen.getWidth() / this.screen.getHeight();

    const screenX = x + 0.5 - halfScreenWidth;
    const screenY = y + 0.5 - halfScreenHeight;

    const cameraX =
      (screenX / halfScreenWidth) * aspectRatio * Math.tan(fov / 2);
    const cameraY = (-screenY / halfScreenHeight) * Math.tan(fov / 2);

    return new Ray(
      this.camera.getPosition(),
      new Vector(-cameraX, -cameraY, 1)
    );
  }
  private isInShadow(shadowRay: Ray, objects: any[], closestObject: any): boolean {
    let inShadow = false;
    for (const object of objects) {
      if (
        object !== closestObject &&
        object.getIntersection(shadowRay)
      ) {
        inShadow = true;
        break;
      }
    }
    return inShadow
  }
}
