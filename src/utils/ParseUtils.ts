
import { Result } from "../core/logic/Result";

type ParseDataType = 'number' | 'string' | 'object'

class ParseArrayConfig {
  private raw: any;

  constructor (raw: any) {
    this.raw = raw;
  }

  public to (dataType: ParseDataType) : any[] {
    switch (dataType) {
      case 'number':
        return JSON.parse(this.raw) as number[];
      case 'string':
        return JSON.parse(this.raw) as string[];
      case 'object':
        return JSON.parse(this.raw) as object[];
    }

  }
}

export class ParseUtils {
  public static parseBoolean(raw: any): boolean {
    if (raw === "" || raw === undefined || raw === null || raw === "null") return false; 
    return JSON.parse(raw);
  }

  public static parseObject (raw: any): Result<any> {
    let returnData: any;
    try {
      returnData = JSON.parse(raw);
    } catch (err) {
      return Result.fail(err);
    }

    return Result.ok<any>(returnData);
  }

  public static parseArray(rawArrayString: any) : ParseArrayConfig {
    return new ParseArrayConfig(rawArrayString);
  }
}
