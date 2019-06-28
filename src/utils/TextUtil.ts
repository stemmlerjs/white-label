
export class TextUtil {
  public static isUUID (text: string): boolean {
    return new RegExp('\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b').test(text)
  }
}