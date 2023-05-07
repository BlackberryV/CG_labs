import { ImageReader } from '../abstract/ImageReader';
import { ImageWriter } from '../abstract/ImageWriter';

export class ImageConverter {
  public reader: ImageReader;
  public writer: ImageWriter;
  constructor(reader: ImageReader, writer: ImageWriter) {
    this.reader = reader;
    this.writer = writer;
  }
}
