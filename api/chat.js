export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const messages = req.body.messages;

  // Gemini format mein convert karo
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

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
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, dobara try karo!";
  res.status(200).json({ reply });
}