# @fvilers/fetch-interceptor

An helper function to create and register interceptors on fetch

## Usage

```ts
import { applyInterceptor, Interceptor } from "@fvilers/fetch-interceptor";

// Simply add a custom header to the request
const addCustomHeader =
  (key: string, value: string): Interceptor =>
  (fetch) =>
  (input, init) =>
    fetch(input, { ...init, headers: { [key]: value } });

// Log elapsed time during request fetching
const logElapsedTime: Interceptor = (fetch) => async (input, init) => {
  const start = performance.now();
  const result = await fetch(input, init);
  const elapsedTime = performance.now() - start;

  console.log("Elapsed time", elapsedTime, "ms");

  return result;
};

window.fetch = applyInterceptor(
  addCustomHeader("X-Test", "42"),
  logElapsedTime
)(window.fetch);
```
