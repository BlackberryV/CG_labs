export default class Vector {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  public subtract(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  public multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  public dot(other: Vector): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  public divide(scalar: number): Vector {
    return new Vector(this.x / scalar, this.y / scalar, this.z / scalar);
  }

  public magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  public normalize(): Vector {
    const mag = this.magnitude();
    return new Vector(this.x / mag, this.y / mag, this.z / mag);
  }

  public scale(factor: number): Vector {
    return new Vector(this.x * factor, this.y * factor, this.z * factor);
  }

  // perpendicular | normal
  public cross(other: Vector): Vector {
    return new Vector(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }

  // distance to another vector
  public distanceTo(other: Vector): number {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const dz = other.z - this.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}
