
import React, { useMemo } from "react";
import { CalendarDays, Clock3, Eye } from "lucide-react";
import { BlogAuthors } from "./data/BlogAuthors";

// Calculate total readable words from blog blocks
const countWords = (value = "") => {
  if (typeof value !== "string") return 0;

  return value.trim()
    ? value.trim().split(/\s+/).length
    : 0;
};

const countBlockWords = (blocks = []) => {
  return blocks.reduce((total, block) => {
    let words = 0;

    if (block.text) {
      words += countWords(block.text);
    }

    if (block.boldText) {
      words += countWords(block.boldText);
    }

    if (block.normalText) {
      words += countWords(block.normalText);
    }

    if (block.heading) {
      words += countWords(block.heading);
    }

    if (Array.isArray(block.items)) {
      block.items.forEach((item) => {
        if (typeof item === "string") {
          words += countWords(item);
        } else if (item && typeof item === "object") {
          words += countWords(item.title);
          words += countWords(item.description);
        }
      });
    }

    if (block.data) {
      words += countWords(
        block.data.headers?.join(" ")
      );

      block.data.rows?.forEach((row) => {
        words += countWords(row.join(" "));
      });
    }

    return total + words;
  }, 0);
};

const getReadingTime = (sections = []) => {
  let totalWords = 0;

  sections.forEach((section) => {
    if (section.type === "blogcontent") {
      totalWords += countBlockWords(
        section.data?.blocks || []
      );
    }

    if (section.type === "faq") {
      const faqs = section.data?.faqdata || [];

      faqs.forEach((faq) => {
        totalWords += countWords(faq.question);
        totalWords += countWords(faq.answer);
      });
    }
  });

  // Average reading speed: 200 words per minute
  return Math.max(1, Math.ceil(totalWords / 200));
};

const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

const BlogMetaInfo = ({
  publishedAt,
  authorId,
  sections = [],
  views = 0,
}) => {
  const author = BlogAuthors[authorId];

  const readingTime = useMemo(
    () => getReadingTime(sections),
    [sections]
  );

  return (
    <div className="my-6 space-y-4">

      {/* Author */}
      {author && (
        <div className="flex items-center gap-3">

          <img
            src={author.image}
            alt={author.name}
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover"
          />

          <div>
            <p className="text-sm font-semibold text-white">
              {author.name}
            </p>

            <p
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {author.role}
            </p>
          </div>

        </div>
      )}

      {/* Metadata */}
      <div
        className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs"
        style={{ color: "var(--text-muted)" }}
      >

        {publishedAt && (
          <div className="flex items-center gap-1.5">
            <CalendarDays size={15} />
            <span>{formatDate(publishedAt)}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Eye size={15} />
          <span>
            {Number(views).toLocaleString("en-IN")} views
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock3 size={15} />
          <span>{readingTime} min read</span>
        </div>

      </div>
    </div>
  );
};

export default BlogMetaInfo;