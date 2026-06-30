import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeLang = '';

  let inList = false;
  let listItems: string[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-slate-300">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed text-sm md:text-base">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushCodeBlock = (key: number) => {
    if (codeBlockLines.length > 0) {
      elements.push(
        <pre key={`code-${key}`} className="bg-slate-900 border border-slate-800 rounded-lg p-4 my-4 overflow-x-auto font-mono text-xs md:text-sm text-slate-300 leading-relaxed">
          {codeLang && <div className="text-xs text-slate-500 font-mono mb-2 uppercase tracking-widest">{codeLang}</div>}
          <code>{codeBlockLines.join('\n')}</code>
        </pre>
      );
      codeBlockLines = [];
      inCodeBlock = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock(i);
      } else {
        if (inList) flushList(i);
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (!inList) {
        inList = true;
      }
      listItems.push(line.trim().substring(2));
      continue;
    } else if (inList && line.trim() !== '') {
      if (!line.startsWith(' ') && !line.startsWith('\t')) {
        flushList(i);
      } else {
        listItems.push(line.trim());
        continue;
      }
    } else if (inList && line.trim() === '') {
      flushList(i);
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl md:text-3xl font-extrabold text-white mt-8 mb-4 tracking-tight">
          {parseInlineMarkdown(line.substring(2))}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl md:text-2xl font-bold text-white mt-6 mb-3 tracking-tight border-b border-slate-900 pb-2">
          {parseInlineMarkdown(line.substring(3))}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg md:text-xl font-semibold text-white mt-5 mb-2">
          {parseInlineMarkdown(line.substring(4))}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={`h4-${i}`} className="text-base md:text-lg font-medium text-slate-200 mt-4 mb-2">
          {parseInlineMarkdown(line.substring(5))}
        </h4>
      );
    } else if (line.trim() === '---') {
      elements.push(<hr key={`hr-${i}`} className="my-6 border-slate-900" />);
    } else if (line.trim() === '') {
      continue;
    } else {
      elements.push(
        <p key={`p-${i}`} className="my-3 text-slate-300 leading-relaxed text-sm md:text-base">
          {parseInlineMarkdown(line)}
        </p>
      );
    }
  }

  if (inCodeBlock) flushCodeBlock(lines.length);
  if (inList) flushList(lines.length);

  return <div className="markdown-body font-sans">{elements}</div>;
};

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    const boldIndex = remaining.indexOf('**');
    const codeIndex = remaining.indexOf('`');
    const linkIndex = remaining.indexOf('[');

    const indices = [
      { type: 'bold', index: boldIndex },
      { type: 'code', index: codeIndex },
      { type: 'link', index: linkIndex }
    ].filter(x => x.index !== -1).sort((a, b) => a.index - b.index);

    if (indices.length === 0) {
      parts.push(remaining);
      break;
    }

    const next = indices[0];

    if (next.index > 0) {
      parts.push(remaining.substring(0, next.index));
      remaining = remaining.substring(next.index);
    }

    if (next.type === 'bold') {
      const closingIndex = remaining.indexOf('**', 2);
      if (closingIndex !== -1) {
        const boldText = remaining.substring(2, closingIndex);
        parts.push(<strong key={keyIdx++} className="font-semibold text-white">{boldText}</strong>);
        remaining = remaining.substring(closingIndex + 2);
      } else {
        parts.push('**');
        remaining = remaining.substring(2);
      }
    } else if (next.type === 'code') {
      const closingIndex = remaining.indexOf('`', 1);
      if (closingIndex !== -1) {
        const codeText = remaining.substring(1, closingIndex);
        parts.push(<code key={keyIdx++} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-purple-300">{codeText}</code>);
        remaining = remaining.substring(closingIndex + 1);
      } else {
        parts.push('`');
        remaining = remaining.substring(1);
      }
    } else if (next.type === 'link') {
      const closingBracket = remaining.indexOf(']');
      const openingParen = remaining.indexOf('(', closingBracket);
      const closingParen = remaining.indexOf(')', openingParen);

      if (closingBracket !== -1 && openingParen === closingBracket + 1 && closingParen !== -1) {
        const linkText = remaining.substring(1, closingBracket);
        const linkUrl = remaining.substring(openingParen + 1, closingParen);
        parts.push(
          <a key={keyIdx++} href={linkUrl} className="text-purple-400 hover:underline hover:text-purple-300 transition-colors" target={linkUrl.startsWith('http') ? '_blank' : undefined} rel={linkUrl.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {linkText}
          </a>
        );
        remaining = remaining.substring(closingParen + 1);
      } else {
        parts.push('[');
        remaining = remaining.substring(1);
      }
    }
  }

  return parts;
}
