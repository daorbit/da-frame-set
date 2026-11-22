import { USE_CASES } from './homeContent';
import { SectionHeading } from './SectionHeading';

export function UseCases() {
  return (
    <section className="lp-section" id="use-cases">
      <SectionHeading
        eyebrow="Use cases"
        title={
          <>
            Made for the places <span className="lp-accent">your product shows up</span>
          </>
        }
      />

      <ul className="lp-uses">
        {USE_CASES.map((useCase) => (
          <li key={useCase.title} className="lp-use">
            <span className="lp-use__icon">
              <useCase.icon size={30} strokeWidth={1.6} />
            </span>
            <h3 className="lp-use__title">{useCase.title}</h3>
            <p className="lp-use__body">{useCase.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
