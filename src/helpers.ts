export const normalizeArg = (arg?: string) =>
  arg ? arg.split('=')[1] : undefined;

export const getFileExtension = (arg?: string) =>
  arg ? arg.split('.').pop() : undefined;

export const getInvalidFileFormatErrorText = (fileFormat?: string) => {
  return fileFormat
    ? `you are trying to open .${fileFormat} file, but only .bmp and .png files are supported`
    : 'you must enter --source param to open a file';
};
