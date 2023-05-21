import { ImageWriter } from './abstract/ImageWriter';
import { BMPImageWriter } from './classes/BMPImageWriter';
import { ImageType } from './types';
import {PPMImageWriter} from "./classes/PPMImageWriter";

export const writersMap: Record<string, ImageWriter> = {
  [ImageType.BMP]: new BMPImageWriter(),
  [ImageType.PPM]: new PPMImageWriter(),
};
