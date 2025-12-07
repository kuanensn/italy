import React, { useState } from 'react';
import { ItineraryItem, ItineraryType } from '../types';
import { MapPin, Utensils, Bus, Camera, ChevronDown, ChevronUp, Star, ShoppingBag, Navigation, Link as LinkIcon, Ticket } from 'lucide-react';

interface Props {
  item: ItineraryItem;
}

const ItineraryCard: React.FC<Props> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const getIcon = () => {
    switch (item.type) {
      case ItineraryType.RESTAURANT: return <Utensils className="w-5 h-5 text-terracotta-600" />;
      case ItineraryType.TRANSPORT: return <Bus className="w-5 h-5 text-olive-600" />;
      default: return <Camera className="w-5 h-5 text-tuscan-yellow-600" />;
    }
  };

  const getBorderColor = () => {
    switch (item.type) {
      case ItineraryType.RESTAURANT: return 'border-terracotta-200 bg-terracotta-50';
      case ItineraryType.TRANSPORT: return 'border-olive-200 bg-olive-50';
      default: return 'border-tuscan-yellow-200 bg-tuscan-yellow-50';
    }
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${item.name} ${item.location}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
  };

  return (
    <div 
      onClick={() => setExpanded(!expanded)}
      className={`relative mb-4 rounded-xl border-l-4 shadow-sm transition-all duration-300 overflow-hidden ${getBorderColor()} bg-white/90 backdrop-blur-sm cursor-pointer hover:shadow-md`}
    >
      <div className="p-4 flex items-start gap-3">
        {/* Time & Icon */}
        <div className="flex flex-col items-center gap-1 min-w-[3.5rem]">
          <span className="text-xs font-bold text-gray-500 font-serif">{item.time}</span>
          <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100">
            {getIcon()}
          </div>
          {/* Connector Line */}
          <div className="h-full w-px bg-gray-200 my-1 absolute top-12 left-[2.1rem] -z-10" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-lg font-bold text-gray-800 leading-tight pr-2">{item.name}</h3>
            {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <MapPin size={12} /> {item.location}
          </p>
          
          {/* Navigation Button (Always visible for easy access) */}
          <div className="flex gap-2 mt-3">
             <button 
                onClick={handleNavigate}
                className="flex items-center gap-1 text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform w-fit"
            >
                <Navigation size={12} /> 導航
            </button>
            {item.reservationCode && (
                 <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200">
                    <Ticket size={12} /> 預約: {item.reservationCode}
                 </span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 pl-[4.5rem] space-y-3 animate-fadeIn">
          <p className="text-sm text-gray-700 italic border-l-2 border-gray-300 pl-2">
            "{item.description}"
          </p>

          {/* Guide Insights */}
          <div className="space-y-2">
            {item.mustEat && item.mustEat.length > 0 && (
              <div className="bg-orange-100/80 p-2 rounded-md border border-orange-200">
                <div className="flex items-center gap-1 text-orange-800 text-xs font-bold mb-1">
                  <Utensils size={12} /> 必吃美食
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.mustEat.map((food, i) => (
                    <span key={i} className="text-xs bg-white text-orange-900 px-2 py-0.5 rounded shadow-sm border border-orange-100">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.mustBuy && item.mustBuy.length > 0 && (
              <div className="bg-purple-100/80 p-2 rounded-md border border-purple-200">
                <div className="flex items-center gap-1 text-purple-800 text-xs font-bold mb-1">
                  <ShoppingBag size={12} /> 必買伴手禮
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.mustBuy.map((buy, i) => (
                    <span key={i} className="text-xs bg-white text-purple-900 px-2 py-0.5 rounded shadow-sm border border-purple-100">
                      {buy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.tips && item.tips.length > 0 && (
              <div className="bg-blue-50/80 p-2 rounded-md border border-blue-200">
                <div className="flex items-center gap-1 text-blue-800 text-xs font-bold mb-1">
                  <Star size={12} /> 導遊祕技
                </div>
                <ul className="list-disc list-inside text-xs text-blue-900 space-y-1">
                  {item.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.externalLinks && item.externalLinks.length > 0 && (
                <div className="pt-2">
                    <p className="text-xs text-gray-400 font-bold mb-1">相關連結 & 攻略</p>
                    <div className="flex flex-col gap-1">
                        {item.externalLinks.map((link, i) => (
                            <a 
                                key={i} 
                                href={link.url} 
                                target="_blank" 
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-xs text-olive-700 bg-olive-50/50 hover:bg-olive-100 px-2 py-1.5 rounded transition-colors border border-olive-100"
                            >
                                <LinkIcon size={12} />
                                <span className="truncate underline decoration-olive-300 underline-offset-2">{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;