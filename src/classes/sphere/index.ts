import Ray from '../ray';
import Vector from '../vector';

export default class Sphere {
  public center: Vector;
  public radius: number;

  constructor(center: Vector, radius: number) {
    this.center = center;
    this.radius = radius;
  }

  public intersect(ray: Ray): boolean {
    const oc = ray.origin.subtract(this.center);
    const a = ray.direction.dot(ray.direction);
    const b = 2 * oc.dot(ray.direction);
    const c = oc.dot(oc) - this.radius * this.radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      return false;
    } else {
      const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return t1 >= 0 || t2 >= 0;
    }
  }

  public getIntersections(ray: Ray): [Vector, Vector] | null {
    const oc = ray.origin.subtract(this.center);
    const a = ray.direction.dot(ray.direction);
    const b = 2 * oc.dot(ray.direction);
    const c = oc.dot(oc) - this.radius * this.radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      return null;
    } else {
      const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      const p1 = ray.pointAtParameter(t1);
      const p2 = ray.pointAtParameter(t2);
      return [p1, p2];
    }
  }
}
