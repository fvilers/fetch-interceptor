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
    fetch(input, { ...init, headers: { ...init?.headers, [key]: value } });

// Log elapsed time during request fetching
const logElapsedTime: Interceptor = (fetch) => async (input, init) => {
  const start = performance.now();
  const result = await fetch(input, init);
  const elapsedTime = performance.now() - start;

  console.log("Elapsed time", elapsedTime, "ms");

  return result;
};

// Apply the interceptors on the original fetch implementation
window.fetch = applyInterceptor(
  addCustomHeader("X-Test", "42"),
  logElapsedTime
)(window.fetch);
```

## Premade interceptors

### setHeader

This interceptor accepts as parameters a `key` (string) and `value` (string) that you want to add to the headers collection. By default, it won't overwrite an existing value but you can force it using the third parameter: `overwrite` (boolean).

```ts
import { applyInterceptor } from "@fvilers/fetch-interceptor";
import {
  setHeader,
  SetBehavior,
} from "@fvilers/fetch-interceptor/premade/setHeader";

window.fetch = applyInterceptor(
  setHeader("X-Test", "42", SetBehavior.Overwrite)
)(window.fetch);
```
