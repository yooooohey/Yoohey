
import React from 'react';
import { Link } from 'react-router-dom';
import { Fish } from '../types.js';
import { CameraIcon } from './Icons.js';

interface FishCardProps {
  fish: Fish;
}

export const FishCard: React.FC<FishCardProps> = ({ fish }) => {
  return (
    <Link to={`/fish/${fish.id}`} className="block group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={fish.media[0]?.url || 'https://picsum.photos/400/300?grayscale'} 
          alt={fish.name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <CameraIcon className="w-4 h-4" />
            <span>{fish.media.length}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">{fish.name}</h3>
        {fish.nameEn && <p className="text-sm text-slate-500">{fish.nameEn}</p>}
        <p className="text-sm text-slate-500 italic mt-1">{fish.scientificName}</p>
      </div>
    </Link>
  );
};