/**
 * The demo page served alongside the site, framed on both the home page and
 * the playground.
 *
 * Served from this origin rather than pointing at a third party: most sites
 * refuse to be framed — `X-Frame-Options: DENY` or a `frame-ancestors` CSP —
 * and a refused frame renders blank with no error a page can catch, so someone
 * else's URL would break the day they change a header.
 */
export const DEMO_URL = `${import.meta.env.BASE_URL}demo-site.html`;
