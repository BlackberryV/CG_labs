import {ImageWriter} from "../abstract/ImageWriter";
import {IImageData} from "./BMPImageReader";
import fs from "fs";

export class PPMImageWriter extends ImageWriter {
  public validate(format: string): boolean {
    return format === 'ppm';
  }

  public writeImage(outFile: string, imageData: IImageData): void {
    const { width, height, data } = imageData;
    const maxColorValue = 255; // Assuming 8-bit color depth

    let ppmData = `P3\n${width} ${height}\n${maxColorValue}\n`;

    for (let i = 0; i < data.length; i += 3) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      ppmData += `${r} ${g} ${b}\n`;
    }
    fs.writeFileSync(`${outFile}.ppm`, ppmData, 'utf-8');
  }
}