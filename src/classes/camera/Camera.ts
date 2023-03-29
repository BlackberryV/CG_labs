import Vector from "../vector/Vector";

export default class Camera {
  private fov: number;
  private position: Vector;

  constructor(fov: number, pos: Vector) {
    this.fov = fov;
    this.position = pos;
  }

  setFOV(fov: number): void {
    this.fov = fov;
  }

  setPosition(pos: Vector): void {
    this.position = pos;
  }

  getPosition(): Vector {
    return this.position;
  }

  getFOV(): number {
    return this.fov;
  }
}