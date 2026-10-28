import React from "react";
import { Link } from "react-router-dom";

// Link ki styling ek hi jagah: bold + hover par halka zoom
const linkClass =
  "inline-block font-bold text-[#0EA5E9] hover:underline transition-transform duration-200 ease-out hover:scale-105";

// Link ke bahar ke normal text ke liye:
// **bold**, *italic*, aur \n (nayi line)
const formatPlain = (str, keyBase) => {
  if (!str) return [];

  const out = [];
  const lines = str.split("\n");

  lines.forEach((line, li) => {
    if (li > 0) out.push(<br key={`${keyBase}-br-${li}`} />);

    line.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*)/g).forEach((part, pi) => {
      if (!part) return;
      const key = `${keyBase}-${li}-${pi}`;

      if (/^\*\*[^*\n]+\*\*$/.test(part)) {
        out.push(<strong key={key}>{part.slice(2, -2)}</strong>);
      } else if (/^\*[^*\n]+\*$/.test(part)) {
        out.push(<em key={key}>{part.slice(1, -1)}</em>);
      } else {
        out.push(part);
      }
    });
  });

  return out;
};

const LinkRenderer = ({ text }) => {
  if (!text) return null;
  if (typeof text !== "string") return text;

  // Format:
  // [label|url]
  // [label|url|newtab]

  const regex = /\[(.*?)\|(.*?)(?:\|(newtab))?\]/g;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Normal text before link
    elements.push(
      ...formatPlain(text.slice(lastIndex, match.index), `t${match.index}`)
    );

    const label = match[1].trim();
    const url = match[2].trim();
    const target = match[3]?.trim();

    const isNewTab = target === "newtab";
    const isExternal = /^https?:\/\//i.test(url);

    if (isExternal) {
      elements.push(
        <a
          key={match.index}
          href={url}
          target={isNewTab ? "_blank" : "_self"}
          rel={isNewTab ? "noopener noreferrer" : undefined}
          className={linkClass}
        >
          {label}
        </a>
      );
    } else {
      elements.push(
        <Link
          key={match.index}
          to={url}
          className={linkClass}
          target={isNewTab ? "_blank" : undefined}
          rel={isNewTab ? "noopener noreferrer" : undefined}
        >
          {label}
        </Link>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Remaining text
  elements.push(...formatPlain(text.slice(lastIndex), "end"));

  return <>{elements}</>;
};

export default LinkRenderer;