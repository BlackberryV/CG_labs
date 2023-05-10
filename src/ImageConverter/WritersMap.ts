import { ImageWriter } from './abstract/ImageWriter';
import { BMPImageWriter } from './classes/BMPImageWriter';
import { ImageType } from './types';

export const writersMap: Record<string, ImageWriter> = {
  [ImageType.BMP]: new BMPImageWriter(),
};
