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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkNOdjBPSTNSd3FsSEZFVm5hb01Bc2hDSDJYRSJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTEwMTEwMTEsIm5iZiI6MTc1MTAxMTAxMSwiZXhwIjoxNzUxMDE1MTUzLCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUFXb2hyT1I1dUwzc0IxSVdXSFpEMDF2QWY4eEZjaFFnb0ptd0V0ZHNsRHdWblBQUEh1YWN5OTFxR0JMcDJTci8wL0xDMERrZU1MQjlaYlpDVEFJOENGVzBvKzFPKzZybysrQWNJSHFXclRKSVFxL2FuYlhab1lLNFpVZlhHd2VoMHlaU0liamNTNDJRdjdWZW9lLy9DMUVUczFLQTI0WmR2eVZ3YklYZGRVbTA2aFA0REYwcjVjVElvQWljOWVVOHhCQjFWeXBiRkFHL0xDN2ptMnVJV1AwTm5MWW1Qa0V3RGl0MytKYjRBNjRjPSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiJyLW1hY05vVGdrU1hfODlaYTIwTEFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6IkFYN3RGM1hIZ0NTaVQ3a3ZDZ0RWc094eU4wZFp4TTA2UWtaRDVST2hnNFFCWlhWeWIzQmxibTl5ZEdndFpITnRjdyJ9.KywdwZJg5wevOlWCZYdpNVu90ppYDKjRfYkVO5bWZxp9yOd-cD7l8Gh9sLiMsUd6o3QKfxLx58volMu_S8aBoHjectOPw1C5YOJCresQmYXYu3XMo1C3ilpCR-o3VtWT522X7SQJIkiUuyt_GG3drwbYfIyjfDhW30DelEhUdlpgVZJZ5wZZ41vkYExyT2-aUqDGxWjeT1nuO20R-uv8vWZIelYG1qdqj-2nAR5MOJKByR5_tILSlKmmEhem-4nb3NgoYAJR-knXU52MFMOwig4QdwcxCkDweVbJc5l9vOpWrNNjUP2EsYThVnGiSue0qh5_6jXLkw7ZGbAY7dZqnA`
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
