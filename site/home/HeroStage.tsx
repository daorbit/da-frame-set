import { useState } from 'react';
import { AppWindow, Laptop, Monitor, Smartphone, Tablet, type LucideIcon } from 'lucide-react';
import {
  DeviceFrame,
  frameSize,
  getDevice,
  useFitScale,
  type ChassisKind,
  type DeviceId,
} from '../../src';
import { DEMO_URL } from '../demoSite';
import { SHOWCASE } from './homeContent';

const CANVAS_PADDING = 24;

const CHASSIS_ICONS: Partial<Record<ChassisKind, LucideIcon>> = {
  laptop: Laptop,
  tablet: Tablet,
  phone: Smartphone,
  browser: AppWindow,
};

export function HeroStage() {
  const [shown, setShown] = useState<DeviceId>(SHOWCASE[0]);
  const spec = getDevice(shown);
  const size = frameSize(spec);

  const { ref, scale, measured } = useFitScale({
    contentWidth: size.width,
    contentHeight: size.height,
    padding: { x: CANVAS_PADDING * 2, y: CANVAS_PADDING * 2 },
  });

  return (
    <div className="lp-stage">
      <div className="lp-stage__canvas" ref={ref}>
        <DeviceFrame device={shown} scale={scale} hidden={!measured} url={DEMO_URL}>
          <iframe
            className="lp-stage__frame"
            src={DEMO_URL}
            title="Demo site"
            sandbox="allow-scripts allow-forms allow-popups"
            referrerPolicy="no-referrer"
          />
        </DeviceFrame>
      </div>

      <div className="lp-stage__bar">
        <div className="lp-stage__switch" role="group" aria-label="Preview device">
          {SHOWCASE.map((id) => {
            const device = getDevice(id);
            const Icon = CHASSIS_ICONS[device.chassis] ?? Monitor;
            return (
              <button
                key={id}
                type="button"
                className={`lp-stage__btn${id === shown ? ' lp-stage__btn--active' : ''}`}
                aria-pressed={id === shown}
                aria-label={device.label}
                onClick={() => setShown(id)}
              >
                <Icon size={15} strokeWidth={2} />
                <span>{device.label}</span>
              </button>
            );
          })}
        </div>
        <p className="lp-stage__readout">
          <strong>
            {spec.width} × {spec.height}
          </strong>
          CSS viewport · {Math.round(scale * 100)}%
        </p>
      </div>
    </div>
  );
}
