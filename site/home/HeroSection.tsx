import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { HeroStage } from './HeroStage';
import { INSTALL, TRUST } from './homeContent';

export function HeroSection() {
  return (
    <section className="lp-hero">
      <div className="lp-hero__copy">
        <p className="lp-hero__kicker">da-frame-set</p>

        <h1 className="lp-hero__title">
          Device frames
          <span className="lp-hero__muted"> that tell the truth.</span>
        </h1>

        <p className="lp-hero__lede">
          Laptops, phones, tablets, monitors and browser chrome for React, drawn entirely in CSS.
          Your page renders at the device's real viewport, at any size.
        </p>

        <div className="lp-hero__actions">
          <Link className="lp-btn lp-btn--primary" to="/playground">
            Open the playground
          </Link>
          <Link className="lp-link" to="/docs">
            Read the docs
            <ChevronRight size={16} strokeWidth={2.25} />
          </Link>
        </div>

        <div className="lp-install">
          <code>{INSTALL}</code>
          <CopyButton text={INSTALL} className="lp-install__copy" />
        </div>

        <p className="lp-hero__meta">{TRUST.join('  ·  ')}</p>
      </div>

      <HeroStage />
    </section>
  );
}
