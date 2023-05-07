import {IImageData} from "../classes/BMPImageReader";

export abstract class ImageWriter {
  public abstract writeImage (outFile: string, imageData: IImageData): void;
}
