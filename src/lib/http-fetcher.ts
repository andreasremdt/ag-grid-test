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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTEzNzM5MjAsIm5iZiI6MTc1MTM3MzkyMCwiZXhwIjoxNzUxMzc4NTA1LCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUF0d2JwUjQwSk9NL0o5S3JHQ1VwVGtrS0tZaXZjTEJIVCtFZjZCZ1JIakhNczR2R3RFZVRtbkc1NTloUDhjT0hjdWpXRXl4amtLdXZtME1Nb2ZsQUVScStRaUZUeVl2a053RjEvd2ZldzgrbUVJdGk3M00zallHcnVmU1d4c05qV2xsVGtyOEZ3dkJpVTdLdVpTZnZNcEtPa3RObWo4dVp5R2h0d1pOcjhKRHljSnFrQk5GdEFNdlRmUVR4ekFKYlRpRmxMSmd1M0dnZmppM3o3Sm94NWVkY3U2ZTIxRGNYVGpVTWxncmlLUWw4PSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiJ1MlV1TzhtNngwS1F5UG1VRHN3aEFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6ImhIYTVQT2tNSzVXTjRHOUxUenVEZ2hja3pRLTdEbEdNX01OeW1XU3pGandCYzNkbFpHVnVZeTFrYzIxeiJ9.Be3xVSyxk72YGF37dbmRgtn1dMSmx_UEQkwO5Saokg6kt5GPPPgou9pcJjnCsmkQrrF29Wmo5s3WeNiOWcbegcHkq1A1wOOG5hyeDQZfW_IQ0A43JGTtlpQH3MINmX5SBK7nz7LizU3VWROKzXcUuczNQ-K_PBMD5-IeS4jHVFqbHlp9Cqpnkw2aYDe_1kIkr9vXmeNpZsYzaLgKYSwIFLmFK7CpJ-QEkvpqAWFOuhdN9muJsiJYo6zfpMJcQfjTYFPZZddjY9mcEOwEmYHQv2mC0LXhB2WG5G1zTjf2aljFQCpTGtFXzXoeUp6aTbvMgGBo1xx4vHcQdssT58jzSQ`
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
