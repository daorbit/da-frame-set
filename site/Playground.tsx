import { useEffect, useMemo, useState } from 'react';
import {
  DEVICES,
  DEVICE_IDS,
  DeviceFrame,
  frameSize,
  getDevice,
  useFitScale,
  type DeviceId,
  type DeviceSpec,
} from '../src';
import { SamplePage } from './SamplePage';
import { DEMO_URL } from './demoSite';

const FAMILY_LABELS: Record<DeviceSpec['family'], string> = {
  apple: 'Apple',
  android: 'Android',
  windows: 'Windows',
  generic: 'Generic',
};

const FAMILY_ORDER: DeviceSpec['family'][] = ['apple', 'android', 'windows', 'generic'];

 
export function Playground() {
  const [device, setDevice] = useState<DeviceId>('macbook-pro-16');
  const [draftUrl, setDraftUrl] = useState('');
  const [url, setUrl] = useState(DEMO_URL);

  const spec = getDevice(device);
  const size = frameSize(spec);

  const { ref: stageRef, scale, measured } = useFitScale({
    contentWidth: size.width,
    contentHeight: size.height,
    padding: { x: 64, y: 64 },
  });

  const grouped = useMemo(
    () =>
      FAMILY_ORDER.map((family) => ({
        family,
        devices: DEVICE_IDS.map((id) => DEVICES[id]).filter((d) => d.family === family),
      })),
    [],
  );

  return (
    <div className="pg">
      <aside className="pg__rail">
        <div className="pg__rail-section">
          <label className="pg__label" htmlFor="pg-url">
            Page to frame
          </label>
          <form
            className="pg__url-row"
            onSubmit={(event) => {
              event.preventDefault();
              setUrl(draftUrl.trim());
            }}
          >
            <input
              id="pg-url"
              className="pg__input"
              type="url"
              placeholder="Enter a site URL to frame…"
              value={draftUrl}
              onChange={(event) => setDraftUrl(event.target.value)}
            />
            <button className="pg__btn" type="submit">
              Load
            </button>
          </form>

          {url ? (
            <div className="pg__loaded">
              <span className="pg__loaded-dot" aria-hidden="true" />
              <span className="pg__loaded-host" title={url}>
                {url === DEMO_URL ? 'Demo site' : hostOf(url)}
              </span>
              <button
                className="pg__loaded-clear"
                type="button"
                title="Clear"
                aria-label="Clear the framed page"
                onClick={() => {
                  setUrl('');
                  setDraftUrl('');
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <p className="pg__hint">
              Showing the built-in sample. Many sites block being framed, so a blank screen
              usually means that site refused — your own app and localhost will work.
            </p>
          )}
        </div>

        <div className="pg__rail-section pg__rail-section--grow">
          <span className="pg__label">Device</span>

          {grouped.map(({ family, devices }) => (
            <div key={family} className="pg__group">
              <span className="pg__group-name">{FAMILY_LABELS[family]}</span>
              <div className="pg__group-items">
                {devices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`pg__device${item.id === device ? ' pg__device--active' : ''}`}
                    aria-pressed={item.id === device}
                    title={`${item.label} — ${item.width} × ${item.height}`}
                    onClick={() => setDevice(item.id as DeviceId)}
                  >
                    <DeviceGlyph spec={item} />
                    <span className="pg__device-name">{item.label}</span>
                    <span className="pg__device-size">
                      {item.width} × {item.height}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pg__rail-section">
          <span className="pg__label">Snippet</span>
          <pre className="pg__code">
            <code>{`<DeviceFrame device="${device}" scale={${scale.toFixed(2)}}>\n  <YourPage />\n</DeviceFrame>`}</code>
          </pre>
        </div>
      </aside>

      <main className="pg__stage" ref={stageRef}>
        {/* Laid out from the first render so the stage has something to size
            against, and unpainted until that fit is measured. */}
        <DeviceFrame device={device} scale={scale} hidden={!measured} url={url || undefined}>
          {url ? <FramedSite url={url} isDemo={url === DEMO_URL} /> : <SamplePage spec={spec} />}
        </DeviceFrame>
      </main>
    </div>
  );
}
/**
 * An external page on the device's screen.
 *
 * A frame refused by `X-Frame-Options` or a `frame-ancestors` CSP loads
 * nothing and fires no error the page can read, so a notice is shown behind
 * the frame rather than in place of it: it stays visible when the frame is
 * empty and is covered when the site does load. The bundled demo is served
 * from this origin and always loads, so it never needs the warning.
 */
function FramedSite({ url, isDemo }: { url: string; isDemo: boolean }) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    setSlow(false);
    if (isDemo) return;

    const timer = window.setTimeout(() => setSlow(true), 2500);
    return () => window.clearTimeout(timer);
  }, [url, isDemo]);

  return (
    <div className="pg__frame-host">
      {slow && (
        <p className="pg__frame-note">
          Nothing here? <strong>{hostOf(url)}</strong> most likely refuses to be embedded.
          Sites send <code>X-Frame-Options</code> or a <code>frame-ancestors</code> policy to
          block it, and a browser gives the embedding page no way to detect that. Try your own
          app, or a localhost URL.
        </p>
      )}
      <iframe
        className="pg__iframe"
        src={url}
        title="Framed page"
        sandbox={
          isDemo
            ? 'allow-scripts allow-forms allow-popups allow-same-origin'
            : 'allow-scripts allow-forms allow-popups'
        }
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function DeviceGlyph({ spec }: { spec: DeviceSpec }) {
  const BOX = 26;
  const ratio = spec.width / spec.height;
  const width = ratio >= 1 ? BOX : Math.round(BOX * ratio);
  const height = ratio >= 1 ? Math.round(BOX / ratio) : BOX;

  return (
    <span className="pg__glyph" aria-hidden="true">
      <span
        className={`pg__glyph-body pg__glyph-body--${spec.chassis}`}
        style={{ width, height }}
      />
      {spec.chassis === 'laptop' && <span className="pg__glyph-base" style={{ width: width + 8 }} />}
      {(spec.chassis === 'monitor' || spec.chassis === 'tv') && (
        <span className="pg__glyph-stand" />
      )}
    </span>
  );
}

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}
