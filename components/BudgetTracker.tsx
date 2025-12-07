
import React, { useState, useEffect, useMemo } from 'react';
import { Expense } from '../types';
import { Plus, Trash2, Wallet, PieChart as PieChartIcon, RefreshCw, Filter } from 'lucide-react';

const STORAGE_KEY = 'dolce-vita-expenses-v1';

const defaultExpenses: Expense[] = [
    { id: 'init-1', description: '米蘭機票 (ITA)', amount: 6277, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-2', description: '那不勒斯機票 (EasyJet)', amount: 2921, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-3', description: '羅馬機票 (Ryanair)', amount: 2834, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-4', description: '巴士 (Naples -> Bari)', amount: 525, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-5', description: '高鐵 (Rome -> Venice)', amount: 2701, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-6', description: '高鐵 (Venice -> Milan)', amount: 2068, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
];

// Simple Donut Chart Component
const SimpleDonutChart = ({ data }: { data: { label: string, value: number, color: string }[] }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    let cumulativeAngle = 0;

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    if (total === 0) return (
        <div className="h-40 flex items-center justify-center text-gray-400 text-xs">尚無數據</div>
    );

    return (
        <div className="flex items-center gap-4">
            <div className="relative w-32 h-32 shrink-0">
                <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
                    {data.map((slice, i) => {
                        const startPercent = cumulativeAngle / total;
                        const slicePercent = slice.value / total;
                        cumulativeAngle += slice.value;
                        const endPercent = cumulativeAngle / total;

                        const [startX, startY] = getCoordinatesForPercent(startPercent);
                        const [endX, endY] = getCoordinatesForPercent(endPercent);

                        const largeArcFlag = slicePercent > 0.5 ? 1 : 0;
                        const pathData = [
                            `M ${startX} ${startY}`,
                            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                            `L 0 0`,
                        ].join(' ');

                        return (
                            <path 
                                key={i} 
                                d={pathData} 
                                fill={slice.color} 
                                stroke="white" 
                                strokeWidth="0.05" 
                            />
                        );
                    })}
                    <circle cx="0" cy="0" r="0.6" fill="white" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-[10px] text-gray-400 font-bold">總計</span>
                     <span className="text-xs font-bold text-gray-700">
                         {total > 1000 ? `${(total/1000).toFixed(1)}k` : total}
                     </span>
                </div>
            </div>
            <div className="space-y-1 flex-1">
                {data.map((slice, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: slice.color }}></span>
                            <span className="text-gray-600 truncate">{slice.label}</span>
                        </div>
                        <span className="font-bold text-gray-800">{Math.round((slice.value / total) * 100)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BudgetTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : defaultExpenses;
    } catch (e) {
        console.error("Failed to load expenses", e);
        return defaultExpenses;
    }
  });

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [category, setCategory] = useState<Expense['category']>('FOOD');
  const [paidBy, setPaidBy] = useState<Expense['paidBy']>('ME');
  const [filterType, setFilterType] = useState<'ALL' | 'ME' | 'GROUP'>('ALL');

  const rate = 34.5; // TWD to EUR example

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!description || !amount) return;
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description,
      amount: parseFloat(amount),
      currency,
      category,
      paidBy
    };
    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const removeExpense = (id: string) => {
    if (window.confirm('確定要刪除這筆紀錄嗎？')) {
        setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const resetToDefault = () => {
      if (window.confirm('確定要重置所有記帳資料回到預設值嗎？自訂的紀錄將會消失。')) {
          setExpenses(defaultExpenses);
      }
  }

  // Filter expenses
  const filteredExpenses = expenses.filter(e => {
      if (filterType === 'ALL') return true;
      return e.paidBy === filterType;
  });

  // Calculate Chart Data
  const chartData = useMemo(() => {
      const categoryTotals: Record<string, number> = {};
      
      filteredExpenses.forEach(e => {
        let val = e.amount;
        if (e.currency === 'EUR') val = e.amount * rate;
        if (e.currency === 'USD') val = e.amount * 31;
        // JPY approx 0.22
        if (e.currency === 'JPY') val = e.amount * 0.22;
        
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + val;
      });

      const colors: Record<string, string> = {
          'FOOD': '#fca5a5', // red-300
          'TRANSPORT': '#93c5fd', // blue-300
          'SHOPPING': '#d8b4fe', // purple-300
          'STAY': '#86efac', // green-300
          'OTHER': '#cbd5e1', // slate-300
      };

      const labels: Record<string, string> = {
          'FOOD': '食物',
          'TRANSPORT': '交通',
          'SHOPPING': '購物',
          'STAY': '住宿',
          'OTHER': '其他',
      };

      return Object.keys(categoryTotals).map(cat => ({
          label: labels[cat] || cat,
          value: Math.round(categoryTotals[cat]),
          color: colors[cat] || '#ccc'
      })).sort((a, b) => b.value - a.value);
  }, [filteredExpenses]);


  const totalTWD = filteredExpenses.reduce((acc, curr) => {
    if (curr.currency === 'TWD') return acc + curr.amount;
    if (curr.currency === 'EUR') return acc + (curr.amount * rate);
    if (curr.currency === 'USD') return acc + (curr.amount * 31);
    if (curr.currency === 'JPY') return acc + (curr.amount * 0.22);
    return acc + curr.amount;
  }, 0);

  return (
    <div className="p-4 space-y-6">
      
      {/* Chart Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-700 font-bold flex items-center gap-2">
                <PieChartIcon size={18} /> 消費分析
            </h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                    onClick={() => setFilterType('ME')}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${filterType === 'ME' ? 'bg-white shadow text-olive-700 font-bold' : 'text-gray-500'}`}
                >個人</button>
                 <button 
                    onClick={() => setFilterType('GROUP')}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${filterType === 'GROUP' ? 'bg-white shadow text-olive-700 font-bold' : 'text-gray-500'}`}
                >團體</button>
                <button 
                    onClick={() => setFilterType('ALL')}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${filterType === 'ALL' ? 'bg-white shadow text-olive-700 font-bold' : 'text-gray-500'}`}
                >全部</button>
            </div>
        </div>
        <SimpleDonutChart data={chartData} />
      </div>

      <div className="bg-olive-50 p-6 rounded-2xl shadow-sm text-center border border-olive-100 relative overflow-hidden">
        <h3 className="text-olive-800 font-serif mb-1">
            {filterType === 'ALL' ? '總支出' : filterType === 'ME' ? '個人總支出' : '團體總支出'}
        </h3>
        <p className="text-3xl font-bold text-olive-900">
          TWD {totalTWD.toLocaleString()}
        </p>
        <button 
            onClick={resetToDefault}
            className="absolute top-2 right-2 p-1.5 bg-olive-100 rounded-full text-olive-600 opacity-50 hover:opacity-100"
            title="重置資料"
        >
            <RefreshCw size={12} />
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <Plus size={16} /> 新增支出
        </h4>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input 
            type="text" 
            placeholder="項目 (例如: 義式冰淇淋)" 
            className="col-span-2 p-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-olive-500 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="金額" 
            className="p-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-olive-500 outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select 
            className="p-2 rounded-lg border border-gray-200 text-sm bg-white"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="EUR">歐元 € (EUR)</option>
            <option value="TWD">台幣 $ (TWD)</option>
            <option value="USD">美元 $ (USD)</option>
            <option value="JPY">日幣 ¥ (JPY)</option>
          </select>
          <select 
            className="p-2 rounded-lg border border-gray-200 text-sm bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <option value="FOOD">食物</option>
            <option value="TRANSPORT">交通</option>
            <option value="SHOPPING">購物</option>
            <option value="STAY">住宿</option>
            <option value="OTHER">其他</option>
          </select>
           <select 
            className="col-span-2 p-2 rounded-lg border border-gray-200 text-sm bg-white"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value as any)}
          >
            <option value="ME">個人支出 (我)</option>
            <option value="GROUP">團體支出 (分攤)</option>
          </select>
        </div>
        <button 
          onClick={addExpense}
          className="w-full bg-olive-600 text-white py-2 rounded-lg font-bold shadow-md active:scale-95 transition-transform"
        >
          新增紀錄
        </button>
      </div>

      <div className="space-y-3 pb-20">
        {filteredExpenses.slice().reverse().map(expense => (
          <div key={expense.id} className="flex justify-between items-center bg-white p-3 rounded-lg border-b border-gray-100 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${expense.paidBy === 'GROUP' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                {expense.category === 'FOOD' && <Wallet size={16} />}
                {expense.category === 'TRANSPORT' && <Wallet size={16} />} 
                {/* Simplified icons */}
                <Wallet size={16} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{expense.description}</p>
                <p className="text-xs text-gray-500 capitalize">
                    {expense.category === 'FOOD' && '食物'}
                    {expense.category === 'TRANSPORT' && '交通'}
                    {expense.category === 'SHOPPING' && '購物'}
                    {expense.category === 'STAY' && '住宿'}
                    {expense.category === 'OTHER' && '其他'}
                     • {expense.paidBy === 'ME' ? '個人' : '團體'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-gray-700">
                {expense.currency} {expense.amount.toLocaleString()}
              </span>
              <button onClick={() => removeExpense(expense.id)} className="text-red-400 hover:text-red-600 p-1">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetTracker;
