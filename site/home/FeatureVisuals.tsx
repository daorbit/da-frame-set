import { getDevice } from '../../src';

export function ViewportCompare() {
  return (
    <div className="lp-compare" aria-hidden="true">
      <div className="lp-compare__row">
        <span className="lp-compare__label">Panel pixels</span>
        <span className="lp-compare__track">
          <span className="lp-compare__bar lp-compare__bar--panel">1080 px</span>
        </span>
      </div>
      <div className="lp-compare__row">
        <span className="lp-compare__label">CSS viewport</span>
        <span className="lp-compare__track">
          <span className="lp-compare__bar lp-compare__bar--css">412 px</span>
        </span>
      </div>
    </div>
  );
}

export function ScaleVisual() {
  return (
    <div className="lp-scale" aria-hidden="true">
      <span className="lp-scale__box lp-scale__box--outer">100%</span>
      <span className="lp-scale__arrow">→</span>
      <span className="lp-scale__box lp-scale__box--inner">42%</span>
    </div>
  );
}

export function AssetChips() {
  return (
    <ul className="lp-chips" aria-hidden="true">
      <li>0 images</li>
      <li>0 fonts</li>
      <li>0 sprites</li>
      <li className="lp-chips__on">CSS only</li>
    </ul>
  );
}

export function SpecChips() {
  const spec = getDevice('iphone-pro');
  const entries: [string, number][] = [
    ['width', spec.width],
    ['height', spec.height],
    ['bezel', spec.bezel],
    ['screenRadius', spec.screenRadius],
  ];

  return (
    <pre className="lp-spec" aria-hidden="true">
      <code>
        {'iphone-pro {\n'}
        {entries.map(([key, value]) => `  ${key}: ${value},\n`).join('')}
        {'}'}
      </code>
    </pre>
  );
}
