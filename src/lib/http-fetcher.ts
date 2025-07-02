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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTE0NTM0MzgsIm5iZiI6MTc1MTQ1MzQzOCwiZXhwIjoxNzUxNDU4MjQ2LCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUFXd2dtUmduejVHdmF6WmZqMVFna1ZkZk11M2x1WDEzQ3IyZDZiVlcwakZJdUxmWmU1cWhpUUd3YmRudG41ZVBreE1OSVlkS3V3MWRHbGkyS3FWa1pHL2dyVGN2RlQ4WDZ6L0gvc0VkMVN1SnpUcjFZUGU1L0dSWENoZW9PUDlkVmFvaVJGamsyQ25lckgyU2xzelJPVHlncGpYQlB0RU1HbG92ZjdMSnFIUGt5dWhPZTVYaWR0SlAwRHRlekxQQ0dMYU1BbXNvZTdNWDNodWUxZjBST081S1dJRE85SlMxb0puVmNwZzhleUJNPSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiJCd0huMDZoS2VFS1lrQW00R3lFTUFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6IjFQUlkwSGxpamV6YjBmSXVKaWtKV2NLQXg3YTNKbS00T3FBeV9pNzY3bXNCWlhWeWIzQmxkMlZ6ZEMxa2MyMXoifQ.CG68C5pAGBxt18_LSXWofaGQAAdt-BwTng02dbCCfaHegIGY37xSsanl4hAJXeOXkskgW6-M7ct21MdCAtdsgGc4GmteN4lMaBWpCN0-Ho5LbPCylTvoQZe1mD-DB8tXQ_FyuFzXNoU47LqlELAokEy_ozfTE82YITs6xKrvzZCo-Gi3W1AYW9PMcCg43Hx-BWp6yZKSRRH6nge-NeUmpeDzkBzuMXqcryxumL8pv3J72pS7BwDdIC2NWOdRaX7ybYFp5WlNsRdexJe3Gh27pBNpxVBUmZZx7kx4c7P41tBh-dNx4xXRH8cEpfVhJCVO5_2fLksxGeqMC2kVRCPPSQ`
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
