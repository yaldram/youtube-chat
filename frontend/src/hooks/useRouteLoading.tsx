import { useEffect, useState } from 'react';
import { useFetchers, useNavigation } from 'react-router-dom';

export function useRouteLoading() {
  const navigation = useNavigation();
  const fetchers = useFetchers();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    // Check if any fetchers are currently in a 'loading' state
    const areFetchersLoading = fetchers.some(
      (fetcher) => fetcher.state === 'loading',
    );

    // Check if both navigation and fetchers are in 'loading' state
    const isLoading = navigation.state === 'loading' || areFetchersLoading;

    // Update routeLoading based on loading status
    setRouteLoading(isLoading);
  }, [navigation.state, fetchers]);

  return routeLoading;
}
