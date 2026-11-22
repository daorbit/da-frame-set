import { STATS } from './homeContent';

export function StatsStrip() {
  return (
    <section className="lp-stats" aria-label="At a glance">
      <dl className="lp-stats__grid">
        {STATS.map((stat) => (
          <div key={stat.label} className="lp-stats__item">
            <dt className="lp-stats__label">{stat.label}</dt>
            <dd className="lp-stats__value">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
