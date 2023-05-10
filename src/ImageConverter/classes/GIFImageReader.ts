import {ImageReader} from "../abstract/ImageReader";
import {IImageData} from "./BMPImageReader";

export class GIFImageReader extends ImageReader {
  public validate(bitmap: Buffer): boolean {
    return false;
  }

  public readImage(bitmap: Buffer): IImageData {
    return {} as IImageData
  }

}