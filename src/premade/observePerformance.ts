import { Interceptor } from "../applyInterceptor.js";

export type PerformanceCallback = (start: number, end: number) => void;

export function observePerformance(callback: PerformanceCallback): Interceptor {
  return (fetch) => async (input, init) => {
    const start = performance.now();
    const result = await fetch(input, init);

    callback(start, performance.now());

    return result;
  };
}
