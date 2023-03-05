import Vector from "../classes/vector/Vector";
import Ray from "../classes/ray/Ray";
import Sphere from "../classes/sphere/Sphere"

export default function rayTracer(): void {
  const screenWidth = 20;
  const screenHeight = 20;
  const screenCenter = new Vector(0, 0, 11);
  const cameraDistance = 1;
  const cameraPosition = new Vector(0, 0, cameraDistance);
  const screenDown = new Vector(0, -1, 0);
  const screenRight = new Vector(1, 0, 0);
  const screenTop = screenDown.scale(-screenHeight / 2);
  const screenLeft = screenRight.scale(-screenWidth / 2);
  const screenStart = screenCenter.add(screenTop).add(screenLeft);

  const object = new Sphere(new Vector(1,6, 21), 3)

  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      const direction = screenStart.add(screenRight.scale(x)).add(screenDown.scale(y))
      const ray = new Ray(cameraPosition, direction)

      const isIntersecting = object.intersect(ray);

      if (isIntersecting) {
        process.stdout.write("#");
      } else {
        process.stdout.write(" ");
      }
    }
    process.stdout.write("\n");
  }
}