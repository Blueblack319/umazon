import { fetchGetJSON } from './api-helpers';
import useSWR from 'swr';

export function useCheckoutSession(sessionId: string | string[]) {
  const { data, error } = useSWR(
    sessionId ? `/api/checkout_sessions/${sessionId}` : null,
    fetchGetJSON
  );
  return { data, error };
}
