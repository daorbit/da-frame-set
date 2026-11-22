import { useEffect, useRef } from 'react';
import { FEEDBACK_FORM_SRC } from './homeContent';
import { SectionHeading } from './SectionHeading';

export function FeedbackSection() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== 'da-forms:height') return;
      if (ref.current) ref.current.style.height = `${event.data.height}px`;
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <section className="lp-section lp-feedback" id="feedback">
      <SectionHeading
        eyebrow="Feedback"
        title={
          <>
            Tell us what's <span className="lp-accent">missing</span>
          </>
        }
        lead="A device we don't cover, a bezel that's off, an API that fought you. Send it here."
      />
      <iframe ref={ref} className="lp-feedback__frame" src={FEEDBACK_FORM_SRC} title="Feedback" />
    </section>
  );
}
