import { useMemo, useState } from 'react';
import { DEVICE_IDS, DEVICES, type DeviceSpec } from '../../src';
import { DeviceCard } from './DeviceCard';
import { FAMILY_TABS, type FamilyFilter } from './homeContent';
import { SectionHeading } from './SectionHeading';

const ALL_DEVICES = DEVICE_IDS.map((id) => DEVICES[id] as DeviceSpec);

export function GallerySection() {
  const [family, setFamily] = useState<FamilyFilter>('all');

  const devices = useMemo(
    () => ALL_DEVICES.filter((spec) => family === 'all' || spec.family === family),
    [family],
  );

  return (
    <section className="lp-section" id="devices">
      <SectionHeading
        eyebrow="Devices"
        title={
          <>
            Every screen your <span className="lp-accent">users have</span>
          </>
        }
        lead="Phones, tablets, laptops, monitors, watches, TVs and browser windows. Pick one to open it in the playground."
      />

      <div className="lp-filter" role="group" aria-label="Filter by family">
        {FAMILY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`lp-filter__btn${tab.id === family ? ' lp-filter__btn--active' : ''}`}
            aria-pressed={tab.id === family}
            onClick={() => setFamily(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="lp-gallery">
        {devices.map((spec) => (
          <li key={spec.id}>
            <DeviceCard spec={spec} />
          </li>
        ))}
      </ul>
    </section>
  );
}
