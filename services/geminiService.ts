import { GoogleGenAI } from "@google/genai";

export async function getFunFacts(fishName: string): Promise<string> {
  if (!process.env.API_KEY) {
    return "エラー: APIキーが設定されていません。環境変数 process.env.API_KEY を設定してください。";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `${fishName}について、面白くて楽しい豆知識を3つ教えてください。箇条書き（•）で、各項目を改行して、シンプルなリスト形式で回答してください。`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching fun facts from Gemini API:", error);
    if (error instanceof Error) {
        return `豆知識の取得に失敗しました。APIキーとネットワーク接続を確認してください。詳細: ${error.message}`;
    }
    return "豆知識の取得中に不明なエラーが発生しました。";
  }
}