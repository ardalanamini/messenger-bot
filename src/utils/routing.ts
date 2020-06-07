import { RequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Handler = RequestHandler<any, any, any, any>;

export function safe(controller: Handler): Handler;
export function safe(controllers: Handler[]): Handler[];
export function safe(controller: Handler | Handler[]): Handler | Handler[] {
  if (Array.isArray(controller)) return controller.map(item => safe(item));

  return function safe_controller(req, res, next) {
    try {
      const result = controller(req, res, next);

      if (result instanceof Promise) result.catch(next);
    } catch (error) {
      next(error);
    }
  };
}
