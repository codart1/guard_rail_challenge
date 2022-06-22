import useSWR from 'swr';

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function useFetch<Data = any, Error = any>() {
  return useSWR<Data, Error>('', fetcher);
}
