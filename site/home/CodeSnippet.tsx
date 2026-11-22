import { CopyButton } from './CopyButton';

export function CodeSnippet({ code }: { code: string }) {
  return (
    <div className="lp-code">
      <CopyButton text={code} className="lp-code__copy" />
      <pre className="lp-code__body">
        <code>{code}</code>
      </pre>
    </div>
  );
}
