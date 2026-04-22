export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  thumbnail: string;
  link: string;
  featured?: boolean;
  codeSnippet?: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "infoblend",
    title: "InfoBlend",
    tagline: "AI-powered in-page intelligence.",
    description: "Chrome extension (Manifest V3). AI-powered in-page definitions, page summaries, ad blocking, and intelligent form auto-fill. All client-side, all private.",
    tags: ["JavaScript", "Chrome API", "AI", "Manifest V3"],
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/RIxiV1",
    featured: true,
    color: "#256af4",
    codeSnippet: `chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
  if (req.action === "summarize") {
    ai.summarize(document.body.innerText)
      .then(s => sendResponse({ summary: s }));
    return true; // keep channel open
  }
});`
  },
  {
    id: "subsentry",
    title: "SubSentry",
    tagline: "Your fin-bestie for subscription tracking.",
    description: "Stop letting subscriptions ghost your bank account. SubSentry tracks, categorizes, and alerts you before renewals hit.",
    tags: ["TypeScript", "React", "Finance"],
    category: "Frontend",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/RIxiV1",
    featured: true,
    color: "#8b5cf6",
    codeSnippet: `const calcMonthly = (subs: Subscription[]) =>
  subs.reduce((acc, s) =>
    acc + (s.frequency === 'monthly' ? s.price : s.price / 12)
  , 0);`
  },
  {
    id: "jarvis",
    title: "Jarvis",
    tagline: "Voice-activated AI assistant.",
    description: "Speech recognition + OpenAI. Plays music, opens websites, answers questions. Built in Python.",
    tags: ["Python", "OpenAI", "Speech Recognition"],
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/RIxiV1",
    color: "#10b981",
    codeSnippet: `def listen_and_act():
    audio = recognizer.listen(mic)
    text = recognizer.recognize_google(audio)
    response = openai.chat(text)
    speak(response)`
  },
  {
    id: "resume-agent",
    title: "Resume Screening Agent",
    tagline: "AI-powered applicant filtering.",
    description: "n8n + Lovable. PDF upload → LLM scoring → structured match report. Designed to cut hiring noise.",
    tags: ["TypeScript", "n8n", "LLMs"],
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/RIxiV1",
    color: "#f59e0b",
    codeSnippet: `const score = await llm.score({
  resume: parsePDF(file),
  requirements: jobSpec.criteria,
  format: 'structured'
});`
  },
  {
    id: "stitch-ai",
    title: "Stitch AI",
    tagline: "Design-to-code automation.",
    description: "An agentic AI system that transforms design screenshots and prompts into high-fidelity React components. Featuring real-time preview and multi-model orchestration.",
    tags: ["React", "TypeScript", "LLMs", "Agentic AI"],
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/RIxiV1",
    color: "#ec4899",
    codeSnippet: `const { components, status } = await stitch.generate({
  source: 'screenshot',
  target: 'react-tailwind',
  quality: 'premium'
});`
  }
];
