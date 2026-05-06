export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const messages = req.body.messages;

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are a friendly, concise AI assistant on a website. Answer helpfully in 2-3 sentences max. Be warm and professional." }]
          },
          contents,
        }),
      }
    );

    const data = await response.json();
    
    // Debug ke liye — Vercel logs mein dikhega
    console.log("Gemini response:", JSON.stringify(data, null, 2));

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      console.error("No reply found in:", data);
      return res.status(200).json({ reply: "Response nahi aaya: " + JSON.stringify(data) });
    }

    res.status(200).json({ reply });

  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ reply: "Server error: " + err.message });
  }
}