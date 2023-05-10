import { ImageReader } from '../abstract/ImageReader';

export interface IImageData {
  width: number;
  height: number;
  data: Uint8Array;
}

export class BMPImageReader extends ImageReader {
  public validate(bitmap: Buffer): boolean {
    if (bitmap[0] !== 0x42 || bitmap[1] !== 0x4d) {
      return false;
    }
    const bpp = bitmap.readUInt16LE(28);
    return bpp === 24;
  }

  public readImage(bitmap: Buffer): IImageData {
    if (bitmap[0] !== 0x42 || bitmap[1] !== 0x4d) {
      throw new Error('Invalid BMP24 format');
    }
    const offset = bitmap.readUInt32LE(10);
    const width = bitmap.readUInt32LE(18);
    const height = bitmap.readUInt32LE(22);
    const bpp = bitmap.readUInt16LE(28);

    if (bpp !== 24) {
      throw new Error(`Picture should be in BMP24 format, not BMP${bpp}`);
    }

    const imageData = new Uint8Array(width * height * 3);
    let imageDataIndex = 0;

    for (let y = height - 1; y >= 0; y--) {
      const rowOffset = offset + y * Math.ceil((width * bpp) / 32) * 4;

      for (let x = 0; x < width; x++) {
        const pixelOffset = rowOffset + x * 3;

        imageData[imageDataIndex++] = bitmap[pixelOffset + 2];
        imageData[imageDataIndex++] = bitmap[pixelOffset + 1];
        imageData[imageDataIndex++] = bitmap[pixelOffset];
      }
    }

    return {
      width,
      height,
      data: imageData,
    };
  }
}
