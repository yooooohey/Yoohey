
import React from 'react';
import { Link } from 'react-router-dom';
import { FishCard } from '../components/FishCard.js';
import type { Fish } from '../types.js';

interface FavoritesPageProps {
  fishList: Fish[];
  isLoggedIn: boolean;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ fishList, isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-slate-800">アクセスできません</h1>
        <p className="text-slate-600 mt-2">お気に入りを表示するにはログインしてください。</p>
        <Link to="/" className="text-sky-600 hover:underline mt-4 inline-block">ホームに戻る</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-sky-800">お気に入り一覧</h1>
        <p className="text-slate-600 mt-2">あなたがお気に入りに登録した海の生き物たち。</p>
      </div>

      {fishList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fishList.map(fish => (
            <FishCard key={fish.id} fish={fish} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-slate-600">まだお気に入りに登録された魚がいません。</p>
            <p className="text-slate-500 text-sm mt-1">魚を探しにいって、好きな魚に星をつけましょう！</p>
        </div>
      )}
    </div>
  );
};