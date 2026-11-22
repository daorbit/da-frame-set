import { CodeSnippet } from './CodeSnippet';
import { STEPS } from './homeContent';
import { SectionHeading } from './SectionHeading';

export function HowItWorks() {
  return (
    <section className="lp-band" id="how">
      <div className="lp-band__inner">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Three steps to a <span className="lp-accent">real device</span>
            </>
          }
          lead="Drop the component around anything: a component, a route, or an iframe of your staging site."
        />

        <ol className="lp-steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="lp-step">
              <span className="lp-step__num">{index + 1}</span>
              <h3 className="lp-step__title">{step.title}</h3>
              <p className="lp-step__body">{step.body}</p>
              <CodeSnippet code={step.code} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
