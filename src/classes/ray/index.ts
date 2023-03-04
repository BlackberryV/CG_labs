import Vector from '../vector';

export default class Ray {
  public origin: Vector;
  public direction: Vector;

  constructor(origin: Vector, direction: Vector) {
    this.origin = origin;
    this.direction = direction.normalize();
  }

  public pointAtParameter(t: number): Vector {
    return this.origin.add(this.direction.multiply(t));
  }

  public getPoint(t: number): Vector {
    return this.origin.add(this.direction.scale(t));
  }

  public isPointInside(point: Vector): boolean {
    const pointDirection = point.subtract(this.origin);
    const dotProduct = pointDirection.dot(this.direction);
    return dotProduct >= 0;
  }
}
