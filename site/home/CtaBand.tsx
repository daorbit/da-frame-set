import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function CtaBand() {
  return (
    <section className="lp-cta">
      <div className="lp-cta__inner">
        <img className="lp-cta__logo" src="/new-logo.png" alt="" width={112} height={112} />
        <div className="lp-cta__copy">
          <h2 className="lp-cta__title">Put your product on every screen.</h2>
          <p className="lp-cta__lead">One install, one component, and the real viewport of every device.</p>
        </div>
        <div className="lp-cta__actions">
          <Link className="lp-btn lp-btn--primary" to="/playground">
            Open the playground
          </Link>
          <Link className="lp-link" to="/docs">
            Read the docs
            <ChevronRight size={16} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
