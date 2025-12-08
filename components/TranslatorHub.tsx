
import React, { useState } from 'react';
import { ArrowRightLeft, Volume2, Sparkles, MapPin, MessageCircle, Utensils, ShoppingBag, BedDouble, Wifi, CreditCard, Ticket } from 'lucide-react';
import { translateText } from '../services/geminiService';

const TranslatorHub: React.FC = () => {
  const [mode, setMode] = useState<'TRANSLATE' | 'LEARN'>('TRANSLATE');
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
      setTranslation({ translated: "連線錯誤" });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { 
      id: 'GREETING', icon: Sparkles, label: '問候與自我介紹', color: 'from-yellow-50 to-amber-100', text: 'text-amber-800',
      phrases: [
        { it: 'Scusi / Scusa', zh: '不好意思 (禮貌 / 隨意)' },
        { it: 'Grazie!', zh: '謝謝！' },
        { it: 'Mi dispiace.', zh: '對不起。' },
        { it: 'Prego!', zh: '請 / 不客氣！' },
        { it: 'Ciao / Sì / No', zh: '你好 / 是 / 不是' },
        { it: 'Arrivederci / Ciao', zh: '再見' },
        { it: 'Buongiorno / Buona sera', zh: '早安 / 晚安' },
        { it: 'Sono ＯＯＯ.', zh: '我的名字是ＯＯＯ。' },
        { it: 'Sono con la mia famiglia / i miei amici.', zh: '我和我的家人 / 朋友一起。' },
        { it: 'Da solo / a.', zh: '我自己一個人 (男/女)。' },
        { it: 'Sono Taiwanese.', zh: '我是台灣人。' },
        { it: '(Non) Mi piace ＯＯＯ.', zh: '我（不）喜歡 ＯＯＯ。' },
        { it: 'Riesco a parlare un po’italiano.', zh: '我會說一點義大利文。' },
        { it: 'Piacere!', zh: '很高興認識你！/ 幸會！' },
      ]
    },
    { 
      id: 'TRANSPORT', icon: MapPin, label: '交通與入境', color: 'from-sky-50 to-blue-100', text: 'text-blue-800',
      phrases: [
        { it: 'Questo è il mio passaporto.', zh: '這是我的護照。' },
        { it: 'Rimango qua per ＯＯ giorni.', zh: '我在這邊待ＯＯ天。' },
        { it: 'Dov’è la stazione / metro?', zh: '火車 / 地鐵站在哪裡？' },
        { it: 'Dove posso comprare il biglietto?', zh: '請問哪裡可以買票？' },
        { it: 'Vorrei comprare il biglietto ordinario / 3 giorni / per 10 volte.', zh: '我想買單程 / 三日 / 十次票。' },
        { it: 'Dove devo cambiare il treno / la metro?', zh: '我要在哪裡換火車 / 地鐵？' },
      ]
    },
    { 
      id: 'COMMUNICATION', icon: MessageCircle, label: '溝通與求助', color: 'from-rose-50 to-pink-100', text: 'text-pink-800',
      phrases: [
        { it: 'Che ore sono?', zh: '請問現在幾點？' },
        { it: 'Dov’è il bagno?', zh: '請問廁所在哪裡？' },
        { it: 'Sa parlare inglese / cinese?', zh: '請問您會說英文 / 中文嗎？' },
        { it: 'Può ripetere un’altra volta?', zh: '可以請您重複一次嗎？' },
        { it: 'Può parlare lentamente?', zh: '可以請您說慢一點嗎？' },
        { it: 'Non capisco.', zh: '我聽不懂。' },
      ]
    },
    { 
      id: 'DINING', icon: Utensils, label: '點餐與美食', color: 'from-orange-50 to-orange-100', text: 'text-orange-800',
      phrases: [
        { it: 'Portare via. / Mangiare qua.', zh: '我要 外帶 / 內用。' },
        { it: 'Ci sono ancora posti liberi?', zh: '請問還有位子嗎？' },
        { it: 'Siamo in ＯＯ.', zh: '我們ＯＯ位。' },
        { it: 'C’è menu inglese / cinese?', zh: '請問有英文 / 中文菜單嗎？' },
        { it: 'Siamo pronti.', zh: '我們要點餐。' },
        { it: 'L’acqua naturale / frizzante.', zh: '白開水 / 氣泡水' },
        { it: 'Senza zucchero / ghiaccio.', zh: '不要糖 / 冰塊。' },
        { it: 'Vorrei ＯＯＯ, per favore.', zh: '請給我ＯＯＯ (記得加 per favore)。' },
        { it: 'Vorrei questo, per favore.', zh: '請給我這個。' },
        { it: 'Che cosa è?', zh: '這個是什麼？' },
        { it: '(Molto) Buono!', zh: '（很）好吃！' },
        { it: 'Basta così, grazie.', zh: '這樣就好了，謝謝。' },
        { it: 'Cucchiaio / Forchetta / Coltello / Bacchette per favore.', zh: '請給我 湯匙/叉子/刀子/筷子。' },
        { it: 'Il conto per favore.', zh: '麻煩給我帳單。' },
        { it: 'Paghiamo separata.', zh: '我們分開付。' },
      ]
    },
    { 
      id: 'SHOPPING', icon: ShoppingBag, label: '購物與支付', color: 'from-purple-50 to-fuchsia-100', text: 'text-fuchsia-800',
      phrases: [
        { it: 'C’è la taglia S / M / L?', zh: '請問有 S / M / L 嗎？' },
        { it: 'C’è duty-free?', zh: '有免稅嗎？' },
        { it: 'Quanto costa?', zh: '這個多少錢？' },
        { it: 'Posso pagare con la carta?', zh: '可以刷卡嗎？' },
        { it: 'Posso provarlo / assaggiarlo?', zh: '我可以試穿 / 試吃嗎？' },
      ]
    },
    { 
      id: 'STAY', icon: BedDouble, label: '住宿與網路', color: 'from-emerald-50 to-teal-100', text: 'text-teal-800',
      phrases: [
        { it: 'Vorrei una camera singola / matrimoniale / doppia.', zh: '我想要一個單人房/雙人房/雙床房。' },
        { it: 'Ho già prenotato una camera.', zh: '我有預定一個房間。' },
        { it: 'Posso mettere la valigia qua?', zh: '我可以把行李放在這裡嗎？' },
        { it: 'Qual è la password di Wifi?', zh: '請問 wifi 密碼是什麼？' },
      ]
    },
  ];

  return (
    <div className="h-full flex flex-col pb-32">
       {/* Mode Switcher */}
      <div className="px-6 pt-2 pb-4">
        <div className="flex bg-stone-200/50 p-1 rounded-full relative">
           <div className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-sm transition-all duration-300 ${mode === 'LEARN' ? 'left-1/2' : 'left-0'}`}></div>
          <button
            onClick={() => setMode('TRANSLATE')}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all relative z-10 ${mode === 'TRANSLATE' ? 'text-stone-800' : 'text-stone-400'}`}
          >
            即時翻譯
          </button>
          <button
            onClick={() => setMode('LEARN')}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all relative z-10 ${mode === 'LEARN' ? 'text-stone-800' : 'text-stone-400'}`}
          >
            義語小教室
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 space-y-6 no-scrollbar">
        {mode === 'TRANSLATE' && (
          <>
            {/* Input Area */}
            <div className="relative">
                 <div className="absolute -inset-1 bg-gradient-to-r from-olive-200 to-terracotta-200 rounded-[24px] blur opacity-30"></div>
                 <div className="relative bg-[#fdfbf7] p-4 rounded-[20px] shadow-sm border border-stone-100">
                    <div className="flex justify-between items-center mb-3">
                         <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{direction === 'ZH_TO_IT' ? 'Chinese' : 'Italian'}</span>
                         <button onClick={() => setDirection(d => d === 'ZH_TO_IT' ? 'IT_TO_ZH' : 'ZH_TO_IT')} className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"><ArrowRightLeft size={16}/></button>
                         <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{direction === 'ZH_TO_IT' ? 'Italian' : 'Chinese'}</span>
                    </div>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type here..."
                        className="w-full h-32 bg-transparent text-xl font-serif text-stone-800 placeholder:text-stone-300 outline-none resize-none leading-relaxed"
                    />
                    <div className="flex justify-end mt-2">
                        <button 
                            onClick={handleTranslate} 
                            disabled={loading || !inputText}
                            className="bg-stone-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-stone-200 active:scale-95 transition-transform"
                        >
                            {loading ? 'Translating...' : 'Translate'}
                        </button>
                    </div>
                 </div>
            </div>

            {/* Output Area */}
            {translation && (
              <div className="bg-white p-6 rounded-[20px] shadow-sm border border-stone-100 animate-fadeIn relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-2 h-full bg-olive-500"></div>
                 <p className="font-serif italic text-3xl text-stone-800 mb-2">{translation.translated}</p>
                 {translation.pronunciation && (
                     <div className="inline-flex items-center gap-2 bg-olive-50 px-3 py-1 rounded-full text-olive-700 text-sm font-bold">
                         <Volume2 size={14} /> {translation.pronunciation}
                     </div>
                 )}
              </div>
            )}
          </>
        )}

        {mode === 'LEARN' && (
          <div className="grid grid-cols-1 gap-4 pb-8">
             {categories.map(cat => (
               <div key={cat.id} className={`bg-gradient-to-br ${cat.color} p-5 rounded-[24px] shadow-sm`}>
                 <div className={`flex items-center gap-2 mb-4 ${cat.text}`}>
                    <cat.icon size={20} />
                    <h3 className="font-serif font-bold text-lg">{cat.label}</h3>
                 </div>
                 <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-xl p-3">
                    {cat.phrases.map((phrase, idx) => (
                      <div key={idx} className="flex flex-col border-b border-stone-100/50 last:border-0 pb-2 last:pb-0">
                          <p className="font-bold text-stone-800 text-lg leading-tight mb-1">{phrase.it}</p>
                          <p className="text-xs text-stone-500 font-medium">{phrase.zh}</p>
                      </div>
                    ))}
                 </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatorHub;
