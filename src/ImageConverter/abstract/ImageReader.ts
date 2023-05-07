import {IImageData} from "../classes/BMPImageReader";
export abstract class ImageReader {
  public abstract readImage (bitmap: Buffer): IImageData;
}
