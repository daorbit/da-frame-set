import { Link } from 'react-router-dom';
import { GITHUB_URL, ISSUES_URL, NPM_URL } from './homeContent';

const PRODUCT_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/playground', label: 'Playground' },
  { to: '/docs', label: 'Documentation' },
];

const SECTION_LINKS = [
  { href: '#devices', label: 'Devices' },
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
];

const RESOURCE_LINKS = [
  { href: NPM_URL, label: 'npm' },
  { href: GITHUB_URL, label: 'GitHub' },
  { href: ISSUES_URL, label: 'Report an issue' },
];

export function SiteFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-footer__inner">
        <div className="lp-footer__brand">
          <span className="lp-footer__logo">
            <img src="/new-logo.png" alt="" width={44} height={44} />
            da-frame-set
          </span>
          <p>Device frames for React, drawn in CSS. Honest viewports at any size.</p>
        </div>

        <nav className="lp-footer__col" aria-label="Product">
          <h3 className="lp-footer__heading">Product</h3>
          {PRODUCT_LINKS.map((link) => (
            <Link key={link.to} className="lp-footer__link" to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="lp-footer__col" aria-label="On this page">
          <h3 className="lp-footer__heading">On this page</h3>
          {SECTION_LINKS.map((link) => (
            <a key={link.href} className="lp-footer__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="lp-footer__col" aria-label="Resources">
          <h3 className="lp-footer__heading">Resources</h3>
          {RESOURCE_LINKS.map((link) => (
            <a key={link.href} className="lp-footer__link" href={link.href} target="_blank" rel="noreferrer noopener">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="lp-footer__bottom">
        <span>© {new Date().getFullYear()} da-frame-set</span>
        <span>MIT licensed</span>
      </div>
    </footer>
  );
}
