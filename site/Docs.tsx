import type { ReactNode } from 'react';
import { DEVICE_IDS, DEVICES, type DeviceSpec } from '../src';

const FAMILY_LABELS: Record<DeviceSpec['family'], string> = {
  apple: 'Apple',
  android: 'Android',
  windows: 'Windows',
  generic: 'Generic',
};

const SECTIONS = [
  ['install', 'Install'],
  ['usage', 'Usage'],
  ['fitting', 'Fitting a container'],
  ['props', 'Props'],
  ['devices', 'Devices'],
  ['picker', 'Building a picker'],
  ['iframes', 'Framing a URL'],
  ['notes', 'Notes'],
] as const;

export function Docs() {
  return (
    <div className="docs">
      <nav className="docs__toc" aria-label="On this page">
        <span className="docs__toc-title">On this page</span>
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <article className="docs__body">
        <h1>Documentation</h1>
        <p className="docs__lede">
          Device frames for React. The page renders at the device's real CSS viewport and the
          whole frame is then scaled to fit its container.
        </p>

        <h2 id="install">Install</h2>
        <Code>{`npm install da-frame-set`}</Code>

        <h2 id="usage">Usage</h2>
        <p>
          Import the component and the stylesheet. The stylesheet carries the chassis material —
          without it you get an unstyled box.
        </p>
        <Code>{`import { DeviceFrame } from 'da-frame-set';
import 'da-frame-set/styles.css';

<DeviceFrame device="iphone-pro" scale={0.5}>
  <YourPage />
</DeviceFrame>;`}</Code>

        <h2 id="fitting">Fitting a container</h2>
        <p>
          <code>useFitScale</code> measures an element and returns the largest scale at which the
          frame fits inside it, capped at 1:1 — content is shrunk to fit but never blown up,
          which would misrepresent what it looks like at its real size.
        </p>
        <Code>{`import { DeviceFrame, frameSize, getDevice, useFitScale } from 'da-frame-set';

function Preview({ device, children }) {
  const size = frameSize(getDevice(device));
  const { ref, scale, measured } = useFitScale({
    contentWidth: size.width,
    contentHeight: size.height,
    padding: { x: 24, y: 24 },
  });

  return (
    <div ref={ref} className="stage">
      <DeviceFrame device={device} scale={scale} hidden={!measured}>
        {children}
      </DeviceFrame>
    </div>
  );
}`}</Code>
        <Callout>
          Pass the same padding the stage's CSS uses. If the two disagree, the measured fit is
          computed against room the frame does not actually have.
        </Callout>
        <p>
          <code>hidden</code> keeps the frame laid out but unpainted until the fit has been
          measured — without it the mock appears once at full size and overflows its container.
        </p>
        <p>
          It returns a <strong>callback ref</strong>, deliberately: previews often live in modals
          or panels that render nothing until they open. With an object ref the measuring effect
          runs while the ref is still empty and never runs again, leaving the frame unmeasured
          forever.
        </p>

        <h2 id="props">Props</h2>
        <div className="docs__table-wrap">
          <table className="docs__table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['device', 'DeviceId', '—', 'Which device to draw.'],
                ['scale', 'number', '1', 'Shrinks the mock; the page inside still renders at full CSS width.'],
                ['hidden', 'boolean', 'false', 'Laid out but not painted, while a fit is measured.'],
                ['url', 'string', 'example.com', 'Shown in the address bar of the browser chassis. Ignored elsewhere.'],
                ['className', 'string', '—', 'Applied to the outer wrapper.'],
                ['style', 'CSSProperties', '—', 'Applied to the outer wrapper.'],
              ].map(([prop, type, fallback, note]) => (
                <tr key={prop}>
                  <td>
                    <code>{prop}</code>
                  </td>
                  <td>
                    <code>{type}</code>
                  </td>
                  <td>{fallback}</td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="devices">Devices</h2>
        <p>
          Widths are CSS viewports, not panel resolutions — a Pixel has a 1080px-wide panel but
          lays out at 412 CSS pixels, and previewing at 1080 would show a tablet layout on a
          phone. Sizes are a little smaller than the real hardware where the real figure would
          dominate a preview pane; the layout breakpoint each one lands in is what matters, not
          millimetre fidelity.
        </p>
        <div className="docs__table-wrap">
          <table className="docs__table">
            <thead>
              <tr>
                <th>Family</th>
                <th>Id</th>
                <th>Label</th>
                <th>Viewport</th>
              </tr>
            </thead>
            <tbody>
              {DEVICE_IDS.map((id) => {
                const spec = DEVICES[id];
                return (
                  <tr key={id}>
                    <td>{FAMILY_LABELS[spec.family]}</td>
                    <td>
                      <code>{spec.id}</code>
                    </td>
                    <td>{spec.label}</td>
                    <td>
                      {spec.width} × {spec.height}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 id="picker">Building a picker</h2>
        <Code>{`import { devicesInFamily } from 'da-frame-set';

devicesInFamily('android').map((spec) => spec.label);
// Pixel Pro, Pixel, Galaxy Ultra, Galaxy, Galaxy Tab`}</Code>
        <p>
          <code>DEVICES</code> is the whole table, <code>DEVICE_IDS</code> is every id in picker
          order, and <code>getDevice(id)</code> returns one spec.
        </p>

        <h2 id="iframes">Framing a URL</h2>
        <p>
          Anything can go on the screen, an <code>&lt;iframe&gt;</code> included — but most sites
          refuse to be embedded. A <code>X-Frame-Options: DENY</code> header or a{' '}
          <code>frame-ancestors</code> CSP blocks it, and the browser gives the embedding page no
          way to detect that: the frame simply stays blank and fires no error.
        </p>
        <Callout>
          Frame your own app or a localhost URL. If you offer a URL box to users, tell them a
          blank frame usually means the site refused, rather than leaving them to guess.
        </Callout>
        <Code>{`<DeviceFrame device="iphone-pro" scale={0.5} url={url}>
  <iframe
    src={url}
    title="Framed page"
    style={{ width: '100%', height: '100%', border: 0 }}
    sandbox="allow-scripts allow-forms allow-popups"
    referrerPolicy="no-referrer"
  />
</DeviceFrame>`}</Code>
        <Callout tone="warn">
          Keep <code>allow-same-origin</code> out of that sandbox when you pair it with{' '}
          <code>allow-scripts</code>. Together they let a same-origin page script its way out of
          the sandbox entirely, which defeats the point of setting one.
        </Callout>
        <p>
          The screen hides its own scrollbar, but a framed page scrolls in its own document —
          and a cross-origin one cannot be styled from outside. When you control the framed
          page, style its scrollbar there. When you do not, clip it: give the wrapper{' '}
          <code>overflow: hidden</code> and make the iframe a scrollbar wider than it.
        </p>
        <Code>{`/* inside the framed page */
* { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,.18) transparent; }

/* or, from outside, when you cannot */
.frame-host { position: relative; overflow: hidden; width: 100%; height: 100%; }
.frame-host iframe { position: absolute; inset: 0; width: calc(100% + 16px); height: 100%; }`}</Code>

        <h2 id="notes">Notes</h2>
        <p>
          The screen is a scroll container with its scrollbar hidden — the mock stands in for
          hardware, and a scrollbar down its screen edge reads as chrome rather than as part of
          the page.
        </p>
        <p>
          Every measurement that affects the mock's outer size (bezel, radii, chrome heights,
          overhang) is applied inline from the device spec, so <code>frameSize()</code> and the
          rendered frame cannot drift apart. The stylesheet only supplies the material.
        </p>
        <p>
          Device switches cross-fade rather than tween: the chassis is a different element per
          device, so it cannot animate between shapes, and animating the wrapper's width would
          read as the device sliding sideways rather than changing.{' '}
          <code>prefers-reduced-motion</code> turns both off.
        </p>
      </article>
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="docs__code">
      <code>{children}</code>
    </pre>
  );
}

function Callout({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) {
  return <div className={`docs__callout docs__callout--${tone}`}>{children}</div>;
}
