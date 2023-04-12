import fs from 'fs';
import Writer from './Writer';

export default class WriterToFile extends Writer{
  private imageData: number[][];
  private outputFile: string;
  constructor(imageData: number[][], outputFile: string) {
    super()
    this.imageData = imageData;
    this.outputFile = outputFile;
  }
  write() {
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
    fs.writeFileSync(this.outputFile, fileData);
  }
}
