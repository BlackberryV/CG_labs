import { getFileExtension, normalizeArg } from './helpers';
import { ImageConverterFactory } from './ImageConverter/ImageConverterFactory';
import fs from "fs";

const args = process.argv.slice(2);

const sourceArg = args.find((arg) => arg.includes('--source='));
// SHOULD BE UNCOMMENTED - HERE ARE ARGS WHICH WILL BE USED IN THE IMPLEMENTARION OF FILE CONVERTATION
const goalFormatArg = args.find((arg) => arg.includes('--goal-format='));
const outputArg = args.find((arg) => arg.includes('--output='));

const sourceExtension = getFileExtension(normalizeArg(sourceArg));
// SHOULD BE UNCOMMENTED - HERE ARE PARSED ARGS
const source = normalizeArg(sourceArg);
const output = normalizeArg(outputArg);
const goalFormat = normalizeArg(goalFormatArg);


const bitmap = sourceArg? fs.readFileSync(source || ''): {} as Buffer;

const imageConverter =
ImageConverterFactory.createImageConverter(sourceExtension || '', goalFormat || '');
const data= imageConverter.reader.readImage(bitmap)
imageConverter.writer.writeImage(output || source?.split('.')[0] || '', data)
