import { CustomError } from 'ts-custom-error';

export class FileTooLargeError extends CustomError {}

export class ImageFileReader {
  public static async readAsDataUrl(file: File): Promise<string> {
    if (file.size > 1024 * 1024 * 4) {
      throw new FileTooLargeError();
    }

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = err => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }
}
