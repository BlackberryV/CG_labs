import { ImageReader } from './abstract/ImageReader';
import { BMPImageReader } from './classes/BMPImageReader';
import { GIFImageReader } from './classes/GIFImageReader';
import { ImageType } from './types';
import { PPMImageReader } from "./classes/PPMImageReader";

export const readersMap: Record<string, ImageReader> = {
  [ImageType.BMP]: new BMPImageReader(),
  [ImageType.GIF]: new GIFImageReader(),
  [ImageType.PPM]: new PPMImageReader(),
};
