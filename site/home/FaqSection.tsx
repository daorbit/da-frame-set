import { Plus } from 'lucide-react';
import { FAQS } from './homeContent';
import { SectionHeading } from './SectionHeading';

export function FaqSection() {
  return (
    <section className="lp-section lp-faq" id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title={
          <>
            Questions, <span className="lp-accent">answered</span>
          </>
        }
      />

      <div className="lp-faq__list">
        {FAQS.map((faq, index) => (
          <details key={faq.question} className="lp-faq__item" open={index === 0}>
            <summary className="lp-faq__question">
              {faq.question}
              <Plus size={18} className="lp-faq__icon" />
            </summary>
            <p className="lp-faq__answer">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
