import Ray from '../ray/Ray';
import Vector from '../vector/Vector';

export default class Disk {
  public center: Vector;
  public normal: Vector;
  public radius: number;

  constructor(center: Vector, normal: Vector, radius: number) {
    this.center = center;
    this.normal = normal.normalize();
    this.radius = radius;
  }

  public getIntersection(ray: Ray): Vector | null {
    const denominator = this.normal.dot(ray.direction);
    if (denominator == 0) {
      return null;
    }

    const t = this.normal.dot(this.center.subtract(ray.origin)) / denominator;
    if (t < 0) {
      return null;
    }

    const point = ray.getPoint(t);
    const distance = this.center.getDistanceTo(point);
    if (distance > this.radius) {
      return null;
    }

    return ray.getPoint(t);
  }

  public getNormal(){
    return this.normal
  }
}
