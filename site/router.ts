import { useEffect, useState } from 'react';

export type Route = 'home' | 'docs' | 'playground';

const ROUTES: Route[] = ['home', 'docs', 'playground'];

function currentRoute(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return (ROUTES as string[]).includes(hash) ? (hash as Route) : 'home';
}

/** Hash routing, so the site works as static files on any host. */
export function useRoute(): [Route, (route: Route) => void] {
  const [route, setRoute] = useState<Route>(currentRoute);

  useEffect(() => {
    const sync = () => setRoute(currentRoute());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Scrolled to the top on a route change, so a long docs page does not open
  // halfway down after coming back from the playground.
  const navigate = (next: Route) => {
    window.location.hash = `#/${next}`;
    window.scrollTo(0, 0);
  };

  return [route, navigate];
}
