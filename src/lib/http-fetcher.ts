import mergeUrl from "./merge-url";

export const pureHttpFetcher = async (
  resource: string,
  options?: RequestInit
): Promise<Response> => {
  const headers = new Headers(options?.headers);

  if (!(options?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  headers.set(
    "Authorization",
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkNOdjBPSTNSd3FsSEZFVm5hb01Bc2hDSDJYRSJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTA5NDA1NDAsIm5iZiI6MTc1MDk0MDU0MCwiZXhwIjoxNzUwOTQ0NjA1LCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUFRam5NVmRza09jSjlQMVNZR1VVY1lVR3NjdUd4QVMzb2Y5aTU4Y1FIbmNvaDcwV1Ywb0sxcW0vUzQwaWMrUWxPSThJczFFTythNkxwdXllUjB6N3g4bHMwVThtaWN0anp3SVlBWmhuS1ZhQWRBWHhTdkpIS2xxZ1JTWUhLdHc4ZXpNV3JDdHVvMXZaaG9meGJDWCtpRHVFc0hTQU10K01aMDVNc09RdE41dy90WU8zUFpNcklwUmE2WFdIVDFYejhDYVNyQ3hVb0s4NkU4QTVBTW1GUFlQeVRxbU1XYm44UUlXWk9rRk04SllVPSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiJEd2FROVFzdHUwMnNQNVVaeVNJNEFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6IlJkOFBabm5JNE5OVmVTZGxFWjhQMk9Qd3BYTDV1MWJTOTg2X0V6S2IxZDBCYzNkbFpHVnVZeTFrYzIxeiJ9.Dz-XM-UjNXBGbKOifH6m_TvWZS-FYJeNA2ycxrI6RBiRcZY9MD0rdBD5tVwXLsiikXS0bZlfeRUkHq2srC28KFVQSe6bmwogZBkBSTrZhHRiBZ9xTyRC1u_tCVenujonuDLRuOtXVOTWs2rM_NGN2c1-1uaD1E0YzUQDwST8Eg3h72EZPE7LZvpWxvyCfSum3nVzcM8J0jm04nW448Mij6qOOJSKZDQJzv0dw7UEwRiwox_XKZQ0UXznFwks_HVtnrpyhyCgAnXllKTajFHBG2lRhB1fm-mZvsJ6Lv4qHbnZLgg4scT5Z5mghkMZMauXCG_rkoB-FB1VTPa736ZRTA`
  );

  const response = await fetch(
    mergeUrl(process.env.NEXT_PUBLIC_REST_API_URL!, resource),
    {
      ...options,
      headers,
    }
  );

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response;
};

const httpFetcher = async <T>(
  resource: string,
  options?: RequestInit
): Promise<T | null> => {
  const response = await pureHttpFetcher(resource, options);

  if (response.status === 204) {
    return null;
  }

  if (response.headers.get("Content-Type") === "application/json") {
    return response.json() as T;
  }

  if (
    response.headers.get("Content-Type")?.startsWith("application/octet-stream")
  ) {
    return response.blob() as T;
  }

  return response.text() as T;
};

export default httpFetcher;
