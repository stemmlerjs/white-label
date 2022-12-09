
import * as express from 'express'

export abstract class BaseController {
  // or even private
  protected req: express.Request;
  protected res: express.Response;

  protected abstract executeImpl (): Promise<void | any>;

  public execute (req: express.Request, res: express.Response): void {
    this.req = req;
    this.res = res;

    this.executeImpl();
  }

  public static jsonResponse (res: express.Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public ok<T> (res: express.Response, dto?: T) {
    if (!!dto) {
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created (res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError (message = 'Unauthorized') {
    return BaseController.jsonResponse(this.res, 400, message);
  }

  public unauthorized (message = 'Unauthorized') {
    return BaseController.jsonResponse(this.res, 401, message);
  }

  public paymentRequired (message = 'Payment required') {
    return BaseController.jsonResponse(this.res, 402, message);
  }

  public forbidden (message = 'Forbidden') {
    return BaseController.jsonResponse(this.res, 403, message);
  }

  public notFound (message = 'Not found') {
    return BaseController.jsonResponse(this.res, 404, message);
  }

  public conflict (message = 'Conflict') {
    return BaseController.jsonResponse(this.res, 409, message);
  }

  public tooMany (message = 'Too many requests') {
    return BaseController.jsonResponse(this.res, 429, message);
  }

  public todo () {
    return BaseController.jsonResponse(this.res, 400, 'TODO');
  }

  public fail (error: Error | string) {
    console.log(error);
    return this.res.status(500).json({
      message: error.toString()
    })
  }
}