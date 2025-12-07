
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
  - 預估該季節的當地天氣狀況：
    1. 溫度與天氣 Emoji
    2. 降雨機率 (Rain Probability)
    3. 紫外線等級 (UV Index)
    4. AI 穿搭建議 (Outfit Advice)
    5. 防曬建議 (Sun Protection)
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
                    icon: { type: Type.STRING, description: "代表天氣的 Emoji" },
                    rainProb: { type: Type.STRING, description: "降雨機率，例如 30%" },
                    uvIndex: { type: Type.STRING, description: "紫外線等級，例如 中量級 (4)" },
                    outfitAdvice: { type: Type.STRING, description: "針對該天氣的詳細穿搭建議" },
                    sunProtection: { type: Type.STRING, description: "防曬相關建議" }
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

export const parseRawTextToItinerary = async (rawText: string, currentDayCount: number): Promise<DayPlan[]> => {
    const model = "gemini-2.5-flash";
    const prompt = `
      請將以下的使用者輸入的文字，解析並轉換為結構化的行程表。
      這些行程將被接續在原本行程的第 ${currentDayCount} 天之後。
      
      請自動偵測文字中的：
      1. 日期與時間
      2. 地點 (Location)
      3. 活動內容 (Items)
      
      並請根據該地點與日期，自動預測並填入：
      - 天氣狀況 (Weather): 包含溫度、降雨機率、紫外線、穿搭建議、防曬建議。
      - 若有餐廳，請推測必吃美食。
      - 若有景點，請推測 Tips。

      使用者輸入的文字：
      """
      ${rawText}
      """
    `;
  
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "你是一個行程整理助手。請只回傳 JSON 格式。請將文字中的每個活動轉換為 ItineraryItem。Day 的編號請從輸入文字中推斷，若無明確日期，則從提供的 currentDayCount + 1 開始編號。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER },
              date: { type: Type.STRING },
              location: { type: Type.STRING },
              weather: {
                type: Type.OBJECT,
                properties: {
                  temp: { type: Type.STRING },
                  condition: { type: Type.STRING },
                  icon: { type: Type.STRING },
                  rainProb: { type: Type.STRING },
                  uvIndex: { type: Type.STRING },
                  outfitAdvice: { type: Type.STRING },
                  sunProtection: { type: Type.STRING }
                }
              },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: { type: Type.STRING, enum: [ItineraryType.ATTRACTION, ItineraryType.RESTAURANT, ItineraryType.TRANSPORT] },
                    time: { type: Type.STRING },
                    name: { type: Type.STRING },
                    location: { type: Type.STRING },
                    description: { type: Type.STRING },
                    mustEat: { type: Type.ARRAY, items: { type: Type.STRING } },
                    mustBuy: { type: Type.ARRAY, items: { type: Type.STRING } },
                    tips: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            }
          }
        }
      }
    });
  
    if (!response.text) return [];
    
    const dayPlans = JSON.parse(response.text) as DayPlan[];
    // Ensure IDs exist
    dayPlans.forEach(day => {
        day.items.forEach(item => {
            if (!item.id) item.id = crypto.randomUUID();
        });
    });
    return dayPlans;
};

export const askTravelAssistant = async (question: string, tripContext: Trip): Promise<string> => {
  const model = "gemini-2.5-flash";
  const contextSummary = tripContext.days.map(d => 
    `Day ${d.day} (${d.date}): ${d.location} - ${d.items.map(i => i.name).join(', ')}`
  ).join('\n');

  const prompt = `
    你現在是這位旅客的私人導遊。
    
    使用者的目前行程如下：
    ${contextSummary}

    使用者問題： "${question}"

    請根據他的行程上下文（例如地點、日期）來回答。如果問題與行程無關，請以義大利導遊的風格熱情回答。
    回答請簡短、實用，並帶有一點義式幽默或熱情。
  `;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
  });

  return response.text || "抱歉，我現在有點分神，請再問一次！";
};

export const translateText = async (text: string, direction: 'ZH_TO_IT' | 'IT_TO_ZH'): Promise<{ translated: string; pronunciation?: string }> => {
  const model = "gemini-2.5-flash";
  const prompt = direction === 'ZH_TO_IT' 
    ? `將中文 "${text}" 翻譯成義大利文，並提供中文諧音或羅馬拼音輔助發音。` 
    : `將義大利文 "${text}" 翻譯成繁體中文。`;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          translated: { type: Type.STRING, description: "翻譯後的文字" },
          pronunciation: { type: Type.STRING, description: "若為義大利文，請提供發音指引，若為中文則留空" }
        }
      }
    }
  });

  if (!response.text) return { translated: "翻譯失敗" };
  return JSON.parse(response.text);
};
