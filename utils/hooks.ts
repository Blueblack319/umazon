import { fetchGetJSON } from './api-helpers';
import useSWR from 'swr';
import fetcher from './fetcher';

export function useCheckoutSession(sessionId: string | string[]) {
  const { data, error } = useSWR(
    sessionId ? `/api/checkout_sessions/${sessionId}` : null,
    fetchGetJSON
  );
  return { data, error };
}

export function useOrdersAll(token: string) {
  const { data, error } = useSWR(['/api/ordered', token], fetcher);
  return { data, error };
}
