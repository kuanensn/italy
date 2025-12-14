
import React, { useState } from 'react';
import { ItineraryItem, ItineraryType, DayPlan } from '../types';
import { MapPin, ChevronDown, Navigation, Link as LinkIcon, Ticket, Utensils, Star, Bus, Plane, Train, MonitorCheck, Map as MapIcon } from 'lucide-react';

interface Props {
  item: ItineraryItem;
  weather?: DayPlan['weather'];
}

const ItineraryCard: React.FC<Props> = ({ item, weather }) => {
  const [expanded, setExpanded] = useState(false);

  // Helper to determine transport icon
  const getTransportIcon = () => {
      if (item.name.includes('飛') || item.name.includes('機')) return Plane;
      if (item.name.includes('鐵') || item.name.includes('Train')) return Train;
      return Bus;
  };
  const TransportIcon = getTransportIcon();

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

  // Google Maps Embed URL for preview
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(item.location || item.name)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  // Status Color Logic
  const getStatusColor = (status?: string) => {
      if (!status) return 'bg-gray-100 text-gray-600';
      if (status.includes('延誤') || status.includes('Delay')) return 'bg-red-50 text-red-700 border-red-200';
      if (status.includes('取消')) return 'bg-stone-800 text-white';
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  return (
    <div className="relative group pl-2">
      {/* Timeline Dot */}
      <div className={`absolute -left-[1.2rem] top-10 w-3 h-3 rounded-full border-2 border-[#f8f5f1] bg-terracotta-600 shadow-sm z-10 transition-colors group-hover:bg-terracotta-800`}></div>

      {/* Main Card Container - 3 Column Layout */}
      <div 
        className={`relative flex bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.08)] border border-stone-200 transition-all duration-300 hover:shadow-lg overflow-hidden ${expanded ? 'ring-1 ring-terracotta-200' : ''}`}
      >
        
        {/* LEFT COLUMN: Time & Weather */}
        <div className="w-[4.5rem] bg-stone-50/80 flex flex-col items-center pt-5 pb-4 border-r border-stone-200 shrink-0 gap-3">
             <div className="flex flex-col items-center leading-none">
                <span className="font-serif font-black text-2xl text-stone-800">{item.time.split(':')[0]}</span>
                <span className="font-sans text-[10px] font-bold text-stone-600 mt-1">{item.time.split(':')[1]}</span>
             </div>
             
             {/* Weather Indicator */}
             {weather && (
                 <div className="flex flex-col items-center mt-1">
                     <span className="text-lg grayscale-0 drop-shadow-sm">{weather.icon}</span>
                     <span className="text-[9px] font-bold text-stone-500 mt-0.5">{weather.temp}</span>
                 </div>
             )}
        </div>

        {/* CENTER COLUMN: Info & Actions */}
        <div 
            className="flex-1 min-w-0 p-3 pt-4 flex flex-col relative" 
            onClick={() => setExpanded(!expanded)}
        >
             {/* Header */}
             <div className="flex justify-between items-start mb-1 pr-1">
                 <h3 className="font-serif font-bold text-base text-stone-900 leading-tight truncate">{item.name}</h3>
                 <div className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} className="text-stone-400" />
                 </div>
             </div>
             
             {/* Location Subtitle */}
             <div className="flex items-center gap-1 text-xs text-stone-600 font-bold mb-2 truncate">
                <MapPin size={10} className="shrink-0 text-stone-400" />
                <span className="truncate">{item.location}</span>
             </div>

             {/* Transport Dashboard (Compact) */}
             {item.type === ItineraryType.TRANSPORT && (
                 <div className="mb-2 flex flex-wrap gap-1.5">
                    {item.transportCode && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200">
                           <TransportIcon size={10} /> {item.transportCode}
                        </span>
                    )}
                    {(item.terminal || item.gate || item.platform) && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-orange-50 border border-orange-100">
                             {item.terminal && <span className="text-[9px] font-bold text-orange-800">T{item.terminal}</span>}
                             {item.gate && <span className="text-[9px] font-bold text-orange-700">Gate {item.gate}</span>}
                             {item.platform && <span className="text-[9px] font-bold text-orange-700">Plat {item.platform}</span>}
                        </div>
                    )}
                    {item.status && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(item.status)}`}>
                            {item.status}
                        </span>
                    )}
                 </div>
             )}

             {/* Quick Actions (Collapsed view badge) */}
             {!expanded && item.reservationCode && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded self-start border border-emerald-200 mt-auto">
                    <Ticket size={10} /> {item.reservationCode}
                 </span>
             )}

             {/* EXPANDED CONTENT AREA */}
             {expanded && (
                <div className="mt-2 pt-2 border-t border-dashed border-stone-200 space-y-3 animate-fadeIn">
                    {item.description && <p className="text-xs text-stone-700 font-medium leading-relaxed">"{item.description}"</p>}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {item.indoorMap && (
                            <button onClick={handleIndoorMap} className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold bg-stone-800 text-white py-2 rounded-lg active:scale-95 transition-transform shadow-sm">
                                <MapIcon size={10} /> 室內地圖
                            </button>
                        )}
                        {item.externalLinks?.map((link, i) => (
                             <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold bg-white text-stone-700 border border-stone-200 py-2 rounded-lg active:scale-95 transition-transform shadow-sm hover:bg-stone-50">
                                <LinkIcon size={10} /> {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Must Eat / Tips Tags */}
                    {(item.mustEat || item.tips) && (
                        <div className="space-y-2">
                            {item.mustEat && (
                                <div className="flex flex-wrap gap-1">
                                    <span className="text-[9px] font-bold text-terracotta-600 uppercase mr-1 flex items-center"><Utensils size={10} className="mr-0.5"/> 必吃</span>
                                    {item.mustEat.map(f => <span key={f} className="text-[10px] font-bold text-stone-700 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">{f}</span>)}
                                </div>
                            )}
                            {item.tips && (
                                <div className="flex flex-wrap gap-1">
                                    <span className="text-[9px] font-bold text-blue-500 uppercase mr-1 flex items-center"><Star size={10} className="mr-0.5"/> Tips</span>
                                    {item.tips.map(t => <span key={t} className="text-[10px] font-bold text-stone-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">{t}</span>)}
                                </div>
                            )}
                        </div>
                    )}
                </div>
             )}
        </div>

        {/* RIGHT COLUMN: Map Preview */}
        <div className="w-[5.5rem] p-2 pl-0 flex flex-col justify-start shrink-0">
             <div 
                className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-inner bg-stone-100 group/map cursor-pointer hover:shadow-md transition-all active:scale-95 border border-stone-200"
                onClick={handleNavigate}
             >
                {/* Embedded Map */}
                <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={mapUrl}
                    className="absolute inset-0 w-full h-full opacity-80 pointer-events-none grayscale-[0]"
                    title="Map Preview"
                ></iframe>
                
                {/* Floating Nav Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center shadow-md text-white z-10 ring-2 ring-white">
                    <Navigation size={14} fill="currentColor" />
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default ItineraryCard;
