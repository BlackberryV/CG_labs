import {IImageData} from "../classes/BMPImageReader";
export abstract class ImageReader {
  public abstract validate (bitmap: Buffer): boolean;
  public abstract readImage (bitmap: Buffer): IImageData;
}
