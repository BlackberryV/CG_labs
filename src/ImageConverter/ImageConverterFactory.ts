import { getInvalidFileFormatErrorText } from '../helpers';
import { ImageConverter } from './abstract/ImageConverter';
import { BMPImageConverter } from './classes/BMPImageConverter';
import { PNGImageConverter } from './classes/PNGImageConverter';

export enum ImageType {
  PNG = 'png',
  BMP = 'bmp',
}

export class ImageConverterFactory {
  public static createImageFormater(type?: string): ImageConverter {
    switch (type) {
      case ImageType.BMP:
        return new BMPImageConverter();
      case ImageType.PNG:
        return new PNGImageConverter();
      default:
        throw new Error(getInvalidFileFormatErrorText(type));
    }
  }
}
