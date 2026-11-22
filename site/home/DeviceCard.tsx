import { Link } from 'react-router-dom';
import { DeviceFrame, frameSize, type DeviceId, type DeviceSpec } from '../../src';

const THUMB_WIDTH = 210;
const THUMB_HEIGHT = 136;

function MiniScreen() {
  return (
    <div className="lp-mini" aria-hidden="true">
      <span className="lp-mini__bar" />
      <span className="lp-mini__hero" />
      <span className="lp-mini__cards">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

export function DeviceCard({ spec }: { spec: DeviceSpec }) {
  const size = frameSize(spec);
  const scale = Math.min(THUMB_WIDTH / size.width, THUMB_HEIGHT / size.height);

  return (
    <Link className="lp-device" to={`/playground?device=${spec.id}`}>
      <span className="lp-device__thumb">
        <DeviceFrame device={spec.id as DeviceId} scale={scale}>
          <MiniScreen />
        </DeviceFrame>
      </span>
      <span className="lp-device__meta">
        <span className="lp-device__name">{spec.label}</span>
        <span className="lp-device__size">
          {spec.width} × {spec.height}
        </span>
      </span>
    </Link>
  );
}
