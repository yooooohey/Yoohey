
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FishCard } from '../components/FishCard.js';
import { PlusIcon } from '../components/Icons.js';
import type { Fish } from '../types.js';

interface HomePageProps {
  fishList: Fish[];
}

export const HomePage: React.FC<HomePageProps> = ({ fishList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFish = fishList.filter(fish =>
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-sky-800">FishPediaへようこそ</h1>
        <p className="text-slate-600 mt-2">みんなでつくる、海の生き物図鑑。</p>
      </div>
      
      <div className="sticky top-[65px] z-5 bg-sky-50/90 backdrop-blur-sm py-4">
          <input
            type="text"
            placeholder="魚の名前を検索..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full max-w-lg mx-auto block p-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFish.map(fish => (
          <FishCard key={fish.id} fish={fish} />
        ))}
      </div>

      <Link
        to="/add"
        className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        aria-label="新しい魚を登録"
      >
        <PlusIcon className="w-8 h-8" />
      </Link>
    </div>
  );
};