import { ImageConverter } from '../abstract/ImageConverter';

export class PNGImageConverter extends ImageConverter {
  public readImage(): void {
    return console.log('read PNG image');
  }
  public writeImage(): void {
    return console.log('write PNG image');
  }
}
