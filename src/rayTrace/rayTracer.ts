import Vector from '../classes/vector/Vector';
import Ray from '../classes/ray/Ray';
import { IRayTracer } from '../types/rayTracer';

function charFromScalarProduct(scalarProduct: number): string {
  if (scalarProduct < 0) {
    return ' ';
  } else if (scalarProduct < 0.2) {
    return '.';
  } else if (scalarProduct < 0.5) {
    return '*';
  } else if (scalarProduct < 0.8) {
    return 'O';
  } else {
    return '#';
  }
}

export default function rayTracer({
  screenDistance,
  screenDown,
  screenHeight,
  screenRight,
  screenWidth,
  cameraPosition,
  lightDirection,
  objects,
}: IRayTracer): void {
  const screenCenter = new Vector(0, 0, screenDistance);
  const screenTop = screenDown.multiply(-screenHeight / 2);
  const screenLeft = screenRight.multiply(-screenWidth / 2);
  const screenStart = screenCenter.add(screenTop).add(screenLeft);

  for (let y = 0; y < screenHeight; y++) {
    for (let x = 0; x < screenWidth; x++) {
      const direction = screenStart
        .add(screenRight.multiply(x))
        .add(screenDown.multiply(y))
        .subtract(cameraPosition);
      const ray = new Ray(cameraPosition, direction);

      let char = ' ';
      let closestIntersection: Vector | null = null;
      let closestObject = null;
      for (const object of objects) {
        const intersectionPoint = object.getIntersection(ray);
        if (
          intersectionPoint &&
          (!closestIntersection ||
            intersectionPoint.getDistanceTo(cameraPosition) <
              closestIntersection.getDistanceTo(cameraPosition))
        ) {
          closestIntersection = intersectionPoint;
          closestObject = object;
        }
      }
      if (closestIntersection) {
        if (closestObject === null) {
          char = ' ';
        } else {
          const normal = closestObject.getNormal(closestIntersection);
          const dotProduct = normal.dot(lightDirection);
          char = charFromScalarProduct(dotProduct);
        }
      }
      process.stdout.write(char);
    }
    process.stdout.write('\n');
  }
}
