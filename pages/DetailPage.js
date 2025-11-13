
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, StarIcon, SparklesIcon, PencilIcon } from '../components/Icons.js';
import { Spinner } from '../components/Spinner.js';
import { getFunFacts } from '../services/geminiService.js';
import type { Fish, Media, User } from '../types.js';

interface DetailPageProps {
  fishList: Fish[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  user: User | null;
}

export const DetailPage: React.FC<DetailPageProps> = ({ fishList, isFavorite, onToggleFavorite, user }) => {
  const { id } = useParams<{ id: string }>();
  const [fish, setFish] = useState<Fish | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [funFacts, setFunFacts] = useState<string>('');
  const [isLoadingFacts, setIsLoadingFacts] = useState<boolean>(false);

  const isLoggedIn = user !== null;

  useEffect(() => {
    const foundFish = fishList.find(f => f.id === id);
    if (foundFish) {
      setFish(foundFish);
      setSelectedMedia(foundFish.media[0] || null);
    }
  }, [id, fishList]);

  const handleGetFunFacts = async () => {
    if (!fish) return;
    setIsLoadingFacts(true);
    setFunFacts('');
    const facts = await getFunFacts(fish.name);
    setFunFacts(facts);
    setIsLoadingFacts(false);
  };
  
  if (!fish) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl text-slate-600">お探しの魚は見つかりませんでした。</h2>
        <Link to="/" className="text-sky-600 hover:underline mt-4 inline-block">ホームに戻る</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-800 mb-4">
        <ArrowLeftIcon className="w-5 h-5" />
        一覧へ戻る
      </Link>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media Viewer */}
          <div className="p-4">
             {selectedMedia ? (
                 <div className="w-full aspect-square bg-slate-100 rounded-lg overflow-hidden">
                    {selectedMedia.type === 'image' ? (
                        <img src={selectedMedia.url} alt={fish.name} className="w-full h-full object-cover"/>
                    ) : (
                        <video src={selectedMedia.url} controls className="w-full h-full object-cover"></video>
                    )}
                 </div>
             ) : <div className="w-full aspect-square bg-slate-200 flex items-center justify-center text-slate-500 rounded-lg">メディアなし</div>}

            <div className="flex gap-2 mt-2 overflow-x-auto p-1">
                {fish.media.map(m => (
                    <button key={m.id} onClick={() => setSelectedMedia(m)} className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${selectedMedia?.id === m.id ? 'border-sky-500' : 'border-transparent'}`}>
                        {m.type === 'image' ? (
                            <img src={m.url} alt="" className="w-full h-full object-cover"/>
                        ) : (
                            <video src={m.url} className="w-full h-full object-cover"></video>
                        )}
                    </button>
                ))}
            </div>
          </div>

          {/* Fish Info */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{fish.name}</h1>
                {fish.nameEn && <p className="text-xl text-slate-600 mt-1">{fish.nameEn}</p>}
                <p className="text-md text-slate-500 italic mt-1">{fish.scientificName}</p>
              </div>
              <div className="flex items-center">
                {isLoggedIn && (
                  <Link to={`/fish/${fish.id}/edit`} className="p-2 text-slate-500 hover:text-sky-600" aria-label="編集する">
                    <PencilIcon className="w-6 h-6" />
                  </Link>
                )}
                <button onClick={() => onToggleFavorite(fish.id)} className="p-2" aria-label="お気に入りを切り替え">
                  <StarIcon className={`w-8 h-8 transition-colors ${isFavorite(fish.id) ? 'text-yellow-400' : 'text-slate-300 hover:text-yellow-300'}`} />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-4">
                <div>
                    <h3 className="font-semibold text-slate-700">説明</h3>
                    <p className="text-slate-600">{fish.description}</p>
                </div>
                {fish.descriptionEn && (
                    <div>
                        <h3 className="font-semibold text-slate-700">Description</h3>
                        <p className="text-slate-600">{fish.descriptionEn}</p>
                    </div>
                )}
                <div>
                    <h3 className="font-semibold text-slate-700">生息地</h3>
                    <p className="text-slate-600">{fish.habitat}</p>
                </div>
            </div>

            {/* Gemini Fun Facts */}
            <div className="mt-6">
              <button 
                onClick={handleGetFunFacts} 
                disabled={isLoadingFacts}
                className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white px-4 py-3 rounded-lg hover:bg-sky-600 transition-colors shadow disabled:bg-slate-400"
              >
                <SparklesIcon className="w-5 h-5"/>
                {isLoadingFacts ? 'AIが考え中...' : 'AIに面白い豆知識を聞く'}
              </button>
              {isLoadingFacts && <div className="mt-4"><Spinner/></div>}
              {funFacts && (
                <div className="mt-4 p-4 bg-sky-50 border border-sky-200 rounded-lg">
                  <h4 className="font-bold text-sky-800 mb-2">豆知識</h4>
                  <div className="whitespace-pre-wrap text-slate-700 space-y-2">
                    {funFacts.split('•').filter(fact => fact.trim() !== '').map((fact, index) => (
                        <p key={index} className="flex items-start"><span className="mr-2 text-sky-500">🐠</span>{fact.trim()}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">コメント</h2>
        <div className="space-y-4">
          {fish.comments && fish.comments.length > 0 ? (
            fish.comments.map(comment => (
              <div key={comment.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-sky-800">{comment.authorName}</p>
                <p className="text-slate-600 mt-1 whitespace-pre-wrap">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-500">まだコメントはありません。</p>
          )}
        </div>
      </div>
    </div>
  );
};