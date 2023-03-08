import Ray from '../ray/Ray';
import Vector from '../vector/Vector';

export default class Plain {
  public normal: Vector;
  public point: Vector;

  constructor(normal: Vector, point: Vector) {
    this.normal = normal.normalize();
    this.point = point;
  }

  public getIntersection(ray: Ray): Vector | null {
    const denominator = this.normal.dot(ray.direction);
    if (denominator === 0) {
      return null;
    }
    const t = this.point.subtract(ray.origin).dot(this.normal) / denominator;
    if (t < 0) {
      return null;
    }
    return ray.getPoint(t);
  }
  public getNormal(){
    return this.normal
  }
}
