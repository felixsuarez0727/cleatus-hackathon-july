export function countTokens(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.round(words * 1.3);
}

export async function callOpenAI(prompt: string): Promise<string> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) throw new Error('OpenAI API key not configured');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an AI assistant specialized in government contracting.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

export function cleanDocuments(text: string): string {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}
