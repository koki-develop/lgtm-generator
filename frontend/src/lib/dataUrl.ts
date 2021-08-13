export class DataUrl {
  constructor(private dataUrl: string) {}

  public toBase64(): string {
    return this.dataUrl.slice(this.dataUrl.indexOf(',') + 1);
  }
}
