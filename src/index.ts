import { normalizeArg } from './helpers';
import { ImageConverterFactory } from './ImageConverter/ImageConverterFactory';
import fs from 'fs';

const args = process.argv.slice(2);

const sourceArg = args.find((arg) => arg.includes('--source='));

// ARGS WHICH ARE USED IN THE IMPLEMENTARION OF FILE CONVERTATION
const goalFormatArg = args.find((arg) => arg.includes('--goal-format='));
const outputArg = args.find((arg) => arg.includes('--output='));

// PARSED ARGS
const source = normalizeArg(sourceArg);
const output = normalizeArg(outputArg);
const goalFormat = normalizeArg(goalFormatArg);

const bitmap = sourceArg ? fs.readFileSync(source || '') : ({} as Buffer);

// CREATE FORMATER
const imageConverter = ImageConverterFactory.createImageConverter(
  bitmap,
  goalFormat || ''
);

const data = imageConverter.reader.readImage(bitmap);

imageConverter.writer.writeImage(output || source?.split('.')[0] || '', data);
