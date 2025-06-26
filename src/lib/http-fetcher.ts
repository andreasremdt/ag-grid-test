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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkNOdjBPSTNSd3FsSEZFVm5hb01Bc2hDSDJYRSJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTA5MjI2OTMsIm5iZiI6MTc1MDkyMjY5MywiZXhwIjoxNzUwOTI4MjU1LCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUE4QUtybmdNQndBWkhOMDNKaG9tcTBISWRqVWZvbnA1MFBSa1ZiaHZxWkExalBVL3NGSGtSeCt5elpPWXh4UUk0N25BYXhNTzRZVlBZNHdDclU0T3NwYVVZa1gzT0pMRUpEOFA5SUdYM2w3WU83d0hkc3RsSVpYdU1mdTFtWFg5cUUzSWR5VjhJZy9yRkNvcHNwclhwUE9UZmlGOUNuTmVhYmxNYzNmQjlrREhmcVc0V2VvWW1TNEFxTnllZDk4ZXRhL1JZRS9TaWZIaVRSbVpnemFkcWtUNDBmQUp3Zzc3Qng0MkdNVnZzcEY4PSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiIxcUg0WXMyLVFrR3NBS1BuTTI5S0FBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6IktGQzlHRjBvUXpGYlRmTmxlcEdTVnFCSmVMMDRhMnNIZW1mQUZjNWlYbUVCWlhWeWIzQmxibTl5ZEdndFpITnRjdyJ9.MEmnHCdn4qnD2uNkRCYxKmKRDOi4U_QRCfvhtoVIaraSKtMx7L1LFMzMQjdvg2TDydD5vRyHIxb42ENAtNSg1muNSdzAVvQwC-dSbUEogP_OfERuHswDdwLCS6KAtORABeGub3m0EBt-pFFiiBeKW__iOaFa8qgrJyJFQ3IzdlG8dUYvFaNxiyHBJwvkBi7HhzA2lk-wY2l7jTe56XcwY7YtcpoyF9-hadepNSuY7B0ZEHxQ9qf64EYrMTSMV2UpyyYhgnQpQLlLD_saWt6HHaMSv32iPOGG_J7VdEAyjoM42XgRpWm4mZl0nXv44zb0vbXz0NgHtiNYU3tS88QmUQ`
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
