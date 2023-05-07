import { getInvalidFileFormatErrorText } from '../helpers';
import { ImageConverter } from './classes/ImageConverter';
import {ImageReader} from "./abstract/ImageReader";
import {ImageWriter} from "./abstract/ImageWriter";
import {BMPImageReader} from "./classes/BMPImageReader";
import {GIFImageReader} from "./classes/GIFImageReader";
import {BMPImageWriter} from "./classes/BMPImageWriter";

export enum ImageType {
  GIF = 'gif',
  BMP = 'bmp',
}

export class ImageConverterFactory {
  public static createImageConverter(readType: string, writeType: string): ImageConverter {
    let reader: ImageReader;
    let writer: ImageWriter;
    switch (readType) {
      case ImageType.BMP:
        reader = new BMPImageReader();
        break;
      case ImageType.GIF:
        reader = new GIFImageReader();
        break;
      default:
        throw new Error(getInvalidFileFormatErrorText(readType));
    }
    switch (writeType) {
      case ImageType.BMP:
        writer = new BMPImageWriter();
        break;
      default:
        throw new Error(getInvalidFileFormatErrorText(writeType));
    }

    return new ImageConverter(reader, writer)
  }
}
