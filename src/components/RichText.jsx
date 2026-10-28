import React from "react";
import { Link } from "react-router-dom";

// bold, italic, [text|url] pakadta hai
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]|]+\|[^\]]+\])/g;

function renderInline(text, keyPrefix) {
  return text
    .split(TOKEN)
    .filter(Boolean)
    .map((part, i) => {
      const key = `${keyPrefix}-${i}`;

      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return <strong key={key}>{part.slice(2, -2)}</strong>;
      }

      if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
        return <em key={key}>{part.slice(1, -1)}</em>;
      }

      const link = part.match(/^\[([^\]|]+)\|([^\]]+)\]$/);
      if (link) {
        const [, label, href] = link;
        const url = href.trim();
        return url.startsWith("/") ? (
          <Link key={key} to={url} className="underline hover:opacity-80">
            {label}
          </Link>
        ) : (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            {label}
          </a>
        );
      }

      return part;
    });
}

const RichText = ({ text, as: Tag = "span", className }) => {
  if (!text) return null;

  const lines = String(text).split("\n");

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {renderInline(line, i)}
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default RichText;