import Vector from "../classes/vector/Vector";
import Ray from "../classes/ray/Ray";
import Sphere from "../classes/sphere/Sphere"

function charFromScalarProduct(scalarProduct: number): string {
  if (scalarProduct < 0) {
    return " ";
  } else if (scalarProduct < 0.2) {
    return ".";
  } else if (scalarProduct < 0.5) {
    return "*";
  } else if (scalarProduct < 0.8) {
    return "O";
  } else {
    return "#";
  }
}

export default function rayTracer(): void {
  const screenWidth = 20;
  const screenHeight = 20;
  const cameraPosition = new Vector(0, 0, 0);
  const screenDistance = 5;
  const screenCenter = new Vector(0, 0, screenDistance);
  const screenDown = new Vector(0, -1, 0);
  const screenRight = new Vector(1, 0, 0);
  const screenTop = screenDown.scale(-screenHeight / 2);
  const screenLeft = screenRight.scale(-screenWidth / 2);
  const screenStart = screenCenter.add(screenTop).add(screenLeft);

  const object = new Sphere(new Vector(0,0, 14), 10)

  const lightDirection = new Vector(-1, -1, -1).normalize();

  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      const direction = screenStart.add(screenRight.scale(x)).add(screenDown.scale(y))
      const ray = new Ray(cameraPosition, direction)

      let char = ' ';
      const intersectionPoint = object.getIntersection(ray);
      if (intersectionPoint === null) {
        char = " "
      }else {
        const normal = object.getNormal(intersectionPoint);
        const dotProduct = normal.dot(lightDirection);
        char = charFromScalarProduct(dotProduct);
      }
      process.stdout.write(char);
    }
    process.stdout.write("\n");
  }
}