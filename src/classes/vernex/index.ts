import Ray from '../ray';
import Vector from '../vector';

export default class Vertex {
  public position: Vector;

  constructor(position: Vector) {
    this.position = position;
  }

  public getRayTo(other: Vertex): Ray {
    const direction = other.position.subtract(this.position);
    return new Ray(this.position, direction);
  }

  public getLengthTo(vertex: Vertex) {
    const { x: thisX, y: thisY, z: thisZ } = this.position;
    const { x: vertexX, y: vertexY, z: vertexZ } = vertex.position;
    return Math.sqrt(
      (thisX - vertexX) * (thisX - vertexX) +
        (thisX - vertexY) * (thisX - vertexY) +
        (thisX - vertexZ) * (thisX - vertexZ)
    );
  }

  public toVector() {
    return new Vector(this.position.x, this.position.y, this.position.z);
  }
}
