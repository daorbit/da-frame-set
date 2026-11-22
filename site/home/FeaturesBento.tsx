import type { ReactNode } from 'react';
import { AssetChips, ScaleVisual, SpecChips, ViewportCompare } from './FeatureVisuals';
import { FEATURES } from './homeContent';
import { SectionHeading } from './SectionHeading';

const VISUALS: ReactNode[] = [
  <ViewportCompare key="viewport" />,
  <ScaleVisual key="scale" />,
  <AssetChips key="assets" />,
  <SpecChips key="spec" />,
];

export function FeaturesBento() {
  return (
    <section className="lp-section" id="features">
      <SectionHeading
        eyebrow="Why it holds up"
        title={
          <>
            Built like the hardware, <span className="lp-accent">measured like the browser</span>
          </>
        }
      />

      <div className="lp-bento">
        {FEATURES.map((feature, index) => (
          <article key={feature.title} className="lp-bento__card">
            <span className="lp-bento__icon">
              <feature.icon size={30} strokeWidth={1.6} />
            </span>
            <h3 className="lp-bento__title">{feature.title}</h3>
            <p className="lp-bento__body">{feature.body}</p>
            <div className="lp-bento__visual">{VISUALS[index]}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
