import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';
import { RequestHandlerDescriptor } from './RequestHandlerDescriptor';

function routeBinder(method: Methods): Function {
  return function (path: string) {
    return function (
      target: Function,
      key: string,
      desc: RequestHandlerDescriptor
    ): void {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
