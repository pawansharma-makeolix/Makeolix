import React from "react";
import { Link } from "react-router-dom";

const LinkRenderer = ({ text }) => {
  // Safety check
  if (!text) return null;
  if (typeof text !== "string") return text;

  const regex = /\[\[(.*?)\|(.*?)\]\]/g;

  const elements = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Normal text
    elements.push(text.slice(lastIndex, match.index));

    const label = match[1].trim();
    const url = match[2].trim();

    // External Link
    if (/^https?:\/\//i.test(url)) {
      elements.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0EA5E9] hover:underline"
        >
          {label}
        </a>
      );
    }
    // Internal Link
    else {
      elements.push(
        <Link
          key={match.index}
          to={url}
          className="text-[#0EA5E9] hover:underline"
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