import { ImageConverter } from './classes/ImageConverter';
import { ImageReader } from './abstract/ImageReader';
import { ImageWriter } from './abstract/ImageWriter';
import { writersMap } from './WritersMap';
import { readersMap } from './ReadersMap';

export class ImageConverterFactory {
  public static createImageConverter(
    bitMap: Buffer,
    goalFormat: string
  ): ImageConverter {
    let reader: ImageReader | null = null;
    let writer: ImageWriter | null = null;

    for (const key in readersMap) {
      if (readersMap[key].validate(bitMap)) {
        reader = readersMap[key];
        break;
      }
    }

    for (const key in writersMap) {
      if (writersMap[key].validate(goalFormat)) {
        writer = writersMap[key];
        break;
      }
    }

    if (reader === null || writer === null) throw new Error('invalid format');

    return new ImageConverter(reader, writer);
  }
}
