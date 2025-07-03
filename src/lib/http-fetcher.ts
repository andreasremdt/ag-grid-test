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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Il9qTndqZVNudlRUSzhYRWRyNVFVUGtCUkxMbyJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTE1MzM3ODQsIm5iZiI6MTc1MTUzMzc4NCwiZXhwIjoxNzUxNTM4Njc1LCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUE4UWhlM05DUG03RC9aR3Y3SVZVaE1aWGxHSm5ZWVVGNlJRdHJtQzFlWHN5U3E3Yjl3SlREWU1kbVNLR0JpemtTSkVOM1ZxRVp6YXhOVUJOMUR3UGhhdFNpYUpqVE5xb3Bpa2JjYVBGb0JMVUlzL0VmR21Jd00zZW15RDU2cWtaaFZZZkJTRTE5Y3AzcTF3NFpvR2Joa3dvWG9nbTVPSkU4bzUyeEJWNkYxVjZ5L0NSekVTM1A2NlFyOVlJb1BIaHhuVTl1WGxxS2M4TU5RVFlFVDlDTWhoOTVsY2dRYlVLR2k1ZGNDOThCeGhrPSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiJlaktLWVotRDJrNjAxQmtQaEJRZUFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6Ikp0cUkxdzQ2R2ZOTkU5cTBaSjFrT240YWY3eWJTSHlZSEtiRUFtZkNZd2dCWm5KaGJtTmxZeTFrYzIxeiJ9.EWC7uY-jJQM2ssHynRDv_eRFLHpb3ewmw5oM2cYWtVlMzkTJnkw9ZFmqdCHpapQbhERn9YpzIRMoIYHpAJ8XdLfguVzBTKaYJe3ldkXOVBLakQohi4suZvSVpDgfZ4PgBO98vYKdobtVsqwklXUSlRHzzyAtE9ZfkvxSS95Y1lcmLmn0bTXhLNaKefuola4oEJoyZy9FUXUVbrVWe7nIjmrccG52yexHS-BTMcq8s1SHqWG4tZGgrjOgyvTyDOvj9-QHxik8hDcKrCvUhiqdPRMlD7X4IU4XEhERN8rm82Am5mDTZpNkOR5WMVX_61zogAm_mdivNImhgnvEGlvltw`
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
