import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandlerDescriptor } from './RequestHandlerDescriptor';

export function bodyValidator(...keys: string[]): Function {
  return function (
    target: Function,
    key: string,
    desc: RequestHandlerDescriptor
  ) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
