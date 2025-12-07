import React, { useState, useEffect } from 'react';
import { Expense } from '../types';
import { Plus, Trash2, Wallet, PieChart, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'dolce-vita-expenses-v1';

const defaultExpenses: Expense[] = [
    { id: 'init-1', description: '米蘭機票 (ITA)', amount: 6277, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-2', description: '那不勒斯機票 (EasyJet)', amount: 2921, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-3', description: '羅馬機票 (Ryanair)', amount: 2834, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-4', description: '巴士 (Naples -> Bari)', amount: 525, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-5', description: '高鐵 (Rome -> Venice)', amount: 2701, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
    { id: 'init-6', description: '高鐵 (Venice -> Milan)', amount: 2068, currency: 'TWD', category: 'TRANSPORT', paidBy: 'ME' },
];

const BudgetTracker: React.FC = () => {
  // Initialize state from LocalStorage if available, otherwise use defaults
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

  // Simple hardcoded rate for demo
  const rate = 34.5; // TWD to EUR example

  // Save to LocalStorage whenever expenses change
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

  // Convert everything to TWD for display total
  const totalTWD = expenses.reduce((acc, curr) => {
    if (curr.currency === 'TWD') return acc + curr.amount;
    if (curr.currency === 'EUR') return acc + (curr.amount * rate);
    if (curr.currency === 'USD') return acc + (curr.amount * 31);
    return acc + curr.amount;
  }, 0);

  return (
    <div className="p-4 space-y-6">
      <div className="bg-olive-50 p-6 rounded-2xl shadow-sm text-center border border-olive-100 relative overflow-hidden">
        <h3 className="text-olive-800 font-serif mb-1">預估總花費</h3>
        <p className="text-4xl font-bold text-olive-900">
          TWD {totalTWD.toLocaleString()}
        </p>
        <p className="text-xs text-olive-600 mt-2">
          (已包含行程表中的預定交通費用)
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
        {expenses.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
                目前沒有支出紀錄
            </div>
        )}
        {expenses.slice().reverse().map(expense => (
          <div key={expense.id} className="flex justify-between items-center bg-white p-3 rounded-lg border-b border-gray-100 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${expense.paidBy === 'GROUP' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                {expense.category === 'FOOD' ? <Wallet size={16} /> : <PieChart size={16} />}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{expense.description}</p>
                <p className="text-xs text-gray-500 capitalize">
                    {expense.category === 'FOOD' && '食物'}
                    {expense.category === 'TRANSPORT' && '交通'}
                    {expense.category === 'SHOPPING' && '購物'}
                    {expense.category === 'STAY' && '住宿'}
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