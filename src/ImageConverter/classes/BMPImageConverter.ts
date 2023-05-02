import { ImageConverter } from '../abstract/ImageConverter';

export class BMPImageConverter extends ImageConverter {
  public readImage(): void {
    return console.log('read BMP image');
  }
  public writeImage(): void {
    return console.log('write BMP image');
  }
}
