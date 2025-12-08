
import React, { useState, useEffect, useRef } from 'react';
import ItineraryCard from './components/ItineraryCard';
import UtilityHub from './components/UtilityHub';
import TranslatorHub from './components/TranslatorHub';
import { Trip, DayPlan } from './types';
import { initialTripData } from './services/initialTripData';
import { parseRawTextToItinerary, askTravelAssistant } from './services/geminiService';
import { Map, Briefcase, Calendar, Loader2, Shirt, Umbrella, Sun, X, Droplets, Sparkles, ChevronRight, MessageCircle, Bot, Send, Languages, ArrowUp } from 'lucide-react';

// --- Snow Effect Component ---
const SnowEffect = () => {
  const snowflakes = Array.from({ length: 50 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {snowflakes.map((_, i) => {
        const left = Math.random() * 100;
        const animationDuration = 8 + Math.random() * 10;
        const animationDelay = Math.random() * 5;
        const size = 3 + Math.random() * 4;
        const opacity = 0.3 + Math.random() * 0.4;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.9)]"
            style={{
              left: `${left}%`,
              top: `-10px`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animation: `snowfall ${animationDuration}s linear infinite`,
              animationDelay: `-${animationDelay}s`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10vh) translateX(-10px) rotate(0deg); }
          100% { transform: translateY(110vh) translateX(20px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

interface ChatMessage {
    role: 'USER' | 'AI';
    text: string;
}

const App: React.FC = () => {
  const [trip, setTrip] = useState<Trip | null>(initialTripData);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'ITINERARY' | 'UTILITIES' | 'TRANSLATOR'>('ITINERARY');
  
  // AI Assistant State
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [aiMode, setAiMode] = useState<'CHAT' | 'IMPORT'>('CHAT');
  const [magicInput, setMagicInput] = useState('');
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
      { role: 'AI', text: 'Ciao! 我是您的義大利專屬導遊。想問天氣、美食還是行程建議？' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Weather Modal
  const [selectedWeather, setSelectedWeather] = useState<DayPlan['weather'] | null>(null);

  // Time
  const [timeTPE, setTimeTPE] = useState('');
  const [timeROM, setTimeROM] = useState('');

  // Refs
  const dayRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
        const now = new Date();
        setTimeTPE(now.toLocaleTimeString('zh-TW', { timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', hour12: false }));
        setTimeROM(now.toLocaleTimeString('zh-TW', { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
      if (showAiAssistant && aiMode === 'CHAT') {
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [chatHistory, showAiAssistant, aiMode]);

  const handleMagicPlan = async () => {
      if (!magicInput.trim() || !trip) return;
      setIsMagicLoading(true);
      try {
          const newDays = await parseRawTextToItinerary(magicInput, trip.days.length);
          if (newDays.length > 0) {
              setTrip(prev => { if (!prev) return null; return { ...prev, days: [...prev.days, ...newDays] }; });
              setMagicInput('');
              alert('✨ 行程已成功加入！');
          }
      } catch (e) {
          console.error(e);
          alert('AI 發生錯誤，請稍後再試');
      } finally {
          setIsMagicLoading(false);
      }
  };

  const handleChat = async () => {
      if (!chatInput.trim() || !trip) return;
      const question = chatInput;
      setChatInput('');
      setChatHistory(prev => [...prev, { role: 'USER', text: question }]);
      setIsChatLoading(true);
      try {
          const answer = await askTravelAssistant(question, trip);
          setChatHistory(prev => [...prev, { role: 'AI', text: answer }]);
      } catch (e) {
          setChatHistory(prev => [...prev, { role: 'AI', text: '抱歉，連線出了點問題，請稍後再試。' }]);
      } finally {
          setIsChatLoading(false);
      }
  };

  const scrollToDay = (day: number) => {
      const element = dayRefs.current[day];
      if (element) {
        // Adjust scroll position to account for fixed header
        const y = element.getBoundingClientRect().top + window.scrollY - 240;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
  };

  const WeatherWidget = ({ weather }: { weather: DayPlan['weather'] }) => (
    <button 
        onClick={() => setSelectedWeather(weather)}
        className="flex items-center gap-2 bg-white/60 backdrop-blur-md hover:bg-white/80 transition-colors px-3 py-1.5 rounded-full border border-white/50 shadow-sm ml-auto active:scale-95 group"
    >
         <span className="text-xl drop-shadow-sm group-hover:scale-110 transition-transform">{weather.icon}</span>
         <div className="flex flex-col leading-none text-right">
             <span className="text-sm font-serif font-bold text-slate-800">{weather.temp}</span>
         </div>
    </button>
  );

  const WeatherModal = () => {
    if (!selectedWeather) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-900/40 backdrop-blur-md p-6 animate-fadeIn" onClick={() => setSelectedWeather(null)}>
            <div className="bg-[#fdfbf7] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-300 via-sky-400 to-blue-300"></div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center gap-3">
                            <span className="text-5xl drop-shadow-md">{selectedWeather.icon}</span>
                            <div>
                                <h3 className="font-serif text-3xl font-bold text-slate-800">{selectedWeather.temp}</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{selectedWeather.condition}</p>
                            </div>
                        </div>
                        <button onClick={() => setSelectedWeather(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400"><X size={20} /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50 flex flex-col items-center justify-center text-center">
                            <Droplets size={18} className="text-blue-500 mb-1" />
                            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">降雨機率</span>
                            <span className="text-lg font-bold text-slate-700">{selectedWeather.rainProb || '0%'}</span>
                        </div>
                        <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100/50 flex flex-col items-center justify-center text-center">
                            <Sun size={18} className="text-amber-500 mb-1" />
                            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">紫外線</span>
                            <span className="text-lg font-bold text-slate-700">{selectedWeather.uvIndex || '低'}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {selectedWeather.outfitAdvice && (
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                <h4 className="flex items-center gap-2 text-slate-800 font-serif italic font-bold text-sm mb-2">
                                    <Shirt size={14} className="text-terracotta-500" /> Fashion Advice
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed font-light">{selectedWeather.outfitAdvice}</p>
                            </div>
                        )}
                        {selectedWeather.sunProtection && (
                            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                 <h4 className="flex items-center gap-2 text-slate-800 font-serif italic font-bold text-sm mb-2">
                                    <Umbrella size={14} className="text-olive-500" /> Skin Care
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed font-light">{selectedWeather.sunProtection}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if (loading || !trip) return <div className="h-screen flex items-center justify-center bg-[#f8f5f1]"><Loader2 className="animate-spin text-terracotta-600"/></div>;

  return (
    // Main Container - Full Screen
    <div className="min-h-screen w-full bg-[#f8f5f1] font-sans text-stone-800 relative">
      
        {/* --- Background Layers (Fixed) --- */}
        {/* 1. Italian Sketch */}
        <div 
          className="fixed inset-0 z-0 opacity-15 pointer-events-none mix-blend-multiply"
          style={{
              backgroundImage: "url('https://img.freepik.com/free-vector/rome-landmarks-sketch-background_23-2147619106.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'sepia(0.8) contrast(1.2)'
          }}
        />
        {/* 2. Warm Gradient Orbs */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/30 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply"></div>
        
        {/* 3. Noise Texture */}
        <div className="fixed inset-0 z-[2] opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        <SnowEffect />
        
        {/* --- Header (Fixed) --- */}
        <div className="fixed top-0 left-0 right-0 z-40 w-full">
            <div className="max-w-lg mx-auto bg-gradient-to-b from-[#f8f5f1]/95 to-[#f8f5f1]/0 backdrop-blur-[2px]">
                
                {/* Large Dual Clock Vertical Layout (Replaces Title & Old Clock) */}
                <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-2">
                    {/* Taipei Time (Origin) */}
                    <div className="flex items-center gap-3 text-stone-400">
                         <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Taipei</span>
                         <span className="text-sm font-sans font-medium tracking-wider">{timeTPE}</span>
                    </div>
                    
                    {/* Decorative Divider */}
                    <div className="w-8 h-[1px] bg-stone-300/40 my-1"></div>

                    {/* Rome Time (Destination) */}
                    <div className="flex flex-col items-center">
                        <span className="text-[3.5rem] leading-none font-serif italic font-black text-terracotta-800 tracking-tighter drop-shadow-sm">{timeROM}</span>
                        <span className="text-xs font-bold text-terracotta-600 tracking-[0.4em] uppercase mt-2">Italy</span>
                    </div>
                </div>

                {/* Date Scroller - Enlarged */}
                {currentView === 'ITINERARY' && (
                    <div className="pl-4 pb-4 overflow-x-auto no-scrollbar flex gap-3 mask-linear-fade">
                        {trip.days.map((day) => (
                            <button 
                                key={day.day}
                                onClick={() => scrollToDay(day.day)}
                                className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md shadow-sm active:scale-95 transition-all hover:bg-white/60"
                            >
                                <span className="text-xs font-bold text-stone-400 font-sans">{day.date?.split(' ')[0]}</span>
                                <span className="text-2xl font-black text-stone-700 font-serif leading-none mt-1">{day.day}</span>
                                <span className="text-[10px] font-bold text-terracotta-600 uppercase mt-1 truncate w-14 text-center">{day.location.split(' ')[0]}</span>
                            </button>
                        ))}
                        <div className="w-4 flex-shrink-0"></div>
                    </div>
                )}
            </div>
        </div>

        {/* --- Main Content --- */}
        <main 
          className="relative z-10 pt-[18rem] pb-32 px-4 max-w-lg mx-auto min-h-screen"
        >
          {currentView === 'ITINERARY' ? (
            <div className="space-y-8">
              
              {/* AI Assistant Banner */}
              <div className="relative group rounded-3xl p-[1px] bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 shadow-lg shadow-purple-100/50">
                  <div className="bg-white/90 backdrop-blur-xl rounded-[23px] overflow-hidden">
                      <button 
                          onClick={() => setShowAiAssistant(!showAiAssistant)}
                          className="w-full p-4 flex items-center justify-between"
                      >
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                                  <Sparkles size={18} />
                              </div>
                              <div className="text-left">
                                  <h3 className="font-bold text-stone-800 text-sm">AI 旅遊助手</h3>
                                  <p className="text-[10px] text-stone-500 font-medium">隨身問答 • 行程匯入</p>
                              </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 transition-transform duration-300 ${showAiAssistant ? 'rotate-90' : ''}`}>
                              <ChevronRight size={16} />
                          </div>
                      </button>
                      
                      {showAiAssistant && (
                          <div className="border-t border-stone-100 bg-stone-50/50 animate-fadeIn">
                              <div className="flex p-1 gap-1 mx-4 mt-2 bg-stone-200/50 rounded-xl">
                                  <button onClick={() => setAiMode('CHAT')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${aiMode === 'CHAT' ? 'bg-white shadow-sm text-indigo-600' : 'text-stone-500'}`}>隨身問答</button>
                                  <button onClick={() => setAiMode('IMPORT')} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${aiMode === 'IMPORT' ? 'bg-white shadow-sm text-indigo-600' : 'text-stone-500'}`}>行程匯入</button>
                              </div>

                              {aiMode === 'CHAT' ? (
                                  <div className="p-4">
                                      <div className="h-64 overflow-y-auto space-y-3 mb-3 pr-1">
                                          {chatHistory.map((msg, i) => (
                                              <div key={i} className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}>
                                                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'USER' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white text-stone-700 border border-stone-100 rounded-bl-sm'}`}>
                                                      {msg.text}
                                                  </div>
                                              </div>
                                          ))}
                                          {isChatLoading && <div className="text-xs text-stone-400 pl-2 animate-pulse">AI 正在思考...</div>}
                                          <div ref={chatEndRef} />
                                      </div>
                                      <div className="flex gap-2">
                                          <input 
                                              value={chatInput} 
                                              onChange={e => setChatInput(e.target.value)}
                                              onKeyPress={e => e.key === 'Enter' && handleChat()}
                                              placeholder="問問導遊..." 
                                              className="flex-1 bg-white border border-stone-200 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                                          />
                                          <button onClick={handleChat} className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-95"><Send size={16}/></button>
                                      </div>
                                  </div>
                              ) : (
                                  <div className="p-4">
                                      <textarea 
                                          value={magicInput}
                                          onChange={e => setMagicInput(e.target.value)}
                                          placeholder="貼上您的行程文字..."
                                          className="w-full h-32 p-3 bg-white rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-none mb-3"
                                      />
                                      <button onClick={handleMagicPlan} disabled={isMagicLoading} className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-sm shadow-md active:scale-95 flex items-center justify-center gap-2">
                                          {isMagicLoading ? <Loader2 className="animate-spin" size={14}/> : <Sparkles size={14}/>} {isMagicLoading ? '分析中...' : '生成並加入'}
                                      </button>
                                  </div>
                              )}
                          </div>
                      )}
                  </div>
              </div>

              {trip.days.map((dayPlan) => (
                <div 
                  key={dayPlan.day} 
                  className="scroll-mt-[20rem]"
                  ref={(el) => { dayRefs.current[dayPlan.day] = el }}
                >
                  {/* Day Divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex flex-col items-center">
                          <span className="font-serif font-black text-4xl text-terracotta-800 leading-none italic">{dayPlan.day}</span>
                          <span className="text-[9px] font-bold text-terracotta-400 uppercase tracking-widest">Day</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-terracotta-200 to-transparent"></div>
                    <div className="flex flex-col items-end">
                        <h2 className="font-bold text-stone-800 text-lg">{dayPlan.location}</h2>
                        <span className="text-xs text-stone-400 font-serif italic">{dayPlan.date}</span>
                    </div>
                    <WeatherWidget weather={dayPlan.weather} />
                  </div>

                  {/* Timeline Container */}
                  <div className="relative pl-4 border-l border-dashed border-stone-300 space-y-6">
                      {dayPlan.items.map((item) => (
                          <ItineraryCard key={item.id} item={item} weather={dayPlan.weather} />
                      ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-8 pb-12 text-center">
                  <p className="font-serif italic text-2xl text-stone-300">Fine.</p>
              </div>
            </div>
          ) : currentView === 'UTILITIES' ? (
            <div>
              <UtilityHub />
            </div>
          ) : (
              <div>
                  <TranslatorHub />
              </div>
          )}
        </main>

        {/* --- Floating Bottom Navigation (Fixed) --- */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
          <nav className="bg-stone-900/80 backdrop-blur-xl text-stone-300 px-2 py-2 rounded-full shadow-2xl flex items-center gap-1 border border-white/10 ring-1 ring-black/5 pointer-events-auto">
              {[
                  { id: 'ITINERARY', icon: Map, label: '行程' },
                  { id: 'TRANSLATOR', icon: Languages, label: '翻譯' },
                  { id: 'UTILITIES', icon: Briefcase, label: '工具' }
              ].map(item => (
                  <button 
                      key={item.id}
                      onClick={() => setCurrentView(item.id as any)}
                      className={`relative px-5 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                          currentView === item.id 
                              ? 'bg-white text-stone-900 shadow-md translate-y-[-2px]' 
                              : 'hover:text-white hover:bg-white/10'
                      }`}
                  >
                      <item.icon size={18} strokeWidth={2.5} />
                      {currentView === item.id && (
                          <span className="text-xs font-bold animate-fadeIn whitespace-nowrap">{item.label}</span>
                      )}
                  </button>
              ))}
          </nav>
        </div>

        <WeatherModal />
    </div>
  );
};

export default App;
