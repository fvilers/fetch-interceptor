import { Interceptor } from "../applyInterceptor.js";

export enum SetBehavior {
  Overwrite,
  KeepOriginal,
}

export function setHeader(
  key: string,
  value: string,
  overwrite: SetBehavior = SetBehavior.KeepOriginal
): Interceptor {
  const transform = (init?: RequestInit): RequestInit | undefined => {
    const headers = new Headers(init?.headers);

    if (headers.has(key) && overwrite === SetBehavior.KeepOriginal) {
      return init;
    }

    headers.set(key, value);

    return { ...init, headers };
  };

  return (fetch) => (input, init) => fetch(input, transform(init));
}
