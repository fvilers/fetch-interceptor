type Fetch = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;
type Interceptor = (fetch: Fetch) => Fetch;

export function applyInterceptor(...interceptors: Interceptor[]): Interceptor {
  interceptors = [...interceptors].reverse();

  return (fetch) => (input, init) =>
    interceptors.reduce((prev, curr) => curr(prev), fetch)(input, init);
}
