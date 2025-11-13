import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CameraIcon, TrashIcon } from '../components/Icons';
import type { Fish, User, Media, Comment } from '../types';

interface EditFishPageProps {
  fishList: Fish[];
  onUpdateFish: (fish: Fish) => void;
  user: User | null;
}

export const EditFishPage: React.FC<EditFishPageProps> = ({ fishList, onUpdateFish, user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fish, setFish] = useState<Fish | null>(null);
  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [habitat, setHabitat] = useState('');
  const [media, setMedia] = useState<Media[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const foundFish = fishList.find(f => f.id === id);
    if (foundFish) {
      setFish(foundFish);
      setName(foundFish.name);
      setNameEn(foundFish.nameEn || '');
      setScientificName(foundFish.scientificName);
      setDescription(foundFish.description);
      setDescriptionEn(foundFish.descriptionEn || '');
      setHabitat(foundFish.habitat);
      setMedia(foundFish.media);
      setComments(foundFish.comments || []);
    }
  }, [id, fishList]);

  if (!user) {
    return (
        <div className="text-center py-10">
            <h2 className="text-2xl text-slate-600">アクセスできません</h2>
            <p className="text-slate-500 mt-2">このページを編集するにはログインが必要です。</p>
        </div>
    );
  }

  if (!fish) {
    return <div className="text-center py-10">魚の情報を読み込んでいます...</div>;
  }
  
  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newMedia = files.map((file: File): Media => ({
        id: `new-${Date.now()}-${file.name}`,
        file,
        type: file.type.startsWith('video') ? 'video' : 'image',
        url: URL.createObjectURL(file),
      }));
      setMedia(prev => [...prev, ...newMedia]);
    }
  };

  const removeMedia = (mediaId: string) => {
    setMedia(prev => prev.filter(m => m.id !== mediaId));
  };
  
  const addComment = () => {
    if (!newCommentText.trim() || !user) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      authorName: user.name,
      text: newCommentText.trim(),
    };
    setComments(prev => [...prev, newComment]);
    setNewCommentText('');
  };

  const removeComment = (commentId: string) => {
    setComments(prev => prev.filter(c => c.id !== commentId));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && scientificName) {
      const updatedFish: Fish = {
        ...fish,
        name,
        nameEn,
        scientificName,
        description,
        descriptionEn,
        habitat,
        media,
        comments,
      };
      onUpdateFish(updatedFish);
      navigate(`/fish/${id}`);
    } else {
      alert('名前と学名は必須です。');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">『{fish.name}』の情報を編集</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2 text-slate-700">基本情報</h2>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">魚の名前 (日本語)</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label htmlFor="nameEn" className="block text-sm font-medium text-slate-700">魚の名前 (英語)</label>
              <input type="text" id="nameEn" value={nameEn} onChange={e => setNameEn(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label htmlFor="scientificName" className="block text-sm font-medium text-slate-700">学名</label>
              <input type="text" id="scientificName" value={scientificName} onChange={e => setScientificName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">説明 (日本語)</label>
              <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"></textarea>
            </div>
            <div>
              <label htmlFor="descriptionEn" className="block text-sm font-medium text-slate-700">説明 (英語)</label>
              <textarea id="descriptionEn" value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"></textarea>
            </div>
            <div>
              <label htmlFor="habitat" className="block text-sm font-medium text-slate-700">生息地</label>
              <input type="text" id="habitat" value={habitat} onChange={e => setHabitat(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" />
            </div>
        </div>

        {/* Media Management */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2 text-slate-700">写真・動画</h2>
            <div
                onClick={() => fileInputRef.current?.click()} 
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-sky-500"
            >
                <div className="space-y-1 text-center">
                    <CameraIcon className="mx-auto h-12 w-12 text-slate-400"/>
                    <p className="text-sm text-slate-600">
                        <span className="font-semibold text-sky-600">新しいメディアを追加</span>
                    </p>
                </div>
            </div>
            <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="sr-only" onChange={handleMediaChange} />
            
            {media.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {media.map((m) => (
                        <div key={m.id} className="relative aspect-square group">
                            {m.type === 'image' ? (
                                <img src={m.url} alt="preview" className="w-full h-full object-cover rounded-md"/>
                            ) : (
                                <video src={m.url} className="w-full h-full object-cover rounded-md"></video>
                            )}
                            <button type="button" onClick={() => removeMedia(m.id)} className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="削除">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Comments Management */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2 text-slate-700">コメント</h2>
            <div className="space-y-2">
                {comments.map(c => (
                    <div key={c.id} className="flex justify-between items-start p-2 bg-slate-50 rounded">
                        <div>
                            <p className="font-semibold text-sm text-sky-800">{c.authorName}</p>
                            <p className="text-slate-600">{c.text}</p>
                        </div>
                        <button type="button" onClick={() => removeComment(c.id)} className="p-1 text-slate-400 hover:text-rose-600" aria-label="コメント削除">
                            <TrashIcon className="w-5 h-5"/>
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <textarea value={newCommentText} onChange={e => setNewCommentText(e.target.value)} placeholder="新しいコメントを追加..." rows={2} className="flex-grow block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500"></textarea>
                <button type="button" onClick={addComment} className="bg-sky-500 text-white px-4 rounded-md hover:bg-sky-600">追加</button>
            </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button type="button" onClick={() => navigate(-1)} className="bg-slate-100 text-slate-700 py-2 px-6 rounded-md hover:bg-slate-200">
            キャンセル
          </button>
          <button type="submit" className="bg-sky-600 text-white py-2 px-6 rounded-md shadow-sm hover:bg-sky-700">
            更新する
          </button>
        </div>
      </form>
    </div>
  );
};
