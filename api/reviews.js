export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!PLACE_ID || !API_KEY) {
    return res.status(500).json({ error: "Missing env variables" });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}&reviews_sort=newest`
    );

    const data = await response.json();

    if (!data.result) {
      return res.status(500).json({ error: "Place not found", raw: data });
    }

    const allReviews = data.result.reviews || [];

    const filtered = allReviews
      .filter((r) => r.rating >= 4)
      .map((r) => ({
        id: r.time,
        text: r.text,
        rating: r.rating,
        by: r.author_name,
        role: "Google Review",
        avatar: r.profile_photo_url,
        time: r.relative_time_description,
      }));

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json({ reviews: filtered });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}