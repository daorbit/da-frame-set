import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { DEVICES, type DeviceId } from './devices';
import { frameSize, type DeviceSpec } from './types';

export interface DeviceFrameProps {
  /** Which device to draw. */
  device: DeviceId;
  /**
   * Shrinks the whole mock; the page inside still renders at the device's full
   * CSS width. Defaults to 1. Pair with `useFitScale` to fit a container.
   */
  scale?: number;
  /**
   * Laid out but not painted. Use it for the frame or two before a fit has
   * been measured — without it the mock appears once at full size and
   * overflows its container.
   */
  hidden?: boolean;
  /** Shown in the browser chassis's address bar. Ignored by other chassis. */
  url?: string;
  className?: string;
  style?: CSSProperties;
  /** The page to render on the device's screen. */
  children: ReactNode;
}

/** The finish a chassis defaults to when its spec does not name one. */
const DEFAULT_MATERIAL: Record<DeviceSpec['chassis'], string> = {
  laptop: 'aluminium',
  monitor: 'aluminium',
  tablet: 'aluminium',
  phone: 'titanium',
  watch: 'aluminium',
  tv: 'graphite',
  browser: 'aluminium',
};

/** How long a device swap takes. Mirrors the durations in the stylesheet. */
const SWAP_MS = 260;

/**
 * A hardware mock around a page.
 *
 * The screen renders at the device's true CSS viewport and the whole frame is
 * then scaled. Scaling rather than narrowing is the point: a 402px-wide phone
 * layout stays a phone layout at any size the container happens to be, so the
 * preview shows the breakpoint the real device would land in.
 *
 * A device change is animated as one mock changing rather than two mocks
 * crossing: the frame dips out, swaps chassis at the midpoint, and settles
 * back. Rendering the outgoing device alongside the incoming one would mean
 * two copies of `children`, and an iframe on the screen would be torn down and
 * reloaded — that white repaint is what reads as a flicker.
 */
export function DeviceFrame(props: DeviceFrameProps) {
  const { device, className, style, scale = 1, hidden } = props;

  // The device actually drawn. It lags `device` by half the animation, so the
  // chassis changes while the frame is dipped out and the change is not seen.
  const [drawn, setDrawn] = useState(device);
  const [swapping, setSwapping] = useState(false);

  useEffect(() => {
    if (device === drawn) return;

    setSwapping(true);
    const midpoint = window.setTimeout(() => setDrawn(device), SWAP_MS / 2);
    const done = window.setTimeout(() => setSwapping(false), SWAP_MS);

    return () => {
      window.clearTimeout(midpoint);
      window.clearTimeout(done);
    };
  }, [device, drawn]);

  // The footprint follows the requested device immediately, so the surrounding
  // layout eases toward the new size while the frame is dipped.
  const size = frameSize(DEVICES[device]);

  return (
    <div
      className={`dfs-swap${swapping ? ' dfs-swap--busy' : ''}${className ? ` ${className}` : ''}`}
      style={{
        ...style,
        width: size.width * scale,
        height: size.height * scale,
        visibility: hidden ? 'hidden' : undefined,
      }}
    >
      <Mock {...props} device={drawn} hidden={false} />
    </div>
  );
}

