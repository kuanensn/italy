import { GoogleGenAI, Type } from "@google/genai";
import { Trip, DayPlan, ItineraryType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateItinerary = async (destination: string, numDays: number, budget: string): Promise<Trip> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `請為我規劃一個前往 ${destination} 的 ${numDays} 天旅行，預算風格為 ${budget}。
  請建立詳細的行程表。
  對於每個地點，請將其分類為 ATTRACTION (景點)、RESTAURANT (餐廳) 或 TRANSPORT (交通)。
  重要：請扮演一位專業的導遊。
  - 對於餐廳，列出具體的 "mustEat" (必吃美食)。
  - 對於購物區，列出 "mustBuy" (必買伴手禮)。
  - 包含具體的 "tips" (導遊祕技) 或私房景點。
  - 預估該季節的當地天氣狀況（天氣圖示請用 emoji）和溫度。
  請使用繁體中文 (Traditional Chinese, Taiwan usage) 回答。
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      systemInstruction: "你是一位專業且講究生活品味的旅遊嚮導，熱愛美好生活 (La Dolce Vita)。請務必使用繁體中文 (Traditional Chinese) 輸出 JSON 格式。",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "富有創意的旅行標題" },
          destination: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                location: { type: Type.STRING, description: "該日的主要城市或區域" },
                weather: {
                  type: Type.OBJECT,
                  properties: {
                    temp: { type: Type.STRING, description: "例如 24°C" },
                    condition: { type: Type.STRING, description: "例如 晴朗" },
                    icon: { type: Type.STRING, description: "代表天氣的 Emoji" }
                  }
                },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING, description: "Unique UUID" },
                      type: { type: Type.STRING, enum: [ItineraryType.ATTRACTION, ItineraryType.RESTAURANT, ItineraryType.TRANSPORT] },
                      time: { type: Type.STRING, description: "時間，例如 09:00 AM" },
                      name: { type: Type.STRING },
                      location: { type: Type.STRING, description: "地址或地點名稱" },
                      description: { type: Type.STRING, description: "簡短描述" },
                      mustEat: { type: Type.ARRAY, items: { type: Type.STRING }, description: "若為餐廳，列出推薦菜色" },
                      mustBuy: { type: Type.ARRAY, items: { type: Type.STRING }, description: "若為購物點，列出必買物品" },
                      tips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "實用建議或歷史趣聞" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  const data = JSON.parse(response.text);
  
  // Add IDs if missing and structure matches Trip interface
  const trip: Trip = {
    id: crypto.randomUUID(),
    title: data.title,
    destination: data.destination,
    startDate: new Date().toISOString().split('T')[0],
    days: data.days
  };

  return trip;
};