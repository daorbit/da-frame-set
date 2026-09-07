import type { DeviceSpec } from '../src';

/**
 * A small responsive page, so the frames demonstrate the thing they exist for:
 * the layout reflows against the device's own CSS width, not against the size
 * the mock happens to be scaled to.
 */
export function SamplePage({ spec }: { spec: DeviceSpec }) {
  return (
    <div className="sp">
      <header className="sp__bar">
        <span className="sp__logo">Acme</span>
        <nav className="sp__nav">
          <span>Product</span>
          <span>Pricing</span>
          <span>Docs</span>
        </nav>
        <span className="sp__cta">Sign up</span>
      </header>

      <section className="sp__hero">
        <h1>Everything your team ships, in one place.</h1>
        <p>
          This page is laid out at {spec.width} × {spec.height} CSS pixels — the {spec.label}'s
          real viewport. Switch devices and watch the columns fold.
        </p>
        <div className="sp__hero-actions">
          <span className="sp__btn sp__btn--primary">Start free</span>
          <span className="sp__btn">Book a demo</span>
        </div>
      </section>

      <section className="sp__grid">
        {[
          ['Fast', 'Renders in a single frame, with no images to load.'],
          ['Honest', 'The page reflows against the real viewport.'],
          ['Small', 'A few kilobytes of CSS, and nothing else.'],
        ].map(([title, body]) => (
          <article key={title} className="sp__card">
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="sp__split">
        <div>
          <h2>Scroll me</h2>
          <p>
            The screen is a real scroll container, so long pages behave inside the mock the way
            they do on the device. The scrollbar is hidden on purpose — a scrollbar drawn down
            the edge of a phone reads as chrome rather than as part of the page.
          </p>
          <p>
            Every measurement that changes the mock's outer size comes from the device spec, so
            the frame and its measured size cannot drift apart.
          </p>
        </div>
        <div className="sp__panel" />
      </section>

      <footer className="sp__footer">
        <span>© Acme</span>
        <span>Privacy · Terms</span>
      </footer>
    </div>
  );
}
