import React, { useState } from 'react';
import { Plane, Building, Phone, Wallet, Ticket } from 'lucide-react';
import BudgetTracker from './BudgetTracker';

const UtilityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FLIGHT' | 'HOTEL' | 'SOS' | 'WALLET'>('WALLET');

  const tabs = [
    { id: 'WALLET', icon: <Wallet size={18} />, label: '記帳' },
    { id: 'FLIGHT', icon: <Plane size={18} />, label: '航班' },
    { id: 'HOTEL', icon: <Building size={18} />, label: '住宿' },
    { id: 'SOS', icon: <Phone size={18} />, label: '緊急' },
  ] as const;

  const flights = [
    { date: '12/21', route: 'TPE ➔ PVG', airline: 'China Airlines', code: 'CI 075', time: '18:40', gate: 'T2', note: '16:30 集合' },
    { date: '12/22', route: 'PVG ➔ MXP', airline: 'ITA Airways', code: 'AZ 795', time: '01:20', gate: '-', note: '票價 6277 TWD' },
    { date: '12/22', route: 'MXP ➔ PMO', airline: 'ITA Airways', code: '-', time: '10:30', gate: '-', note: '羅馬轉機' },
    { date: '12/25', route: 'PMO ➔ NAP', airline: 'EasyJet', code: '-', time: '07:45', gate: '-', note: '票價 2921 TWD' },
    { date: '12/28', route: 'BRI ➔ FCO', airline: 'Ryanair', code: '-', time: '13:55', gate: '-', note: '票價 2834 TWD' },
    { date: '1/3', route: 'MXP ➔ PVG', airline: 'Air China', code: '-', time: '12:10', gate: '-', note: '返程' },
  ];

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
                     <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 bg-stone-100 rounded-bl-xl">
                            <span className="text-xs font-mono font-bold text-stone-500">{flight.date}</span>
                        </div>
                        <h3 className="text-stone-800 font-bold text-lg mb-2 flex items-center gap-2">
                            <Ticket size={16} className="text-terracotta-600"/> {flight.route}
                        </h3>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-stone-600">
                            <div>
                                <p className="text-[10px] text-stone-400 uppercase">航空公司</p>
                                <p className="font-semibold">{flight.airline}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-stone-400 uppercase">航班代號</p>
                                <p className="font-semibold">{flight.code}</p>
                            </div>
                             <div>
                                <p className="text-[10px] text-stone-400 uppercase">起飛時間</p>
                                <p className="font-semibold text-lg text-stone-800">{flight.time}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-stone-400 uppercase">備註</p>
                                <p className="font-semibold text-terracotta-600">{flight.note}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'HOTEL' && (
             <div className="p-4 space-y-4">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">
                    <div className="h-24 bg-stone-800 relative flex items-center justify-center">
                        <span className="text-white font-serif italic text-xl">Palermo Stay</span>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-stone-800">巴勒莫住宿</h3>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">12/22 - 12/24</span>
                        </div>
                        <p className="text-xs text-stone-500">西西里島首府據點</p>
                    </div>
                </div>

                 <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">
                    <div className="h-24 bg-stone-800 relative flex items-center justify-center">
                        <span className="text-white font-serif italic text-xl">Napoli Stay</span>
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-bold text-stone-800">那不勒斯住宿</h3>
                             <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">12/25 - 12/27</span>
                        </div>
                    </div>
                </div>
                 <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">
                    <div className="h-24 bg-stone-800 relative flex items-center justify-center">
                        <span className="text-white font-serif italic text-xl">Rome Stay</span>
                    </div>
                    <div className="p-4">
                         <div className="flex justify-between items-center mb-2">
                             <h3 className="font-bold text-stone-800">羅馬住宿</h3>
                             <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">12/28 - 12/30</span>
                        </div>
                    </div>
                </div>
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