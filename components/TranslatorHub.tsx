
import React, { useState } from 'react';
import { ArrowRightLeft, Volume2, BookOpen, Coffee, ShoppingBag, MapPin, AlertCircle } from 'lucide-react';
import { translateText } from '../services/geminiService';

const TranslatorHub: React.FC = () => {
  const [mode, setMode] = useState<'TRANSLATE' | 'LEARN'>('TRANSLATE');
  
  // Translation State
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState<{ translated: string; pronunciation?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState<'ZH_TO_IT' | 'IT_TO_ZH'>('ZH_TO_IT');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const result = await translateText(inputText, direction);
      setTranslation(result);
    } catch (e) {
      console.error(e);
      setTranslation({ translated: "連線錯誤，請稍後再試" });
    } finally {
      setLoading(false);
    }
  };

  // Learning Categories
  const categories = [
    { 
      id: 'GREETING', icon: <Volume2 size={18} />, label: '問候', 
      phrases: [
        { it: 'Ciao', zh: '你好 / 再見', pro: '喬' },
        { it: 'Buongiorno', zh: '早安', pro: '邦-久-諾' },
        { it: 'Buonasera', zh: '晚上好', pro: '邦-納-塞-拉' },
        { it: 'Grazie', zh: '謝謝', pro: '葛拉-齊耶' },
      ]
    },
    { 
      id: 'DINING', icon: <Coffee size={18} />, label: '點餐',
      phrases: [
        { it: 'Il conto, per favore', zh: '請給我帳單', pro: '以-孔-托, 佩-爾-法-沃-雷' },
        { it: 'Un caffè, per favore', zh: '一杯咖啡，謝謝', pro: '溫-卡-費' },
        { it: 'È delizioso!', zh: '太好吃了！', pro: '欸-德-利-齊-歐-索' },
      ]
    },
    { 
      id: 'SHOPPING', icon: <ShoppingBag size={18} />, label: '購物',
      phrases: [
        { it: 'Quanto costa?', zh: '這多少錢？', pro: '寬-托-寇-斯-塔' },
        { it: 'Posso pagare con carta?', zh: '可以刷卡嗎？', pro: '頗-索-帕-嘎-雷-孔-卡-爾-塔' },
      ]
    },
    { 
      id: 'TRANSPORT', icon: <MapPin size={18} />, label: '交通',
      phrases: [
        { it: 'Dov\'è la stazione?', zh: '車站在哪裡？', pro: '多-韋-拉-斯-塔-齊-歐-內' },
        { it: 'Un biglietto per Roma', zh: '一張去羅馬的票', pro: '溫-比-列-托-佩-爾-羅-馬' },
      ]
    },
    { 
      id: 'SOS', icon: <AlertCircle size={18} />, label: '求助',
      phrases: [
        { it: 'Aiuto!', zh: '救命！', pro: '阿-尤-托' },
        { it: 'Parla inglese?', zh: '你會說英文嗎？', pro: '帕-爾-拉-英-格-雷-塞' },
      ]
    },
  ];

  return (
    <div className="h-full flex flex-col bg-stone-50 pb-20">
      {/* Header Tabs */}
      <div className="bg-white p-2 sticky top-0 z-10 shadow-sm">
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setMode('TRANSLATE')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'TRANSLATE' ? 'bg-white text-olive-700 shadow-sm' : 'text-stone-500'
            }`}
          >
            即時翻譯
          </button>
          <button
            onClick={() => setMode('LEARN')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
              mode === 'LEARN' ? 'bg-white text-olive-700 shadow-sm' : 'text-stone-500'
            }`}
          >
            義語小教室
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {mode === 'TRANSLATE' && (
          <div className="space-y-4">
            {/* Input Card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-stone-500 uppercase">
                  {direction === 'ZH_TO_IT' ? '中文 (繁體)' : '義大利文'}
                </span>
                <button 
                  onClick={() => setDirection(d => d === 'ZH_TO_IT' ? 'IT_TO_ZH' : 'ZH_TO_IT')}
                  className="p-1.5 rounded-full bg-stone-100 text-olive-600 hover:bg-stone-200"
                >
                  <ArrowRightLeft size={16} />
                </button>
                <span className="text-xs font-bold text-stone-500 uppercase">
                  {direction === 'ZH_TO_IT' ? '義大利文' : '中文 (繁體)'}
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={direction === 'ZH_TO_IT' ? "輸入中文..." : "輸入義大利文..."}
                className="w-full h-24 text-lg bg-transparent outline-none resize-none placeholder:text-stone-300"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleTranslate}
                  disabled={loading || !inputText}
                  className="bg-olive-600 text-white px-6 py-2 rounded-full font-bold shadow-md active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
                >
                  {loading ? '翻譯中...' : '翻譯'}
                </button>
              </div>
            </div>

            {/* Result Card */}
            {translation && (
              <div className="bg-gradient-to-br from-olive-50 to-white p-5 rounded-2xl shadow-sm border border-olive-100 animate-fadeIn">
                <p className="text-xs font-bold text-olive-500 mb-2 uppercase">翻譯結果</p>
                <p className="text-2xl font-serif text-stone-800 font-medium leading-relaxed mb-3">
                  {translation.translated}
                </p>
                {translation.pronunciation && (
                  <div className="bg-white/60 p-2 rounded-lg border border-olive-100/50">
                    <p className="text-xs text-stone-400 mb-1 flex items-center gap-1">
                      <Volume2 size={12} /> 發音指引
                    </p>
                    <p className="text-sm font-mono text-olive-700 font-bold">
                      {translation.pronunciation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {mode === 'LEARN' && (
          <div className="space-y-4">
             {categories.map(cat => (
               <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                 <div className="bg-stone-50 px-4 py-3 border-b border-stone-100 flex items-center gap-2">
                    <span className="text-olive-600">{cat.icon}</span>
                    <h3 className="font-bold text-stone-700">{cat.label}</h3>
                 </div>
                 <div className="divide-y divide-stone-100">
                    {cat.phrases.map((phrase, idx) => (
                      <div key={idx} className="p-3 flex justify-between items-center hover:bg-stone-50 transition-colors">
                        <div>
                          <p className="font-bold text-stone-800 text-lg">{phrase.it}</p>
                          <p className="text-xs text-stone-500 font-medium">{phrase.zh}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-1 bg-olive-50 text-olive-700 text-xs rounded-md font-mono border border-olive-100">
                            {phrase.pro}
                          </span>
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
             ))}
             <div className="p-4 bg-terracotta-50 rounded-xl border border-terracotta-100 text-center">
                <BookOpen className="w-8 h-8 text-terracotta-400 mx-auto mb-2" />
                <p className="text-sm text-terracotta-800 font-bold">學一點義大利文，讓旅程更道地！</p>
                <p className="text-xs text-terracotta-600 mt-1">Buon viaggio!</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatorHub;
