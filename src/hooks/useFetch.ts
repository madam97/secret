import { useCallback, useState } from 'react';
import IObject from '../interface/IObject';

type RunFetchParams = {
  body?: object, 
  params?: IObject,
  callback?: Function
};

type UseFetchProps = {
  url?: string,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
};

type TUseFetch<T> = {
  data: T | undefined,
  error: string | undefined,
  loading: boolean,
  runFetch({ body, params, callback}: RunFetchParams): void
};

export default function useFetch<T>({method = 'GET', url = ''}: UseFetchProps): TUseFetch<T> {

  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Runs the fetch request, used to run GET, POST, PUT, PATCH and DELETE requests
   * @param body
   * @param callback
   */
  const runFetch = useCallback(({ body, params, callback}: RunFetchParams): void => {
    /**
     * Asks down the data using the API url
     * @returns 
     */
    const fetchData = async (): Promise<T> => {
      // Replace params in url
      let endpointUrl = url;
      if (params) {
        for (const [name, value] of Object.entries(params)) {
          endpointUrl = endpointUrl.replace(':'+name, value);
        }
      }

      console.log(`FETCH start ${method} ${process.env.REACT_APP_API_BASE_URL + endpointUrl}`);

      // Init request
      let res: Response = new Response();

      let init: RequestInit = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if (method !== 'GET' && method !== 'DELETE') {
        if (!body) {
          throw Error(`missing body of the ${method} ${endpointUrl} request`);
        }

        init.body = JSON.stringify(body);
      }

      // Request
      res = await fetch(process.env.REACT_APP_API_BASE_URL + endpointUrl, init);

      const data = await res.json();

      if (!res.ok) {
        throw Error(data);
      }

      return data;
    }

    /**
     * Saves the fetched data and handles error
     */
    const getData = async (): Promise<void> => {
      try {
        const data = await fetchData(); 
        setData(data);
        setError(undefined);
        setLoading(false);

        if (callback) {
          callback();
        }
      } catch (err) {
        setData(undefined);
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('fetch was aborted');
        } else {
          if (err instanceof Error) {
            console.log('API error: ', err.message);
            setError(err.message);
          } else {
            console.log('API error: unknown');
          }
          setLoading(false);
        }
      }
    }

    getData();

  }, [url, method, setData, setError, setLoading]);

  return { data, error, loading, runFetch };

}