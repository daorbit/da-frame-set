import { useEffect, useRef, useState } from 'react';
import {
  BookText,
  Check,
  Copy,
  Layers,
  Maximize2,
  Monitor,
  Play,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { DEVICE_IDS, DeviceFrame, frameSize, getDevice, type DeviceId } from '../src';
import { DEMO_URL } from './demoSite';
import type { Route } from './router';

/** The hero mock cycles through these, so the frames sell themselves. */
const SHOWCASE: DeviceId[] = ['macbook-pro-16', 'ipad-air', 'iphone-pro', 'browser'];

const FEATURES: [LucideIcon, string, string][] = [
  [
    Monitor,
    'Real viewports',
    'Widths are CSS viewports, not panel resolutions. A Pixel has a 1080px panel but lays out at 412 CSS pixels — preview at 1080 and you are looking at a tablet layout on a phone.',
  ],
  [
    Maximize2,
    'Scaled, not squeezed',
    'The frame shrinks to fit its container; the page inside never does. The breakpoint you see is the one the real device would land in.',
  ],
  [
    Layers,
    'No assets',
    'Every chassis is gradients, shadows and border radii. A few kilobytes of CSS — no images, no sprite sheets, no fonts to load.',
  ],
  [
    ShieldCheck,
    'One source of truth',
    'Bezels, radii and chrome heights come from the device spec and are applied inline, so the rendered frame and its measured size cannot drift apart.',
  ],
];

export function Home({ navigate }: { navigate: (route: Route) => void }) {
  const [shown, setShown] = useState<DeviceId>('macbook-pro-16');
  const spec = getDevice(shown);
  const size = frameSize(spec);
  // One box for every device, so switching does not shift the page around it.
  const scale = Math.min(1000 / size.width, 490 / size.height);

  return (
    <>
      <section className="hero">
        <div className="hero__copy">
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            {DEVICE_IDS.length} devices · 0 images · CSS only
          </span>

          <h1 className="hero__title">
            Device frames that
            <br />
            <span className="hero__title-accent">tell the truth.</span>
          </h1>

          <p className="hero__lede">
            Laptops, phones, tablets, monitors and browser chrome for React — drawn entirely in
            CSS. Your page renders at the device's real viewport and the frame scales to fit, so
            a phone layout stays a phone layout at any size.
          </p>

          <div className="hero__actions">
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => navigate('playground')}
            >
              <Play size={15} strokeWidth={2.5} fill="currentColor" />
              Open the playground
            </button>
            <button className="btn btn--ghost" type="button" onClick={() => navigate('docs')}>
              <BookText size={15} strokeWidth={2} />
              Documentation
            </button>
          </div>

          <div className="hero__install">
            <span className="hero__prompt" aria-hidden="true">
              &gt;
            </span>
            <code>npm install da-frame-set</code>
            <CopyButton text="npm install da-frame-set" />
          </div>
        </div>

        <div className="hero__demo">
          <div className="hero__stage">
            <DeviceFrame device={shown} scale={scale} url={DEMO_URL}>
              {/* The same page the playground frames, so the two agree.
                  Deliberately not keyed by device: remounting the iframe would
                  tear down and reload the document on every switch, and that
                  white repaint is exactly what read as a flicker. The page
                  reflows to the new viewport on its own. */}
              <iframe
                className="hero__frame"
                src={DEMO_URL}
                title="Demo site"
                sandbox="allow-scripts allow-forms allow-popups"
                referrerPolicy="no-referrer"
              />
            </DeviceFrame>
          </div>

          <div className="hero__switch" role="group" aria-label="Preview device">
            {SHOWCASE.map((id) => (
              <button
                key={id}
                type="button"
                className={`hero__switch-btn${id === shown ? ' hero__switch-btn--active' : ''}`}
                aria-pressed={id === shown}
                onClick={() => setShown(id)}
              >
                {getDevice(id).label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features__inner">
          {FEATURES.map(([Icon, title, body]) => (
            <article key={title} className="features__item">
              <div className="features__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="snippet">
        <div className="snippet__copy">
          <h2>Three lines to a real device.</h2>
          <p>
            Drop the component around anything — a component, a route, an iframe of your staging
            site. Pair it with <code>useFitScale</code> and the frame sizes itself to whatever
            room it has.
          </p>
          <button className="btn btn--ghost" type="button" onClick={() => navigate('docs')}>
            Read the docs
          </button>
        </div>

        <pre className="snippet__code">
          <code>
            <span className="tok-kw">import</span> {'{ DeviceFrame }'}{' '}
            <span className="tok-kw">from</span> <span className="tok-str">'da-frame-set'</span>;
            {'\n'}
            <span className="tok-kw">import</span>{' '}
            <span className="tok-str">'da-frame-set/styles.css'</span>;{'\n\n'}
            {'<'}
            <span className="tok-fn">DeviceFrame</span> device=
            <span className="tok-str">"iphone-pro"</span> scale={'{0.5}'}
            {'>'}
            {'\n  <'}
            <span className="tok-fn">YourPage</span> {'/>'}
            {'\n</'}
            <span className="tok-fn">DeviceFrame</span>
            {'>'}
          </code>
        </pre>
      </section>

      <section className="feedback">
        <div className="feedback__inner">
          <h2>Tell us what's missing.</h2>
          <p>A device we don't cover, a bezel that's off, an API that fought you — send it here.</p>
          <Feedback />
        </div>
      </section>

      <footer className="site-footer">
        <span>da-frame-set — MIT licensed</span>
        <a href="https://www.npmjs.com/package/da-frame-set" target="_blank" rel="noreferrer noopener">
          npm
        </a>
      </footer>
    </>
  );
}

function Feedback() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type !== 'da-forms:height') return;
      if (ref.current) ref.current.style.height = `${e.data.height}px`;
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <iframe
      ref={ref}
      src="https://forms.daorbit.in/form/6a9e9380282c134d26c0f754/view"
      title="Feedback"
      style={{ width: '100%', height: 600, border: 0 }}
    />
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className="hero__copy-btn"
      type="button"
      aria-label={copied ? 'Copied' : 'Copy install command'}
      onClick={() => {
        // Clipboard access can be denied; failing silently beats throwing.
        void navigator.clipboard?.writeText(text).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
          },
          () => {},
        );
      }}
    >
      {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
