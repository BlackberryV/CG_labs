import { ImageReader } from '../abstract/ImageReader';
import { IImageData } from './BMPImageReader';

export class GIFImageReader extends ImageReader {
  public validate(buffer: Buffer): boolean {
    const header = buffer.subarray(0, 6).toString();
    return header === 'GIF89a' || header === 'GIF87a';
  }

  public readImage(fileBuffer: Buffer): IImageData {
    const fileBytes = new Uint8Array(fileBuffer);

    // Отримуємо розміри зображення з заголовку та логічного екрану
    const width = (fileBytes[6] << 8) | fileBytes[7];
    const height = (fileBytes[8] << 8) | fileBytes[9];

    // Отримуємо палітру кольорів з логічного екрану
    const colorTableSize = 2 ** ((fileBytes[10] & 0b111) + 1);
    const colorTableFirst = fileBytes.slice(13, 13 + 3 * colorTableSize);

    // Знаходимо індекс початку першого кадру
    let frameStartIndex = 13 + 3 * colorTableSize;
    while (fileBytes[frameStartIndex] !== 0x21 || fileBytes[frameStartIndex + 1] !== 0xf9) {
      frameStartIndex += fileBytes[frameStartIndex] + 1;
      if (frameStartIndex >= fileBytes.length) {
        throw new Error('Invalid GIF file: no frames found');
      }
    }

    // Отримуємо байти кожного кадру та зберігаємо їх у масив
    const frames: Uint8Array[] = [];
    let frameIndex = 0;
    while (fileBytes[frameStartIndex] === 0x21 && fileBytes[frameStartIndex + 1] === 0xf9) {
      // Отримуємо розміри та налаштування кадру
      const frameWidth = (fileBytes[frameStartIndex + 5] << 8) | fileBytes[frameStartIndex + 4];
      const frameHeight = (fileBytes[frameStartIndex + 7] << 8) | fileBytes[frameStartIndex + 6];
      const hasLocalColorTable = (fileBytes[frameStartIndex + 9] & 0b10000000) === 0b10000000;
      const localColorTableSize = 2 ** ((fileBytes[frameStartIndex + 9] & 0b111) + 1);
      const colorTable: Uint8Array = hasLocalColorTable ?
      fileBytes.slice(frameStartIndex + 10, frameStartIndex + 10 + 3 * localColorTableSize) :
      colorTableFirst;

      const delayTime = (fileBytes[frameStartIndex + 15] << 8) | fileBytes[frameStartIndex + 14];

      // Отримуємо байти кадру та зберігаємо їх у масив
      const frameBytesLength = fileBytes[frameStartIndex + 10 + 3 * localColorTableSize];
      const frameBytes = fileBytes.subarray(frameStartIndex + 10 + 3 * localColorTableSize + 1, frameStartIndex + 10 + 3 * localColorTableSize + 1 + frameBytesLength);
      frames[frameIndex] = frameBytes;

      // Перехід до наступного кадру
      frameIndex++;
      frameStartIndex += 2 + frameBytesLength;
      while (fileBytes[frameStartIndex] !== 0x21 || fileBytes[frameStartIndex + 1] !== 0xf9) {
        frameStartIndex += fileBytes[frameStartIndex] + 1;
        if (frameStartIndex >= fileBytes.length) {
          break;
        }
      }
    }
    // Повертаємо об'єкт зображення
    return {
      width,
      height,
      data: frames[0],
    };
  }

}
