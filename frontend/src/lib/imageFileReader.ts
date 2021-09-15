import { loadImage, createCanvas } from 'canvas';
import { CustomError } from 'ts-custom-error';

export class FileTooLargeError extends CustomError {}

export type ImageFile = {
  name: string;
  type: string;
  dataUrl: string;
};

export class ImageFileReader {
  public static async read(file: File): Promise<ImageFile> {
    if (file.type === 'image/gif' && file.size > 1024 * 1024 * 4) {
      throw new FileTooLargeError();
    }

    const dataUrl = await this.readAsDataUrl(file);
    const imageFile = { name: file.name, type: file.type, dataUrl };
    return await this.resizeImageFile(imageFile, 400);
  }

  public static async readAsDataUrl(file: File): Promise<string> {
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

  private static async resizeImageFile(imageFile: ImageFile, sideLength: number): Promise<ImageFile> {
    const image = await loadImage(imageFile.dataUrl);

    const [destWidth, destHeight] = this.calcSize(image.width, image.height, sideLength);
    const canvas = createCanvas(destWidth, destHeight);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, destWidth, destHeight);
    const dataUrl = canvas.toDataURL('image/png');

    return {
      ...imageFile,
      type: 'image/png',
      dataUrl,
    };
  }

  private static calcSize(width: number, height: number, sideLength: number): [number, number] {
    if (width > height) {
      return [sideLength, sideLength / width * height];
    } else {
      return [sideLength / height * width, sideLength];
    }
  }
}
