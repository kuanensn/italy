
import React, { useState } from 'react';
import { Plane, Building, Phone, Wallet, Ticket, Luggage, Search, ArrowRight, BedDouble, AlertTriangle } from 'lucide-react';
import BudgetTracker from './BudgetTracker';

const UtilityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FLIGHT' | 'HOTEL' | 'SOS' | 'WALLET'>('WALLET');
  const [expandedBaggage, setExpandedBaggage] = useState<string | null>(null);

  const tabs = [
    { id: 'WALLET', icon: Wallet, label: '記帳' },
    { id: 'FLIGHT', icon: Plane, label: '交通' },
    { id: 'HOTEL', icon: Building, label: '住宿' },
    { id: 'SOS', icon: Phone, label: '緊急' },
  ] as const;

  const flights = [
    { date: '12/21', from: 'TPE', to: 'PVG', airline: 'China Eastern', code: 'MU 5006', time: '18:40', terminal: 'T2', gate: '-', baggage: '隨身 10kg, 托運 23kg' },
    { date: '12/22', from: 'PVG', to: 'MXP', airline: 'China Eastern', code: 'MU 243', time: '01:20', terminal: 'T1', gate: '-', baggage: '隨身 10kg, 托運 23kg' },
    { date: '12/22', from: 'MXP', to: 'PMO', airline: 'Ryanair', code: '-', time: '13:05', terminal: 'T1', gate: '-', baggage: '隨身 40x20x25' },
    { date: '12/25', from: 'PMO', to: 'NAP', airline: 'EasyJet', code: 'EJU 4102', time: '07:45', terminal: '-', gate: '-', baggage: '隨身 45x36x20' },
    { date: '12/28', from: 'BRI', to: 'ROM', airline: 'Train', code: '-', time: '08:40', terminal: 'Stazione', gate: '-', baggage: '無限制' },
    { date: '12/30', from: 'ROM', to: 'VCE', airline: 'Frecciarossa', code: '-', time: '09:35', terminal: 'Termini', gate: '-', baggage: '無限制' },
    { date: '1/1', from: 'VCE', to: 'MXP', airline: 'Frecciarossa', code: '-', time: '15:18', terminal: 'S.Lucia', gate: '-', baggage: '無限制' },
    { date: '1/3', from: 'MXP', to: 'PVG', airline: 'Air China', code: 'CA 836', time: '12:10', terminal: 'T1', gate: '-', baggage: '隨身 5kg, 托運 23kg' },
    { date: '1/4', from: 'PVG', to: 'TPE', airline: 'China Airlines', code: 'CI 502', time: '12:05', terminal: 'T2', gate: '-', baggage: '隨身 7kg, 托運 23kg' },
  ];

  const hotels = [
      { name: 'Palermo Hotel', location: 'P.za Giulio Cesare, 19, Palermo', dates: '12/22 - 12/25', type: '西西里島' },
      { name: 'Napoli Hotel', location: '60 Vico Tre Re a Toledo, Naples', dates: '12/25 - 12/27', type: '那不勒斯' },
      { name: 'Bari Hotel', location: 'Corte S. Pietro Vecchio, Bari', dates: '12/27 - 12/28', type: '普利亞' },
      { name: 'Roma Hotel', location: 'Via Rimini, 14, Rome', dates: '12/28 - 12/30', type: '聖喬瓦尼區' },
      { name: 'Venice Hotel', location: '192 Via Aleardo Aleardi, Mestre', dates: '12/30 - 1/1', type: '梅斯特' },
      { name: 'Milan Hotel', location: 'Via Carpaccio, 3, Milan', dates: '1/1 - 1/3', type: '米蘭' },
  ];

  return (
    <div className="h-full flex flex-col">
        {/* Sliding Tabs */}
      <div className="bg-[#f8f5f1] pt-2 pb-4 sticky top-0 z-10">
        <div className="flex bg-white p-1.5 rounded-full shadow-sm border border-stone-200 mx-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-stone-800 text-white shadow-md' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-6 px-4 pb-32">
        {activeTab === 'WALLET' && <BudgetTracker />}
        
        {activeTab === 'FLIGHT' && (
            <div className="space-y-4">
                {flights.map((flight, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setExpandedBaggage(expandedBaggage === idx.toString() ? null : idx.toString())}
                        className="relative bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                    >
                        {/* Cutouts for Boarding Pass Look */}
                        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#f8f5f1] rounded-full border-r border-stone-200"></div>
                        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#f8f5f1] rounded-full border-l border-stone-200"></div>
                        <div className="absolute top-1/2 left-4 right-4 border-t-2 border-dashed border-stone-100"></div>

                        {/* Top Part */}
                        <div className="p-5 pb-8 relative">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold bg-stone-100 text-stone-500 px-2 py-0.5 rounded uppercase">{flight.airline}</span>
                                <span className="text-xs font-mono text-stone-400">{flight.date}</span>
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-stone-800">{flight.from}</div>
                                    <div className="text-[10px] text-stone-400 font-bold uppercase">Origin</div>
                                </div>
                                <Plane size={20} className="text-stone-300 rotate-90" />
                                <div className="text-center">
                                    <div className="text-3xl font-black text-stone-800">{flight.to}</div>
                                    <div className="text-[10px] text-stone-400 font-bold uppercase">Dest</div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Part */}
                        <div className="bg-stone-50 p-5 pt-8 flex justify-between items-end border-t border-dashed border-stone-200">
                             <div className="space-y-1">
                                <div className="flex gap-4">
                                    <div>
                                        <p className="text-[9px] font-bold text-stone-400 uppercase">Flight</p>
                                        <p className="font-mono font-bold text-stone-700">{flight.code}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-stone-400 uppercase">Time</p>
                                        <p className="font-mono font-bold text-stone-700">{flight.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-stone-400 uppercase">Gate</p>
                                        <p className="font-mono font-bold text-terracotta-600">{flight.gate}</p>
                                    </div>
                                </div>
                             </div>
                             {expandedBaggage === idx.toString() ? (
                                 <div className="text-xs text-stone-500 bg-white px-2 py-1 rounded border border-stone-100 animate-fadeIn">
                                     <Luggage size={12} className="inline mr-1"/> {flight.baggage}
                                 </div>
                             ) : (
                                 <Luggage size={16} className="text-stone-300" />
                             )}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'HOTEL' && (
             <div className="space-y-5">
                 {hotels.map((hotel, idx) => (
                     <div key={idx} className="bg-white rounded-3xl shadow-sm border border-stone-200 p-1">
                         {/* Fake Image Gradient */}
                        <div className={`h-24 rounded-2xl bg-gradient-to-br ${idx % 2 === 0 ? 'from-orange-100 to-rose-100' : 'from-blue-100 to-indigo-100'} flex items-center justify-center relative overflow-hidden`}>
                             <BedDouble size={32} className="text-white/50 absolute -bottom-4 -right-4 rotate-12" />
                             <span className="font-serif italic font-bold text-xl text-stone-800/60 z-10">{hotel.type}</span>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-lg text-stone-800 leading-tight">{hotel.name}</h3>
                            </div>
                             <p className="text-xs text-stone-500 mb-2">{hotel.location}</p>
                            <p className="text-xs font-mono text-stone-400 mb-0">{hotel.dates}</p>
                        </div>
                    </div>
                 ))}
            </div>
        )}

        {activeTab === 'SOS' && (
             <div className="space-y-4">
                 <div className="bg-red-50 p-6 rounded-3xl border border-red-100 text-center">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={32} />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-red-800 mb-1">Emergency</h3>
                    <p className="text-xs text-red-400 mb-6">義大利緊急救援電話</p>
                    
                    <div className="space-y-3">
                        <a href="tel:112" className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                            <span className="font-bold text-stone-700">歐盟通用 (警察/救護)</span>
                            <span className="font-mono font-black text-xl text-red-600">112</span>
                        </a>
                        <a href="tel:+393381418946" className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                            <span className="font-bold text-stone-700 text-left">駐義代表處<br/><span className="text-[10px] text-stone-400 font-normal">急難救助</span></span>
                            <Phone size={20} className="text-red-600" />
                        </a>
                    </div>
                 </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default UtilityHub;
