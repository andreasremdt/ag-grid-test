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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTEzNTkyODQsIm5iZiI6MTc1MTM1OTI4NCwiZXhwIjoxNzUxMzY0Nzk2LCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUFRZ3kyMDVzTkxaOGNIaUs0VHIweHhHcEJ2V1RFcW00TzRGR09ibTZ5OTVPc0ZsT0VZYzY3RUxXRWVTdGxiaFhPbWpLOHdheU4xMU5NOENpeWw5NlpQMmN4WFlSanNiakJJUlpxSGtScXNmN0FGc1VOUElnYmo5cERvMVUzYkc5L3VjYkg3TUFxQXhpR085REM4dFNSeVc2MmZwMHFRTERkcHJsclc1V0szbm15alBCcHpPTCtkd1AzQzB2cWh1dk5laDB4ZWVROVJGcUM3SlFGNWt2Ymgxejg0UEFwL1RxV1ByUW9LNTZTK2lrPSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiIteFV2UHFsU05VaXB2TzR5VTVLVUFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6InNGbmNNemtxZDFzWlZGa01LNFhHRmlqd1BRWENQVXMydDlTTXg0a0NYMEVCWlhWeWIzQmxkMlZ6ZEMxa2MyMXoifQ.mCvbSAuRFNZhK2AnTCg2KJ48LDex6Say7rDvGGX0c0DQ72vyy-zxPy0pbVfYhyDw6FrBCSvc-v4iC91PJnLCw1xgqjIec4fQoiEd3ZIlTDeU7JcygFVgi6h50ZCQ-z2H5150rYD2SVsdR3a86lKR1xWqRpuGUss-TYfOrASqgq4J2hr6Ux6I68hXf30nViZkBNoFAYB9JK4q8220zKO8kSTiBCnziP9FlTgp05-yVAy2bWyGrYd2H7OksMaNsHvhLQBgCfOGwkz0RaFCCqsCuGXESMFPpRwR2pMhsfK1woS_ngOoNRxLN3-Dv9hLc97hQOUNF_7T10PbPQlhN6E8Dw`
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
