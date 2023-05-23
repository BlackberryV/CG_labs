import { ImageReader } from './abstract/ImageReader';
import { BMPImageReader } from './classes/BMPImageReader';
import { PNGImageReader } from './classes/PNGImageReader';
import { ImageType } from './types';
import { PPMImageReader } from './classes/PPMImageReader';

export const readersMap: Record<string, ImageReader> = {
  [ImageType.BMP]: new BMPImageReader(),
  [ImageType.PNG]: new PNGImageReader(),
  [ImageType.PPM]: new PPMImageReader(),
};
