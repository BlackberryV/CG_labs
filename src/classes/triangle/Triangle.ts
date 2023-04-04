import Vector from "../vector/Vector";
import Ray from "../ray/Ray";

export default class Triangle {
  private vertex1: Vector;
  private vertex2: Vector;
  private vertex3: Vector;

  constructor(v1: Vector, v2: Vector, v3: Vector) {
    this.vertex1 = v1;
    this.vertex2 = v2;
    this.vertex3 = v3;
  }

  public intersect(ray: Ray): Vector | null {
    const EPSILON = 0.000001;

    const edge1 = this.vertex2.subtract(this.vertex1);
    const edge2 = this.vertex3.subtract(this.vertex1);

    const h = ray.direction.cross(edge2);
    const a = edge1.dot(h);

    if (a > -EPSILON && a < EPSILON) {
      return null; // If our ray and triangle are practically parallel and will never cross
    }

    const f = 1 / a;
    const s = ray.origin.subtract(this.vertex1);
    const u = f * s.dot(h);
    if (u < 0 || u > 1) {
      return null; // Our intersection point is outside the triangle
    }
    const q = s.cross(edge1);
    const v = f * ray.direction.dot(q);
    if (v < 0 || u + v > 1) {
      return null; // Our intersection point is outside the triangle
    }
    const t = f * edge2.dot(q);
    if (t > EPSILON) {
      return ray.pointAtParameter(t);
    }
    return null; // intersection point is behind the origin of our ray
  }
}