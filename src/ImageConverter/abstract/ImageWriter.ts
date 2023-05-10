import {IImageData} from "../classes/BMPImageReader";

export abstract class ImageWriter {
  public abstract validate(format: string): boolean;
  public abstract writeImage(outFile: string, imageData: IImageData): void;
}
