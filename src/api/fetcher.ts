/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from '../config';

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface FetchParams {
  url: string;
  method: HTTPMethods;
  data?: any;
  params?: URLSearchParams | Record<string, any>;
  headers?: HeadersInit;
}

const request = ({
  url,
  method = HTTPMethods.GET,
  data = null,
  params = URLSearchParams,
  headers = { 'Content-Type': 'application/json' },
}: FetchParams): Promise<any> => {
  return new Promise((resolve, reject) => {
    let requestURL = url;
    if (params) {
      const searchParams = params instanceof URLSearchParams ? params : new URLSearchParams(params);
      requestURL += `?${searchParams.toString()}`;
    }

    const options: RequestInit = {
      method,
      headers,
      body:
        data && (method === HTTPMethods.POST || method === HTTPMethods.PUT || method === HTTPMethods.DELETE)
          ? JSON.stringify(data)
          : undefined,
    };

    fetch(requestURL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const requestAPI = (
  url: string,
  method: HTTPMethods = HTTPMethods.GET,
  data: any = null,
  params: any = null,
  headers: any = { 'Content-Type': 'application/json' },
): Promise<any> => {
  const APIURL = `${BASE_URL}${url}`;
  return request({ url: APIURL, method, data, params, headers });
};