function Mock({
  device,
  scale = 1,
  hidden,
  url,
  children,
}: DeviceFrameProps) {
  const spec: DeviceSpec = DEVICES[device];
  const size = frameSize(spec);
  const material = spec.material ?? DEFAULT_MATERIAL[spec.chassis];

  const screen = (
    <div
      className="dfs__screen"
      style={{
        width: spec.width,
        height: spec.height,
        borderRadius: spec.screenRadius,
        marginTop: spec.chromeAbove,
      }}
    >
      {spec.camera === 'punch-hole' && <span className="dfs__punch-hole" />}
      {spec.camera === 'island' && <span className="dfs__island" />}
      {spec.foldSeam && <span className="dfs__fold-seam" />}
      {spec.homeIndicator && <span className="dfs__home" />}
      {children}
    </div>
  );

  // Scaling shrinks paint but not layout, so an untransformed frame would keep
  // reserving its full size. The wrapper takes the scaled footprint and the
  // frame is pinned inside it, which leaves no dead margin around the mock.
  return (
    <div
      className="dfs"
      style={{
        width: size.width * scale,
        height: size.height * scale,
        visibility: hidden ? 'hidden' : undefined,
      }}
      data-device={spec.id}
      data-family={spec.family}
    >
      <div
        className="dfs__inner"
        style={{ width: size.width, height: size.height, transform: `scale(${scale})` }}
      >
        {/* The bump sits behind the chassis, showing past its edge — the way a
            camera housing reads when a phone is seen face on. */}
        {spec.cameraBump && <span className="dfs__bump" />}

        <div
          className={`dfs__chassis dfs__chassis--${spec.chassis} dfs__chassis--${material}`}
          style={{ borderRadius: spec.chassisRadius, padding: spec.bezel }}
        >
          {spec.camera === 'notch' && <span className="dfs__notch" />}
          {spec.camera === 'dot' && <span className="dfs__dot" />}

          {spec.sideButtons && (
            <>
              <span className="dfs__btn dfs__btn--silence" />
              <span className="dfs__btn dfs__btn--vol-up" />
              <span className="dfs__btn dfs__btn--vol-down" />
              <span className="dfs__btn dfs__btn--power" />
            </>
          )}

          {spec.crown && (
            <>
              <span className="dfs__crown" />
              <span className="dfs__crown-btn" />
            </>
          )}

          {spec.chassis === 'browser' ? (
            <>
              <BrowserChromeBar
                url={url}
                height={spec.chromeAbove}
                variant={spec.browserChrome ?? 'mac'}
              />
              {/* The chrome already occupies the space above the screen, so the
                  screen must not reserve it a second time. */}
              <div
                className="dfs__screen"
                style={{ width: spec.width, height: spec.height, borderRadius: 0 }}
              >
                {children}
              </div>
            </>
          ) : (
            screen
          )}
        </div>

        {spec.chassis === 'laptop' && (
          <div
            className="dfs__base"
            style={{ height: spec.chromeBelow, marginInline: -spec.overhang }}
          >
            {spec.speakers && (
              <>
                <span className="dfs__grille dfs__grille--left" />
                <span className="dfs__grille dfs__grille--right" />
              </>
            )}
          </div>
        )}

        {spec.chassis === 'monitor' && (
          <div className="dfs__stand" style={{ height: spec.chromeBelow }}>
            <span className="dfs__stand-neck" />
            <span className="dfs__stand-foot" />
          </div>
        )}

        {spec.chassis === 'tv' && (
          <div className="dfs__tv-stand" style={{ height: spec.chromeBelow }}>
            {spec.speakers && <span className="dfs__soundbar" />}
            <span className="dfs__tv-foot dfs__tv-foot--left" />
            <span className="dfs__tv-foot dfs__tv-foot--right" />
          </div>
        )}

        {spec.chassis === 'watch' && (
          <>
            <span className="dfs__strap dfs__strap--top" />
            <span className="dfs__strap dfs__strap--bottom" />
          </>
        )}
      </div>
    </div>
  );
}

/** Tab strip, window controls and address bar, drawn above the page. */
function BrowserChromeBar({
  url,
  height,
  variant,
}: {
  url?: string;
  height: number;
  variant: 'mac' | 'windows';
}) {
  return (
    <div className={`dfs__browser-bar dfs__browser-bar--${variant}`} style={{ height }}>
      <div className="dfs__browser-top">
        {variant === 'mac' ? (
          <span className="dfs__traffic">
            <span className="dfs__traffic-dot dfs__traffic-dot--close" />
            <span className="dfs__traffic-dot dfs__traffic-dot--min" />
            <span className="dfs__traffic-dot dfs__traffic-dot--max" />
          </span>
        ) : null}

        <span className="dfs__tab dfs__tab--active">
          <span className="dfs__favicon" />
        </span>
        <span className="dfs__tab" />

        {variant === 'windows' ? (
          <span className="dfs__win-controls">
            <span className="dfs__win-btn dfs__win-btn--min" />
            <span className="dfs__win-btn dfs__win-btn--max" />
            <span className="dfs__win-btn dfs__win-btn--close" />
          </span>
        ) : null}
      </div>

      <div className="dfs__browser-address">
        <span className="dfs__nav-dots">
          <span className="dfs__nav-arrow dfs__nav-arrow--back" />
          <span className="dfs__nav-arrow dfs__nav-arrow--forward" />
        </span>
        <span className="dfs__omnibox">{url ?? 'example.com'}</span>
      </div>
    </div>
  );
}
