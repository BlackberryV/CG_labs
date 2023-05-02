import { IImageReader } from '../interfaces/IImageReader';
import { IImageWriter } from '../interfaces/IImageWriter';

export abstract class ImageConverter implements IImageReader, IImageWriter {
  public abstract readImage(): void;
  public abstract writeImage(): void;
}
