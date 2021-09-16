import { CustomError } from 'ts-custom-error';

export class UnsupportedImageFormatError extends CustomError {}
export class FileTooLargeError extends CustomError {}
