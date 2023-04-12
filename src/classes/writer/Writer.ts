import fs from 'fs';

export default class Writer {
  private imageData: number[][];
  constructor(imageData: number[][]) {
    this.imageData = imageData;
  }
  write(output: string | null) {
    output ? this.writeToFile(output) : this.writeToConsole();
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

  private writeToFile(outputFile: string) {
    this.imageData;
    const header = `P3\n${this.imageData[0].length} ${this.imageData.length}\n255\n`;
    const body = this.imageData
      .map((row) =>
        row
          .map(
            (v) =>
              `${Math.round(255 * v)} ${Math.round(255 * v)} ${Math.round(
                255 * v
              )}`
          )
          .join(' ')
      )
      .join('\n');

    const fileData = `${header}${body}`;
    fs.writeFileSync(outputFile, fileData);
  }

  private writeToConsole() {
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
}
