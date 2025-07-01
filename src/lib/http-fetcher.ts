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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTEzNjcxMjcsIm5iZiI6MTc1MTM2NzEyNywiZXhwIjoxNzUxMzcyNjM2LCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUFuSk05b0ZBaTNLbFNWTUJMVDQ5czhzbmFCUlUzZmpYOXAybzB4K1FBNzA2M2hjaTR2M01ha0U0V29vc3FHL2JhTGRRbWZhelFMSnNoY3JBd1N6dmxHWHYrNzhKeGJzNGxrbHZzM2tMdThqcndTUDk2cGkrL0I2OE50VWdhemFMNXZSVEN3N3Y0NTI2dU9qRSttTlpQM2VsNU9nZGh4UVY5NjJmYkJUSzRaRER1TmpzbFBiSDh3RE9jVWpmTWxBZEtwZXVBN3Z0MksxWmplZVZFNEtJQ1dIWWJSYS9qeEs3Q1ozRUFsTXFRMXBzPSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiJ5b2M1YVVNV04waWMyVU56dVZFTkFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6IlRFaEN5ai1ZZ2tuSGZKSHREX3Bkc3R4bmNXUEFhYW9GTklZSFZmenRLVElCYzNkbFpHVnVZeTFrYzIxeiJ9.FhLz_NwK20Llhmn1nAXO3PHuI3dAy4grgV1hpf-dmkukJzRp6LHwjYSRuDD1VGKOhZCdG8v7W7OdYjAFcIK2Y2Jw-ZgpedvXns7BVSpJxTfFBCRp86FqOtam2q2xlCbI9V_ILjmwWdhA2K6gcrHOsuFFVOa5B_Gw9VNhClfzvAcwxSSlyRanSobneB8R1cELoZc8vduXJQ53ILiTINpxdtP0yH7DsO3qPGTyzlqt0QzWIf7Cn6kCYZEHPE3U4zQAUYfxrAPnbvI3dLatQv5Vh4FGHLdPcNUq5wsGcfVfR9erovWN49BFt-pfOXudwBiORHb23fE132BCaXojKLF92w`
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
