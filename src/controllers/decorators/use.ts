import { RequestHandler } from 'express';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandlerDescriptor } from './RequestHandlerDescriptor';

export function use(middleware: RequestHandler): Function {
  return function (
    target: Function,
    key: string,
    desc: RequestHandlerDescriptor
  ): void {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
