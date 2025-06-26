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
    `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkNOdjBPSTNSd3FsSEZFVm5hb01Bc2hDSDJYRSJ9.eyJhdWQiOiI2MWRmZmQwOS01NDNhLTQ4NGUtYWJmOC1hMjczMDliNDlkYjgiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMDNlODI4NTgtZmMxNC00ZjEyLWIwNzgtYWFjNmQyNWM4N2RhL3YyLjAiLCJpYXQiOjE3NTA5MjgxNDMsIm5iZiI6MTc1MDkyODE0MywiZXhwIjoxNzUwOTMyMzQwLCJhY2N0IjowLCJhaW8iOiJBYlFBUy84WkFBQUFZU3p1dWNteWhMRzNLMCtCMFVqYndWU1oyT3JYZjdzUWxHWXE1WkhTcUVpdzlmSmFTM3BuL3FhSGdlVCs1SGN5Wjc2WUpBSWdaSlRPWnZYb25xNUd0U2pEOGVWeng4aUJoVzVBTTY4TGpGSkY0RmNTZlBIenZhYmszV1RKUXFmS2NTdk1TL0R3eEdtam9JT0JPVENHUW93Zk5RN1lFZ0JRSm9WM2E0T0ZMTTF3SHlKSVRxdS9TVS9MdG9TWDh5a2puL0RwUyt2YlRKSldtVW9MeXBxWmt3Y3FtTGZTbzRIT3Rxa05XT0xkYzVZPSIsImF6cCI6ImI4YTZiMjE3LTEzMTMtNDFiZC05YjUwLWM2MmFiZTJlNjFhMyIsImF6cGFjciI6IjEiLCJlbWFpbCI6IkFuZHJlYXMuUmVtZHRAYmlzLm9yZyIsImZhbWlseV9uYW1lIjoiUmVtZHQiLCJnaXZlbl9uYW1lIjoiQW5kcmVhcyIsImlwYWRkciI6IjE5My4xMzUuMi4xMjkiLCJuYW1lIjoiUmVtZHQsIEFuZHJlYXMiLCJvaWQiOiIwMzZkZDRiZC01ZWJmLTQ2NzgtYmRkMi1hMzE0NWZlMzczMTQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJBbmRyZWFzLlJlbWR0QGJpcy5vcmciLCJyaCI6IjEuQVRFQVdDam9BeFQ4RWstd2VLckcwbHlIMmduOTMyRTZWRTVJcV9paWN3bTBuYmhOQWF3eEFBLiIsInNjcCI6Ik1lZGFsLVJlYWQgTWVkYWwtUmVhZC1Xcml0ZSIsInNpZCI6IjAwNWU1NDg5LThlNDQtMGNkMy05M2QzLTgyNGExYTYwYWNjYSIsInN1YiI6Im03R3R0N2hqdng2VUlaVl81N2FCcGJ2QTdabms2MEk5NWNsNWFFdEhYanMiLCJ0aWQiOiIwM2U4Mjg1OC1mYzE0LTRmMTItYjA3OC1hYWM2ZDI1Yzg3ZGEiLCJ1dGkiOiI1bjYteEQybEQwLWdqOXdHU19vWUFBIiwidmVyIjoiMi4wIiwieG1zX2Z0ZCI6IkpndUxaaWxMTWV6d2pTYzg5SkZIY1hISndhZjhzQ0ZZTWZpQVl5UmlTMjhCYzNkbFpHVnVZeTFrYzIxeiJ9.VoFFhDLSKDdXwUPJtxhXO52zZqS7wUc1CmbTjFsP3P_2girdFoov-FLuUdR7UnBaocGc9gXIhZ0L5UzsX3c9qTAOkV1VUsy4UTKpfgN-2ZnyB77p_UGD0mGXvyqaQm5t-3sRseqrQJSszen6ciYDSBMiN3I0CTxj3MArHJ-q_aW8wTf40M21ghoinlPg5-rrY-pUOsA8YEb396cisYP9xOYVtoH2a0iLe0RsGMdS0N7kgoyKfuUfYmzIUY37XShR1gMWjWpZNtuCR-GrNHPIkuWvxdcc-8jwFmYh3KSvruM38w2w2YbI9HbEW3_67AzdLlA4lErb44pgSETgl_Rj1g`
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
