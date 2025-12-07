
import React, { useState, useEffect, useRef } from 'react';
import ItineraryCard from './components/ItineraryCard';
import UtilityHub from './components/UtilityHub';
import TranslatorHub from './components/TranslatorHub';
import { Trip, DayPlan } from './types';
import { initialTripData } from './services/initialTripData';
import { parseRawTextToItinerary, askTravelAssistant } from './services/geminiService';
import { Map, Briefcase, Calendar, Loader2, Shirt, Umbrella, Sun, X, Droplets, Sparkles, ChevronRight, MessageCircle, Bot, Send, Languages } from 'lucide-react';

// --- Snow Effect Component ---
const SnowEffect = () => {
  // Create a fixed number of snowflakes
  const snowflakes = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((_, i) => {
        const left = Math.random() * 100;
        const animationDuration = 5 + Math.random() * 10; // 5-15s
        const animationDelay = Math.random() * 5;
        const size = 2 + Math.random() * 4; // 2-6px
        const opacity = 0.3 + Math.random() * 0.5;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-white/80 shadow-[0_0_4px_rgba(255,255,255,0.8)]"
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
          0% {
            transform: translateY(-10vh) translateX(-10px);
          }
          100% {
            transform: translateY(110vh) translateX(20px);
          }
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
  
  // Magic Plan (Import) State
  const [magicInput, setMagicInput] = useState('');
  const [isMagicLoading, setIsMagicLoading] = useState(false);

  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
      { role: 'AI', text: 'Ciao! 我是您的義大利專屬導遊。想問天氣、美食還是行程建議？' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Weather Modal State
  const [selectedWeather, setSelectedWeather] = useState<DayPlan['weather'] | null>(null);

  // Time State
  const [timeTPE, setTimeTPE] = useState('');
  const [timeROM, setTimeROM] = useState('');

  // Refs for scrolling
  const dayRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Clock Effect
  useEffect(() => {
    const updateTime = () => {
        const now = new Date();
        setTimeTPE(now.toLocaleTimeString('zh-TW', { timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
        setTimeROM(now.toLocaleTimeString('zh-TW', { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to bottom of chat
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
              setTrip(prev => {
                  if (!prev) return null;
                  return {
                      ...prev,
                      days: [...prev.days, ...newDays]
                  };
              });
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
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  const WeatherWidget = ({ weather }: { weather: DayPlan['weather'] }) => {
    return (
        <button 
            onClick={() => setSelectedWeather(weather)}
            className="flex items-center gap-2 bg-blue-50/80 backdrop-blur-sm hover:bg-blue-100 transition-colors px-3 py-1 rounded-full border border-blue-100 shadow-sm ml-auto active:scale-95"
        >
             <span className="text-xl drop-shadow-sm">{weather.icon}</span>
             <div className="flex flex-col leading-none text-right">
                 <span className="text-xs font-bold text-blue-900">{weather.temp}</span>
                 <span className="text-[10px] text-blue-700 uppercase tracking-wide">{weather.condition}</span>
             </div>
        </button>
    )
  }

  const WeatherModal = () => {
    if (!selectedWeather) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn" onClick={() => setSelectedWeather(null)}>
            <div 
                className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border-t-4 border-blue-400"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-blue-50 p-4 flex justify-between items-center border-b border-blue-100">
                    <div className="flex items-center gap-2">
                        <span className="text-4xl">{selectedWeather.icon}</span>
                        <div>
                            <h3 className="font-serif text-xl font-bold text-blue-900">{selectedWeather.temp}</h3>
                            <p className="text-xs text-blue-600 font-bold uppercase tracking-widest">{selectedWeather.condition}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedWeather(null)} className="text-blue-300 hover:text-blue-500">
                        <X size={24} />
                    </button>
                </div>

                {/* Details Grid */}
                <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col items-center justify-center text-center">
                            <Droplets size={20} className="text-blue-500 mb-1" />
                            <span className="text-[10px] text-slate-400 font-bold uppercase">降雨機率</span>
                            <span className="text-lg font-bold text-slate-700">{selectedWeather.rainProb || '0%'}</span>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex flex-col items-center justify-center text-center">
                            <Sun size={20} className="text-amber-500 mb-1" />
                            <span className="text-[10px] text-amber-400 font-bold uppercase">紫外線</span>
                            <span className="text-lg font-bold text-amber-700">{selectedWeather.uvIndex || '低'}</span>
                        </div>
                    </div>

                    {/* Outfit Advice */}
                    {selectedWeather.outfitAdvice && (
                        <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                            <h4 className="flex items-center gap-2 text-stone-600 font-bold text-sm mb-2">
                                <Shirt size={16} /> AI 穿搭建議
                            </h4>
                            <p className="text-sm text-stone-700 leading-relaxed">
                                {selectedWeather.outfitAdvice}
                            </p>
                        </div>
                    )}

                    {/* Sun Protection */}
                    {selectedWeather.sunProtection && (
                        <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                             <h4 className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-2">
                                <Umbrella size={16} /> 防曬指南
                            </h4>
                            <p className="text-sm text-orange-800 leading-relaxed">
                                {selectedWeather.sunProtection}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
  }

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FEFBF6] p-6 text-center">
        <Loader2 className="animate-spin text-terracotta-600 mb-4" size={48} />
        <h2 className="font-serif text-2xl text-gray-800 mb-2">正在載入行程...</h2>
        <p className="text-gray-500 text-sm">Andiamo! 義大利之旅即將開始。</p>
      </div>
    );
  }

  if (!trip) return null;

  return (
    <div className="h-screen flex flex-col bg-[#FEFBF6] overflow-hidden max-w-md mx-auto shadow-2xl relative">
      
      {/* --- Italian Style Background Layer --- */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-multiply"
        style={{
            backgroundImage: "url('https://img.freepik.com/free-vector/rome-landmarks-sketch-background_23-2147619106.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.5) contrast(1.1)'
        }}
      />

      {/* --- Snow Effect Layer --- */}
      <SnowEffect />
      
      {/* Header Area */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm z-20 transition-all">
        {/* Dual Clock */}
        <div className="flex justify-between items-center px-4 py-2 bg-stone-900 text-white text-xs font-mono relative z-30">
            <div className="flex items-center gap-2">
                <span className="text-stone-400">TPE</span>
                <span className="font-bold">{timeTPE}</span>
            </div>
             <div className="flex items-center gap-2">
                <span className="font-bold">{timeROM}</span>
                <span className="text-stone-400">ROM</span>
            </div>
        </div>

        {/* Title */}
        <header className="px-5 py-4 flex flex-col justify-end relative z-20">
            <h1 className="font-serif text-[1.4rem] italic font-bold text-terracotta-800 whitespace-nowrap overflow-hidden text-ellipsis leading-tight tracking-wide">
                {trip.title}
            </h1>
            <div className="flex items-center gap-1 text-gray-500 text-xs mt-1 font-medium">
                <Calendar size={12} /> {trip.days.length} 天 • {trip.destination}
            </div>
        </header>
        
        {/* Calendar Navigation (Horizontal Scroll) */}
        {currentView === 'ITINERARY' && (
            <div className="flex overflow-x-auto no-scrollbar px-4 pb-3 gap-2 relative z-20">
                {trip.days.map((day) => (
                    <button 
                        key={day.day}
                        onClick={() => scrollToDay(day.day)}
                        className="flex-shrink-0 flex flex-col items-center justify-center min-w-[3.5rem] p-1.5 rounded-lg border border-gray-100 bg-white/80 active:bg-terracotta-50 active:border-terracotta-200 transition-colors shadow-sm"
                    >
                        <span className="text-[10px] font-bold text-gray-400">{day.date?.split(' ')[0]}</span>
                        <span className="text-xs font-bold text-gray-800 truncate max-w-[4rem]">{day.location.split(' ')[0]}</span>
                    </button>
                ))}
            </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative z-10">
        {currentView === 'ITINERARY' ? (
          <div className="px-4 py-4 space-y-6 pb-24">
            
            {/* AI Assistant Panel */}
            <div className="mb-4 bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-white/40 overflow-hidden">
                <button 
                    onClick={() => setShowAiAssistant(!showAiAssistant)}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                >
                    <div className="flex items-center gap-2 font-bold">
                        <Sparkles size={18} className="text-yellow-300" />
                        AI 旅遊助手
                    </div>
                    {showAiAssistant ? <ChevronRight size={18} className="rotate-90 transition-transform" /> : <ChevronRight size={18} />}
                </button>
                
                {showAiAssistant && (
                    <div className="animate-fadeIn">
                        {/* Mode Switcher */}
                        <div className="flex border-b border-gray-100">
                             <button 
                                onClick={() => setAiMode('CHAT')}
                                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${aiMode === 'CHAT' ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:bg-gray-50'}`}
                             >
                                <MessageCircle size={16} /> 隨身問答
                             </button>
                             <button 
                                onClick={() => setAiMode('IMPORT')}
                                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 ${aiMode === 'IMPORT' ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:bg-gray-50'}`}
                             >
                                <Calendar size={16} /> 行程匯入
                             </button>
                        </div>

                        {/* Chat Content */}
                        {aiMode === 'CHAT' && (
                            <div className="h-80 flex flex-col">
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
                                    {chatHistory.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                                                msg.role === 'USER' 
                                                    ? 'bg-purple-600 text-white rounded-br-none' 
                                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                            }`}>
                                                {msg.role === 'AI' && <Bot size={14} className="mb-1 text-purple-500" />}
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {isChatLoading && (
                                         <div className="flex justify-start">
                                            <div className="bg-white text-gray-500 border border-gray-200 rounded-2xl rounded-bl-none p-3 text-sm flex items-center gap-2">
                                                <Loader2 size={14} className="animate-spin" /> AI 正在思考中...
                                            </div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>
                                <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
                                    <input 
                                        type="text" 
                                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                                        placeholder="問問導遊 (例如: 這裡有什麼好吃的?)"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                                    />
                                    <button 
                                        onClick={handleChat}
                                        disabled={!chatInput.trim() || isChatLoading}
                                        className="bg-purple-600 text-white p-2 rounded-full disabled:opacity-50"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Import Content */}
                        {aiMode === 'IMPORT' && (
                            <div className="p-4 bg-gray-50/50">
                                <textarea 
                                    className="w-full h-32 p-3 bg-white rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-purple-200 outline-none resize-none mb-3"
                                    placeholder="貼上您的行程文字 (例如: 1/5 早上要去羅馬競技場，中午吃 Pizza...)"
                                    value={magicInput}
                                    onChange={(e) => setMagicInput(e.target.value)}
                                />
                                <button 
                                    onClick={handleMagicPlan}
                                    disabled={isMagicLoading || !magicInput.trim()}
                                    className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm active:scale-95 transition-transform"
                                >
                                    {isMagicLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                                    {isMagicLoading ? 'AI 正在分析...' : '生成並加入行程'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {trip.days.map((dayPlan, index) => (
              <div 
                key={index} 
                className="space-y-4 scroll-mt-40" // Increased offset for taller header
                ref={(el) => { dayRefs.current[dayPlan.day] = el }}
              >
                {/* Day Header */}
                <div className="sticky top-0 bg-[#FEFBF6]/90 backdrop-blur-md z-10 py-2 border-b border-terracotta-100/50 flex items-center justify-between rounded-b-lg shadow-sm">
                   <div className="flex items-baseline gap-2 pl-2">
                        <span className="font-serif text-2xl font-bold text-terracotta-700 italic">Day {dayPlan.day}</span>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-400">{dayPlan.date}</span>
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{dayPlan.location}</span>
                        </div>
                   </div>
                   <WeatherWidget weather={dayPlan.weather} />
                </div>

                {/* Items */}
                <div className="relative pl-2">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[1.65rem] top-4 bottom-4 w-px bg-terracotta-200/50 border-l border-dashed border-terracotta-300/30"></div>
                    
                    {dayPlan.items.map((item) => (
                        <ItineraryCard key={item.id} item={item} />
                    ))}
                </div>
              </div>
            ))}
            
            <div className="text-center py-8">
                <p className="font-serif italic text-gray-400/80">Buon Viaggio! (旅途愉快)</p>
            </div>
          </div>
        ) : currentView === 'UTILITIES' ? (
          <UtilityHub />
        ) : (
            <TranslatorHub />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-t border-gray-100 py-2 px-6 pb-6 flex justify-around shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-30">
        <button 
          onClick={() => setCurrentView('ITINERARY')}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === 'ITINERARY' ? 'text-terracotta-600 scale-105' : 'text-gray-400'}`}
        >
          <Map className={currentView === 'ITINERARY' ? 'fill-terracotta-100' : ''} size={24} />
          <span className="text-[10px] font-bold tracking-wide">行程表</span>
        </button>

        <button 
          onClick={() => setCurrentView('TRANSLATOR')}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === 'TRANSLATOR' ? 'text-olive-600 scale-105' : 'text-gray-400'}`}
        >
          <Languages className={currentView === 'TRANSLATOR' ? 'fill-olive-100' : ''} size={24} />
          <span className="text-[10px] font-bold tracking-wide">翻譯達人</span>
        </button>

        <button 
          onClick={() => setCurrentView('UTILITIES')}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === 'UTILITIES' ? 'text-tuscan-yellow-600 scale-105' : 'text-gray-400'}`}
        >
          <Briefcase className={currentView === 'UTILITIES' ? 'fill-tuscan-yellow-100' : ''} size={24} />
          <span className="text-[10px] font-bold tracking-wide">旅遊工具</span>
        </button>
      </nav>

      {/* Weather Modal Overlay */}
      <WeatherModal />

    </div>
  );
};

export default App;
