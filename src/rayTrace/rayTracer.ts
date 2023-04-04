import Vector from '../classes/vector/Vector';
import Ray from '../classes/ray/Ray';
import Camera from "../classes/camera/Camera";
import Screen from "../classes/screen/Screen";

export default class Raytracer {
  private camera: Camera;
  private screen: Screen;

  constructor(camera: Camera, screen: Screen) {
    this.camera = camera;
    this.screen = screen;
  }

  trace(objects: any[], lightDirection: Vector): void {
    const pixels = [];
    for (let x = 0; x < this.screen.getWidth(); x++) {
      for (let y = 0; y < this.screen.getHeight(); y++) {
        const ray = this.calculateRay(x*2, y);

        let color = new Vector(0,0,0);
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
            color = new Vector(0, 0, 0);
          } else {
            const normal = closestObject.getNormal(closestIntersection);
            const dotProduct = normal.dot(lightDirection);
            color = new Vector(255, 255, 255).multiply(dotProduct);
          }
        }
        pixels.push(`${color.x} ${color.y} ${color.z}`)
      }
    }
    console.log(pixels[5000])
  }

  // private charFromScalarProduct(scalarProduct: number): string {
  //   if (scalarProduct < 0) {
  //     return ' ';
  //   } else if (scalarProduct < 0.2) {
  //     return '.';
  //   } else if (scalarProduct < 0.5) {
  //     return '*';
  //   } else if (scalarProduct < 0.8) {
  //     return 'O';
  //   } else {
  //     return '#';
  //   }
  // }

  private calculateRay(x: number, y: number): Ray {
    const halfScreenWidth = this.screen.getWidth() / 2;
    const halfScreenHeight = this.screen.getHeight() / 2;
    const fov = this.camera.getFOV();
    const aspectRatio = this.screen.getWidth() / this.screen.getHeight();

    const screenX = (x + 0.5) - halfScreenWidth;
    const screenY = (y + 0.5) - halfScreenHeight;

    const cameraX = screenX / halfScreenWidth * aspectRatio * Math.tan(fov / 2);
    const cameraY = -screenY / halfScreenHeight * Math.tan(fov / 2);

    return new Ray(this.camera.getPosition(), new Vector(cameraX, cameraY, -1));
  }
}