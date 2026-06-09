export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const API_KEY = process.env.GOOGLE_API_KEY;
  const PLACE_ID = "ChIJSaJt6AflDDkRTPHvvIPh4AU";

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": "reviews,rating,userRatingCount",
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: "API error", raw: data });
    }

    const allReviews = data.reviews || [];

    const filtered = allReviews
      .filter((r) => r.rating >= 4)
      .map((r) => ({
        id: r.name,
        text: r.text?.text || "",
        rating: r.rating,
        by: r.authorAttribution?.displayName || "Google User",
        role: "Google Review",
        avatar: r.authorAttribution?.photoUri || "",
        time: r.relativePublishTimeDescription,
      }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json({ reviews: filtered });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}