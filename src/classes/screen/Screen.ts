export default class Screen {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  setWidth(width: number): void {
    this.width = width
  }

  setHeight(height: number): void {
    this.height = height
  }

  getHeight(): number {
    return this.height;
  }
}