import {ImageReader} from "../abstract/ImageReader";
import {IImageData} from "./BMPImageReader";
import {EOL} from "os";

export class PPMImageReader extends ImageReader {
  public validate(bitmap: Buffer): boolean {
    const header = bitmap.toString('utf-8').split(EOL);
    const format = header[0];
    if (format !== 'P3') {
      return false;
    }

    const dimensions = header[1].trim().split(' ');
    const width = parseInt(dimensions[0]);
    const height = parseInt(dimensions[1]);

    const maxColorValue = parseInt(header[2]);
    if (isNaN(width) || isNaN(height) || isNaN(maxColorValue)) {
      return false;
    }

    const pixelDataStartIndex = bitmap.indexOf('\n', header[0].length + header[1].length + header[2].length + 3) + 1;
    const pixelData = bitmap.slice(pixelDataStartIndex);

    const pixelValues = pixelData.toString('utf-8').trim().split(/\s+/);

    for (const value of pixelValues) {
      const color = parseInt(value);
      if (isNaN(color) || color < 0 || color > maxColorValue) {
        return false;
      }
    }

    return true;
  }

  public readImage(bitmap: Buffer): IImageData {
    const header = bitmap.toString('utf-8').split('\n');
    const dimensions = header[1].trim().split(' ');
    const width = parseInt(dimensions[0]);
    const height = parseInt(dimensions[1]);
    const maxColorValue = parseInt(header[2]);

    const pixelDataStartIndex = bitmap.indexOf('\n', header[0].length + header[1].length + header[2].length + 3) + 1;
    const pixelData = bitmap.slice(pixelDataStartIndex);

    const pixelValues = pixelData.toString('utf-8').trim().split(/\s+/);
    const imageData = new Uint8Array(pixelValues.map(value => parseInt(value)));

    return {
      width,
      height,
      data: imageData,
    };
  }
}