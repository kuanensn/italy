
import React, { useState } from 'react';
import { Plane, Building, Phone, Wallet, Ticket, Luggage, Search, ExternalLink } from 'lucide-react';
import BudgetTracker from './BudgetTracker';

const UtilityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FLIGHT' | 'HOTEL' | 'SOS' | 'WALLET'>('WALLET');
  // State to track which flight has baggage rules expanded
  const [expandedBaggage, setExpandedBaggage] = useState<string | null>(null);

  const tabs = [
    { id: 'WALLET', icon: <Wallet size={18} />, label: '記帳' },
    { id: 'FLIGHT', icon: <Plane size={18} />, label: '航班' },
    { id: 'HOTEL', icon: <Building size={18} />, label: '住宿' },
    { id: 'SOS', icon: <Phone size={18} />, label: '緊急' },
  ] as const;

  const flights = [
    { date: '12/21', route: 'TPE ➔ PVG', airline: 'China Airlines', code: 'CI 075', time: '18:40', terminal: 'T2', gate: 'D5', note: '16:30 集合', baggage: '隨身 7kg, 托運 23kg' },
    { date: '12/22', route: 'PVG ➔ MXP', airline: 'ITA Airways', code: 'AZ 795', time: '01:20', terminal: 'T1', gate: '-', note: '票價 6277 TWD', baggage: '隨身 8kg, 托運 23kg' },
    { date: '12/22', route: 'MXP ➔ PMO', airline: 'ITA Airways', code: '-', time: '10:30', terminal: '-', gate: '-', note: '羅馬轉機', baggage: '隨身 45x36x20 15kg, 托運 158cm 23kg' },
    { date: '12/25', route: 'PMO ➔ NAP', airline: 'EasyJet', code: '-', time: '07:45', terminal: '-', gate: '-', note: '票價 2921 TWD', baggage: '隨身 45x36x20 15kg, 托運 275cm 23kg' },
    { date: '12/28', route: 'BRI ➔ FCO', airline: 'Ryanair', code: '-', time: '13:55', terminal: '-', gate: '-', note: '票價 2834 TWD', baggage: '隨身 40x25x20 10kg, 托運 80x120x120 20kg' },
    { date: '1/3', route: 'MXP ➔ PVG', airline: 'Air China', code: '-', time: '12:10', terminal: 'T1', gate: '-', note: '返程', baggage: '隨身 5kg, 托運 23kg' },
  ];

  const hotels = [
      { name: 'Palermo Stay', location: 'Palermo', dates: '12/22 - 12/24', desc: '西西里島首府據點' },
      { name: 'Napoli Stay', location: 'Naples, Italy', dates: '12/25 - 12/27', desc: '披薩與古城' },
      { name: 'Rome Stay', location: 'Rome, Italy', dates: '12/28 - 12/30', desc: '永恆之城' },
      { name: 'Venice Stay', location: 'Venice, Italy', dates: '12/30 - 1/1', desc: '水都浪漫' },
      { name: 'Milan Stay', location: 'Milan, Italy', dates: '1/1 - 1/3', desc: '時尚中心' },
  ];

  const openSearch = (platform: 'agoda' | 'airbnb', query: string) => {
      let url = '';
      if (platform === 'agoda') {
          url = `https://www.agoda.com/search?text=${encodeURIComponent(query)}`;
      } else {
          url = `https://www.airbnb.com/s/${encodeURIComponent(query)}/homes`;
      }
      window.open(url, '_blank');
  };

  return (
    <div className="h-full flex flex-col bg-stone-50">
        {/* Sticky Utility Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm p-2">
        <div className="flex justify-between bg-stone-100 p-1 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-olive-700 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab.icon}
              <span className="mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'WALLET' && <BudgetTracker />}
        
        {activeTab === 'FLIGHT' && (
            <div className="p-4 space-y-4">
                {flights.map((flight, idx) => (
                     <div 
                        key={idx} 
                        className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 relative overflow-hidden cursor-pointer transition-all hover:shadow-md"
                        onClick={() => setExpandedBaggage(expandedBaggage === idx.toString() ? null : idx.toString())}
                     >
                        <div className="absolute top-0 right-0 p-2 bg-stone-100 rounded-bl-xl">
                            <span className="text-xs font-mono font-bold text-stone-500">{flight.date}</span>
                        </div>
                        <h3 className="text-stone-800 font-bold text-lg mb-2 flex items-center gap-2">
                            <Ticket size={16} className="text-terracotta-600"/> {flight.route}
                        </h3>
                        <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-sm text-stone-600">
                            <div className="col-span-1">
                                <p className="text-[10px] text-stone-400 uppercase">航空公司</p>
                                <p className="font-semibold">{flight.airline}</p>
                            </div>
                             <div className="col-span-1">
                                <p className="text-[10px] text-stone-400 uppercase">航廈 Terminal</p>
                                <p className="font-semibold text-lg">{flight.terminal}</p>
                            </div>
                            <div className="col-span-1">
                                <p className="text-[10px] text-stone-400 uppercase">登機口 Gate</p>
                                <p className="font-semibold text-lg text-terracotta-600">{flight.gate}</p>
                            </div>
                            
                            <div className="col-span-1">
                                <p className="text-[10px] text-stone-400 uppercase">航班代號</p>
                                <p className="font-semibold">{flight.code}</p>
                            </div>
                             <div className="col-span-2">
                                <p className="text-[10px] text-stone-400 uppercase">起飛時間</p>
                                <p className="font-semibold text-lg text-stone-800">{flight.time}</p>
                            </div>
                        </div>

                        {/* Baggage Section (Expandable) */}
                        {expandedBaggage === idx.toString() && (
                            <div className="mt-3 pt-3 border-t border-stone-100 animate-fadeIn">
                                <div className="flex items-start gap-2 bg-stone-50 p-2 rounded-lg">
                                    <Luggage size={16} className="text-stone-500 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold text-stone-600 mb-1">行李規定</p>
                                        <p className="text-xs text-stone-500">{flight.baggage}</p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-right text-stone-400 mt-1 italic">點擊卡片以收合</p>
                            </div>
                        )}
                        {expandedBaggage !== idx.toString() && (
                             <p className="text-[10px] text-center text-stone-300 mt-2">點擊查看行李規定</p>
                        )}
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'HOTEL' && (
             <div className="p-4 space-y-4">
                 {hotels.map((hotel, idx) => (
                     <div key={idx} className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">
                        <div className="h-20 bg-stone-800 relative flex items-center justify-center">
                            <span className="text-white font-serif italic text-xl">{hotel.name}</span>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-stone-800">{hotel.location.split(',')[0]}</h3>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">{hotel.dates}</span>
                            </div>
                            <p className="text-xs text-stone-500 mb-4">{hotel.desc}</p>
                            
                            {/* Search Buttons */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => openSearch('agoda', hotel.location)}
                                    className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                                >
                                    <Search size={12} /> Agoda
                                </button>
                                <button 
                                    onClick={() => openSearch('airbnb', hotel.location)}
                                    className="flex-1 flex items-center justify-center gap-1 bg-rose-50 text-rose-600 py-2 rounded-lg text-xs font-bold hover:bg-rose-100 transition-colors"
                                >
                                    <Search size={12} /> Airbnb
                                </button>
                            </div>
                        </div>
                    </div>
                 ))}
            </div>
        )}

        {activeTab === 'SOS' && (
             <div className="p-4 space-y-3">
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <h3 className="text-red-800 font-bold mb-3 flex items-center gap-2">
                        <Phone size={18} /> 緊急聯絡電話
                    </h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                            <span className="font-medium text-gray-700">當地警察 (Carabinieri)</span>
                            <a href="tel:112" className="text-red-600 font-bold px-3 py-1 bg-red-50 rounded-full">112</a>
                        </div>
                        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                            <span className="font-medium text-gray-700">救護車</span>
                            <a href="tel:118" className="text-red-600 font-bold px-3 py-1 bg-red-50 rounded-full">118</a>
                        </div>
                         <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-700">駐義代表處 (急難救助)</span>
                                <span className="text-[10px] text-gray-400">Rome Office</span>
                            </div>
                            <a href="tel:+393381418946" className="text-blue-600 font-bold px-3 py-1 bg-blue-50 rounded-full">撥打</a>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default UtilityHub;
