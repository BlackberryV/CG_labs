import Ray from '../ray';
import Vector from '../vector';

export default class Disk {
  public center: Vector;
  public normal: Vector;
  public radius: number;

  constructor(center: Vector, normal: Vector, radius: number) {
    this.center = center;
    this.normal = normal.normalize();
    this.radius = radius;
  }

  public intersect(ray: Ray): number | null {
    const denominator = this.normal.dot(ray.direction);
    if (denominator == 0) {
      return null;
    }

    const t = this.normal.dot(this.center.subtract(ray.origin)) / denominator;
    if (t < 0) {
      return null;
    }

    const point = ray.getPoint(t);
    const distance = this.center.distanceTo(point);
    if (distance > this.radius) {
      return null;
    }

    return t;
  }
}
