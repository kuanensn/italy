
import React, { useState } from 'react';
import { ItineraryItem, ItineraryType, DayPlan } from '../types';
import { MapPin, Utensils, Bus, Camera, Star, ShoppingBag, Navigation, Link as LinkIcon, Ticket, Clock, ChevronDown, Droplets, Snowflake, Map, MonitorCheck } from 'lucide-react';

interface Props {
  item: ItineraryItem;
  weather?: DayPlan['weather'];
}

const ItineraryCard: React.FC<Props> = ({ item, weather }) => {
  const [expanded, setExpanded] = useState(false);

  const getTypeStyle = () => {
    switch (item.type) {
      case ItineraryType.RESTAURANT: 
        return { 
            bg: 'bg-gradient-to-br from-[#fff5f2] to-white', 
            iconBg: 'bg-terracotta-100 text-terracotta-600',
            icon: Utensils,
            border: 'border-terracotta-100'
        };
      case ItineraryType.TRANSPORT: 
        return { 
            bg: 'bg-gradient-to-br from-[#f4f7ed] to-white', 
            iconBg: 'bg-olive-100 text-olive-600',
            icon: Bus,
            border: 'border-olive-100'
        };
      default: 
        return { 
            bg: 'bg-gradient-to-br from-[#fefce8] to-white', 
            iconBg: 'bg-yellow-100 text-yellow-600',
            icon: Camera,
            border: 'border-yellow-100'
        };
    }
  };

  const style = getTypeStyle();
  const Icon = style.icon;

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${item.name} ${item.location}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
  };

  const handleIndoorMap = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (item.indoorMap) {
          window.open(item.indoorMap, '_blank');
      }
  };

  // Determine if it looks like snow
  const isSnow = weather && (weather.condition.includes('雪') || parseInt(weather.temp) <= 4);
  const precipProb = weather?.rainProb || '0%';

  return (
    <div className="relative group">
      {/* Timeline Dot */}
      <div className={`absolute -left-[1.3rem] top-5 w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 ${style.iconBg.replace('text-', 'bg-').split(' ')[0]}`}></div>

      <div 
        onClick={() => setExpanded(!expanded)}
        className={`relative rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border ${style.border} ${style.bg} p-1 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 overflow-hidden`}
      >
        <div className="flex items-start p-4 gap-4">
          {/* Time Box with Weather - Enlarged */}
          <div className="flex flex-col items-center justify-start min-w-[5rem] pt-1 gap-3">
             <div className="flex flex-col items-center leading-none">
                <span className="font-serif font-black text-3xl text-stone-700">{item.time.split(':')[0]}</span>
                <span className="font-sans text-sm font-bold text-stone-400 mt-1">{item.time.split(':')[1]}</span>
             </div>
             
             {/* Weather Micro-Widget Enlarged */}
             {weather && (
                 <div className={`flex flex-col items-center justify-center rounded-lg px-2 py-1.5 w-full ${isSnow ? 'bg-blue-50 text-blue-500' : 'bg-stone-100 text-stone-500'}`}>
                     {isSnow ? <Snowflake size={16} className="mb-1"/> : <Droplets size={16} className="mb-1"/>}
                     <span className="text-[10px] font-bold">{precipProb}</span>
                 </div>
             )}
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
             <div className="flex justify-between items-start mb-2">
                 <h3 className="font-serif font-bold text-xl text-stone-800 leading-tight truncate pr-2">{item.name}</h3>
                 <div className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-stone-300" />
                 </div>
             </div>
             <p className="text-sm text-stone-500 font-medium flex items-center gap-1.5 truncate">
                <MapPin size={14} /> {item.location}
             </p>

            {/* Real-time Transport Dashboard */}
             {item.type === ItineraryType.TRANSPORT && (item.terminal || item.gate || item.platform) && (
                 <div className="mt-3 bg-white/60 rounded-xl p-2 border border-olive-100/50 flex flex-wrap gap-2 items-center">
                    {item.transportCode && (
                        <span className="text-[10px] font-bold bg-olive-50 text-olive-700 px-2 py-1 rounded">
                            {item.transportCode}
                        </span>
                    )}
                    {item.status && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                             <MonitorCheck size={10} /> {item.status}
                        </span>
                    )}
                    <div className="flex items-center gap-3 ml-auto pr-1">
                        {item.terminal && (
                            <div className="flex flex-col items-center leading-none">
                                <span className="text-[8px] font-bold text-stone-400 uppercase">Term</span>
                                <span className="text-sm font-bold text-stone-700">{item.terminal}</span>
                            </div>
                        )}
                        {item.gate && (
                            <div className="flex flex-col items-center leading-none">
                                <span className="text-[8px] font-bold text-stone-400 uppercase">Gate</span>
                                <span className="text-sm font-bold text-terracotta-600">{item.gate}</span>
                            </div>
                        )}
                         {item.platform && (
                            <div className="flex flex-col items-center leading-none">
                                <span className="text-[8px] font-bold text-stone-400 uppercase">Binario</span>
                                <span className="text-sm font-bold text-terracotta-600">{item.platform}</span>
                            </div>
                        )}
                    </div>
                 </div>
             )}
          </div>
          
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${style.iconBg}`}>
             <Icon size={18} />
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-5 pb-4 flex gap-2 items-center">
            {item.indoorMap && (
                 <button 
                    onClick={handleIndoorMap}
                    className="flex items-center gap-1 text-[10px] font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full border border-stone-200 transition-colors shadow-sm"
                >
                    <Map size={12} /> 內部地圖
                </button>
            )}
            
            {item.reservationCode && (
                 <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                    <Ticket size={12} /> 預約: {item.reservationCode}
                 </span>
            )}
             <button 
                onClick={handleNavigate}
                className="ml-auto flex items-center gap-1 text-[10px] font-bold text-stone-500 hover:text-blue-600 bg-white hover:bg-blue-50 px-3 py-1.5 rounded-full border border-stone-100 transition-colors shadow-sm"
            >
                <Navigation size={12} /> 導航
            </button>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className="px-5 pb-5 pt-1 space-y-4 animate-fadeIn">
            {item.description && (
                <p className="text-base text-stone-600 leading-relaxed font-light font-sans border-t border-stone-100 pt-3 italic">
                 "{item.description}"
                </p>
            )}

            {/* Tags Grid */}
            <div className="grid grid-cols-1 gap-3">
                {item.mustEat && item.mustEat.length > 0 && (
                <div className="bg-white/60 rounded-xl p-3 border border-terracotta-100/50">
                    <div className="flex items-center gap-1.5 text-terracotta-700 text-[10px] font-bold mb-2 uppercase tracking-wider">
                    <Utensils size={12} /> Must Eat
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {item.mustEat.map((food, i) => (
                        <span key={i} className="text-sm text-stone-700 font-medium bg-terracotta-50 px-2.5 py-1 rounded-md">
                        {food}
                        </span>
                    ))}
                    </div>
                </div>
                )}

                {item.tips && item.tips.length > 0 && (
                <div className="bg-white/60 rounded-xl p-3 border border-blue-100/50">
                    <div className="flex items-center gap-1.5 text-blue-700 text-[10px] font-bold mb-2 uppercase tracking-wider">
                    <Star size={12} /> Tips
                    </div>
                    <ul className="list-disc list-inside text-sm text-stone-600 space-y-1">
                    {item.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                    </ul>
                </div>
                )}
            </div>

            {item.externalLinks && item.externalLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {item.externalLinks.map((link, i) => (
                        <a 
                            key={i} 
                            href={link.url} 
                            target="_blank" 
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 text-xs font-bold text-stone-500 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition-colors"
                        >
                            <LinkIcon size={12} /> {link.label}
                        </a>
                    ))}
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;
