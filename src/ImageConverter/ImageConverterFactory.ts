import { ImageConverter } from './classes/ImageConverter';
import { ImageReader } from './abstract/ImageReader';
import { ImageWriter } from './abstract/ImageWriter';
import { BMPImageReader } from './classes/BMPImageReader';
import { GIFImageReader } from './classes/GIFImageReader';
import { BMPImageWriter } from './classes/BMPImageWriter';

export enum ImageType {
  GIF = 'gif',
  BMP = 'bmp',
}

export class ImageConverterFactory {
  public static writersMap: Record<string, ImageWriter> = {
    [ImageType.BMP]: new BMPImageWriter(),
  };

  public static readersMap: Record<string, ImageReader> = {
    [ImageType.BMP]: new BMPImageReader(),
    [ImageType.GIF]: new GIFImageReader(),
  };

  public static createImageConverter(
    bitMap: Buffer,
    goalFormat: string
  ): ImageConverter {
    let reader: ImageReader | null = null;
    let writer: ImageWriter | null = null;

    for (const key in this.readersMap) {
      if (this.readersMap[key].validate(bitMap)) {
        reader = this.readersMap[key];
        break;
      }
    }

    for (const key in this.writersMap) {
      if (this.writersMap[key].validate(goalFormat)) {
        writer = this.writersMap[key];
        break;
      }
    }

    if (reader === null || writer === null) throw new Error('invalid format');

    return new ImageConverter(reader, writer);
  }
}
