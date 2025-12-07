import React, { useState, useEffect } from 'react';
import ItineraryCard from './components/ItineraryCard';
import UtilityHub from './components/UtilityHub';
import { Trip, DayPlan } from './types';
import { initialTripData } from './services/initialTripData';
import { Map, Briefcase, Calendar, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  // Load the specific itinerary requested by the user immediately
  const [trip, setTrip] = useState<Trip | null>(initialTripData);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'ITINERARY' | 'UTILITIES'>('ITINERARY');

  const WeatherWidget = ({ weather }: { weather: DayPlan['weather'] }) => {
    return (
        <div className="flex items-center gap-2 bg-blue-50/50 px-3 py-1 rounded-full border border-blue-100 shadow-sm ml-auto">
             <span className="text-xl">{weather.icon}</span>
             <div className="flex flex-col leading-none">
                 <span className="text-xs font-bold text-blue-900">{weather.temp}</span>
                 <span className="text-[10px] text-blue-700 uppercase tracking-wide">{weather.condition}</span>
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

  // Fallback if no trip data (should not happen with initialTripData)
  if (!trip) return null;

  return (
    <div className="h-screen flex flex-col bg-[#FEFBF6] overflow-hidden max-w-md mx-auto shadow-2xl relative">
      
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-white shadow-sm z-20 flex justify-between items-end">
        <div>
           <p className="text-xs text-olive-600 font-bold uppercase tracking-widest mb-1">本次旅程</p>
           <h1 className="font-serif text-2xl font-bold text-gray-800 leading-none">{trip.title}</h1>
           <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
             <Calendar size={12} /> {trip.days.length} 天 - {trip.destination}
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        {currentView === 'ITINERARY' ? (
          <div className="px-4 py-6 space-y-8 pb-24">
            {trip.days.map((dayPlan, index) => (
              <div key={index} className="space-y-4">
                {/* Day Header */}
                <div className="sticky top-0 bg-[#FEFBF6]/95 backdrop-blur-sm z-10 py-2 border-b border-gray-200/50 flex items-center justify-between">
                   <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl font-bold text-terracotta-600">Day {dayPlan.day}</span>
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
                    <div className="absolute left-[1.65rem] top-4 bottom-4 w-px bg-gray-200 border-l border-dashed border-gray-300"></div>
                    
                    {dayPlan.items.map((item) => (
                        <ItineraryCard key={item.id} item={item} />
                    ))}
                </div>
              </div>
            ))}
            
            <div className="text-center py-8">
                <p className="font-serif italic text-gray-400">Buon Viaggio! (旅途愉快)</p>
            </div>
          </div>
        ) : (
          <UtilityHub />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 py-2 px-6 pb-6 flex justify-around shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-30">
        <button 
          onClick={() => setCurrentView('ITINERARY')}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === 'ITINERARY' ? 'text-terracotta-600 scale-105' : 'text-gray-400'}`}
        >
          <Map className={currentView === 'ITINERARY' ? 'fill-terracotta-100' : ''} size={24} />
          <span className="text-[10px] font-bold tracking-wide">行程表</span>
        </button>

        <button 
          onClick={() => setCurrentView('UTILITIES')}
          className={`flex flex-col items-center gap-1 transition-all ${currentView === 'UTILITIES' ? 'text-olive-600 scale-105' : 'text-gray-400'}`}
        >
          <Briefcase className={currentView === 'UTILITIES' ? 'fill-olive-100' : ''} size={24} />
          <span className="text-[10px] font-bold tracking-wide">旅遊工具</span>
        </button>
      </nav>

    </div>
  );
};

export default App;