import { Helmet } from "react-helmet-async";

const SeoMetaDesc = ({
  title,
  description,
  url,
  image,
  publishedAt,
  updatedAt,
  type = "website",
}) => {
  return (
    <Helmet>

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <link
        rel="canonical"
        href={url}
      />
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={`https://makeolix.com${image}`} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && (
        <meta
          name="twitter:image"
          content={`https://makeolix.com${image}`}
        />
      )}
      {type === "article" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            description: description,
            image: image ? `https://makeolix.com${image}` : undefined,
            datePublished: publishedAt,
            dateModified: updatedAt || publishedAt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
            url: url,
            author: {
              "@type": "Organization",
              name: "MakeOlix Consulting",
            },
            publisher: {
              "@type": "Organization",
              name: "MakeOlix Consulting",
              logo: {
                "@type": "ImageObject",
                url: "https://makeolix.com/logo1.png",
              },
            },
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SeoMetaDesc;