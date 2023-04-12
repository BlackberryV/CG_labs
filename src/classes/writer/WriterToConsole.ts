import Writer from './Writer';

export default class WriterToConsole extends Writer{
  private imageData: number[][];
  constructor(imageData: number[][]) {
    super()
    this.imageData = imageData;
  }
  write() {
    this.imageData
      .map((row) =>{
        row
          .map(
            (v) =>
            process.stdout.write(this.charFromScalarProduct(v))
          );
        process.stdout.write('\n')}
      )
  }

  private charFromScalarProduct(scalarProduct: number): string {
    if (scalarProduct < 0) {
      return ' ';
    } else if (scalarProduct < 0.2) {
      return '.';
    } else if (scalarProduct < 0.5) {
      return '*';
    } else if (scalarProduct < 0.8) {
      return 'O';
    } else {
      return '#';
    }
  }
}
