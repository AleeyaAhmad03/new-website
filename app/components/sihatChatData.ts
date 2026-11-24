export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

export type ChatLanguageCode = "en" | "ms" | "zh" | "ta";

export type ChatLanguage = {
  code: ChatLanguageCode;
  label: string;
  name: string;
  locale: string;
  messages: ChatMessage[];
};

export const CHAT_LANGUAGES: Record<ChatLanguageCode, ChatLanguage> = {
  en: {
    code: "en",
    label: "EN",
    name: "English",
    locale: "en",
    messages: [
      { id: "en-1", role: "assistant", text: "How are you feeling today?" },
      { id: "en-2", role: "user", text: "A little tired." },
      {
        id: "en-3",
        role: "assistant",
        text: "I’m using your latest Sihat AI readings. Your blood pressure trend is slightly elevated. Would you like a quick check-in?",
      },
      { id: "en-4", role: "user", text: "Yes, please." },
    ],
  },
  ms: {
    code: "ms",
    label: "BM",
    name: "Bahasa Melayu",
    locale: "ms",
    messages: [
      { id: "ms-1", role: "assistant", text: "Apa khabar hari ini?" },
      { id: "ms-2", role: "user", text: "Saya rasa sedikit letih." },
      {
        id: "ms-3",
        role: "assistant",
        text: "Berdasarkan bacaan Sihat AI terkini anda, trend tekanan darah anda sedikit tinggi. Mahu buat semakan ringkas?",
      },
      { id: "ms-4", role: "user", text: "Ya, boleh." },
    ],
  },
  zh: {
    code: "zh",
    label: "中文",
    name: "中文",
    locale: "zh-CN",
    messages: [
      { id: "zh-1", role: "assistant", text: "今天感觉怎么样？" },
      { id: "zh-2", role: "user", text: "有一点累。" },
      {
        id: "zh-3",
        role: "assistant",
        text: "根据您最新的 Sihat AI 数据，您的血压趋势略高。需要进行快速健康检查吗？",
      },
      { id: "zh-4", role: "user", text: "好的。" },
    ],
  },
  ta: {
    code: "ta",
    label: "தமிழ்",
    name: "தமிழ்",
    locale: "ta",
    messages: [
      { id: "ta-1", role: "assistant", text: "இன்று எப்படி உணர்கிறீர்கள்?" },
      { id: "ta-2", role: "user", text: "சற்று சோர்வாக இருக்கிறேன்." },
      {
        id: "ta-3",
        role: "assistant",
        text: "உங்களின் சமீபத்திய Sihat AI அளவீடுகளின்படி, இரத்த அழுத்தம் சற்று அதிகமாக உள்ளது. விரைவான உடல்நலப் பரிசோதனை வேண்டுமா?",
      },
      { id: "ta-4", role: "user", text: "ஆம், தயவுசெய்து." },
    ],
  },
};

export const CHAT_LANGUAGE_ORDER: ChatLanguageCode[] = ["en", "ms", "zh", "ta"];