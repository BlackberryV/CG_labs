import {ImageWriter} from "../abstract/ImageWriter";
import fs from "fs";
import {IImageData} from "./BMPImageReader";

export class BMPImageWriter extends ImageWriter {
  writeImage(outFile: string, imageData: IImageData): void {
    const fileHeaderSize = 14;
    const infoHeaderSize = 40;
    const rowSize = Math.ceil(imageData.width * 3 / 4) * 4;
    const pixelArraySize = rowSize * imageData.height;
    const fileSize = fileHeaderSize + infoHeaderSize + pixelArraySize;

    const fileBuffer = Buffer.alloc(fileSize);
    const infoHeaderOffset = fileHeaderSize;

    fileBuffer.writeUInt8(0x42, 0);
    fileBuffer.writeUInt8(0x4D, 1);
    fileBuffer.writeUInt32LE(fileSize, 2);
    fileBuffer.writeUInt32LE(0, 6);
    fileBuffer.writeUInt32LE(fileHeaderSize + infoHeaderSize, 10);

    fileBuffer.writeUInt32LE(infoHeaderSize, infoHeaderOffset);
    fileBuffer.writeUInt32LE(imageData.width, infoHeaderOffset + 4);
    fileBuffer.writeInt32LE(imageData.height, infoHeaderOffset + 8);
    fileBuffer.writeUInt16LE(1, infoHeaderOffset + 12);
    fileBuffer.writeUInt16LE(24, infoHeaderOffset + 14);
    fileBuffer.writeUInt32LE(0, infoHeaderOffset + 16);
    fileBuffer.writeUInt32LE(pixelArraySize, infoHeaderOffset + 20);
    fileBuffer.writeInt32LE(2835, infoHeaderOffset + 24);
    fileBuffer.writeInt32LE(2835, infoHeaderOffset + 28);
    fileBuffer.writeUInt32LE(0, infoHeaderOffset + 32);
    fileBuffer.writeUInt32LE(0, infoHeaderOffset + 36);

    const pixelOffset = fileHeaderSize + infoHeaderSize;

    for (let y = 0; y < imageData.height; y++) {
      const rowOffset = pixelOffset + (imageData.height - y - 1) * rowSize;

      for (let x = 0; x < imageData.width; x++) {
        const pixelIndex = y * imageData.width + x;
        const pixelOffsetInRow = x * 3;

        fileBuffer.writeUInt8(imageData.data[pixelIndex * 3 + 2], rowOffset + pixelOffsetInRow);
        fileBuffer.writeUInt8(imageData.data[pixelIndex * 3 + 1], rowOffset + pixelOffsetInRow + 1);
        fileBuffer.writeUInt8(imageData.data[pixelIndex * 3], rowOffset + pixelOffsetInRow + 2);
      }
    }

    fs.writeFileSync(`${outFile}.bmp`, fileBuffer);
  }
}