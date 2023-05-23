import { ImageReader } from '../abstract/ImageReader';
import { IImageData } from './BMPImageReader';
import zlib from 'zlib';

export class GIFImageReader extends ImageReader {
  public validate(buffer: Buffer): boolean {
    return true;
  }

  public readImage(fileData: Buffer): IImageData {
    const header = fileData.subarray(0, 8);
  
    if (header.toString('hex') !== '89504e470d0a1a0a') {
      throw new Error('Invalid PNG file');
    }
  
    let currentIndex = 8;
  
    const dataChunks = [];
  
    while (currentIndex < fileData.length) {
      const chunkLength = fileData.readUInt32BE(currentIndex);
      currentIndex += 4;
  
      const chunkType = fileData.toString('utf8', currentIndex, currentIndex + 4);
      currentIndex += 4;
  
      // Читання даних блоку
      const chunkData = fileData.subarray(
        currentIndex,
        currentIndex + chunkLength
      );
      currentIndex += chunkLength;
  
      currentIndex += 4;
  
      dataChunks.push({ type: chunkType, data: chunkData });
  
      if (chunkType === 'IEND') {
        break;
      }
    }
  
    const imageDataChunks = dataChunks.filter((chunk) => chunk.type === 'IDAT');
    if (imageDataChunks.length === 0) {
      throw new Error('Image data not found');
    }
  
    const uncompressedData = Buffer.concat(
      imageDataChunks.map((chunk) => chunk.data)
    );
    const inflatedData = zlib.inflateSync(uncompressedData);
  
    const headerChunk = dataChunks.find((chunk) => chunk.type === 'IHDR');
    if (!headerChunk) {
      throw new Error('Header data not found');
    }
  
    const width = headerChunk.data.readUInt32BE(0);
    const height = headerChunk.data.readUInt32BE(4);
  
    const hasAlpha = dataChunks.some((chunk) => chunk.type === 'tRNS');
    const pixelData = new Uint8Array(width * height * (hasAlpha ? 4 : 3));
    let dataIndex = 0;
  
    for (let y = 0; y < height; y++) {
      const scanlineStart = y * (width * 3 + 1);
  
      for (let x = 0; x < width; x++) {
        const scanlineIndex = scanlineStart + x * 3;
        const red = inflatedData[scanlineIndex];
        const green = inflatedData[scanlineIndex + 1];
        const blue = inflatedData[scanlineIndex + 2];
  
        pixelData[dataIndex++] = red;
        pixelData[dataIndex++] = green;
        pixelData[dataIndex++] = blue;
  
        if (hasAlpha) {
          const alpha = 255;
          pixelData[dataIndex++] = alpha;
        }
      }
    }
  
    return { width, height, data: pixelData };
  }
  
}