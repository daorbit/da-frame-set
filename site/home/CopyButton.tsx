import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({ text, className }: { text: string; className: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    void navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => {},
    );
  };

  return (
    <button
      className={className}
      type="button"
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      onClick={copy}
    >
      {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} strokeWidth={2} />}
    </button>
  );
}
