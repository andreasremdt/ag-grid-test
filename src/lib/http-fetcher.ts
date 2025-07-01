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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTEzNTUxMDgsIm5iZiI6MTc1MTM1NTEwOCwiZXhwIjoxNzUxMzU5NTc5LCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUFRam5NVmRza09jSjlQMVNZR1VVY1lVR3NjdUd4QVMzb2Y5aTU4Y1FIbmNvaDcwV1Ywb0sxcW0vUzQwaWMrUWxPSThJczFFTythNkxwdXllUjB6N3g4bHMwVThtaWN0anp3SVlBWmhuS1ZhQWRBWHhTdkpIS2xxZ1JTWUhLdHc4ZXpNV3JDdHVvMXZaaG9meGJDWCtpRHVFc0hTQU10K01aMDVNc09RdE41dy90WU8zUFpNcklwUmE2WFdIVDFYejhDYVNyQ3hVb0s4NkU4QTVBTW1GUFlQeVRxbU1XYm44UUlXWk9rRk04SllVPSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiJtOTNBTFFBak1rR3daSlA4dVJ0Y0FBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6IjNhejY2WUhzZEtLOTc2VzZKR1Z5d1lrRjU4RDdwZlh2OW9aUlM0T0s4V3dCWm5KaGJtTmxZeTFrYzIxeiJ9.Fao_vO3iTzmEFbv8JTkWEOXVO6v3i-jHOXcFmNn7-7OPHEYbRK0ezCfas8n7iUOeE9x72LgKPU8M3CyIr9OGFgeFhBfWaS7xSlS5UiguJtu7zrHePGDnwPMsdxZdN-mLY_ijPi9_uWx3ynYkU_K_eVOmurgfHSZtnak7oVtNIJXa7OxZKcc5lDppa34H3kDu9DSUgepFC1stBjes8oum6xFS1lHZy-gAl-8ti1Zd15v3eAsdhb2fgxrSINOaGN-kEtZHLNfcxO_9_y-tJ6CaWCaodfZPKchJFd_-aNP1rT58R26voQomRocNUP_BEcfx032gLfqWpfIwU7aCj9BpnA`
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
