import React from "react";
import { Link } from "react-router-dom";

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
    elements.push(text.slice(lastIndex, match.index));

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
          className="text-[#0EA5E9] hover:underline"
        >
          {label}
        </a>
      );
    } else {
      elements.push(
        <Link
          key={match.index}
          to={url}
          className="text-[#0EA5E9] hover:underline"
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
  elements.push(text.slice(lastIndex));

  return <>{elements}</>;
};

export default LinkRenderer;