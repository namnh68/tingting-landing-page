import type { ReactNode } from "react";

export function linkifyText(text: string, phrase: string, href: string): ReactNode {
  const idx = text.indexOf(phrase);
  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-orange dark:text-brand-yellow underline underline-offset-2"
      >
        {phrase}
      </a>
      {text.slice(idx + phrase.length)}
    </>
  );
}
