import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon } from '../components/Icons';

interface AddFishPageProps {
  onAddFish: (fish: { 
    name: string; 
    scientificName: string; 
    description: string; 
    habitat: string; 
    media: { type: 'image' | 'video'; file: File }[];
  }) => void;
}

export const AddFishPage: React.FC<AddFishPageProps> = ({ onAddFish }) => {
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [description, setDescription] = useState('');
  const [habitat, setHabitat] = useState('');
  const [media, setMedia] = useState<{ type: 'image' | 'video'; file: File; url: string }[]>([]);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newMedia = files.map((file: File) => ({
        file,
        // FIX: Cast the result of the ternary expression to the correct literal union type.
        // This prevents TypeScript from widening the type to a generic `string`.
        type: (file.type.startsWith('video') ? 'video' : 'image') as 'image' | 'video',
        url: URL.createObjectURL(file),
      }));
      setMedia(prev => [...prev, ...newMedia]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && scientificName && description && habitat && media.length > 0) {
      onAddFish({
        name,
        scientificName,
        description,
        habitat,
        media: media.map(m => ({ type: m.type, file: m.file })),
      });
      navigate('/');
    } else {
      alert('すべての項目を入力し、写真か動画を1つ以上追加してください。');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">新しい魚を登録</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">魚の名前</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
        </div>
        <div>
          <label htmlFor="scientificName" className="block text-sm font-medium text-slate-700">学名</label>
          <input type="text" id="scientificName" value={scientificName} onChange={e => setScientificName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">説明</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500"></textarea>
        </div>
        <div>
          <label htmlFor="habitat" className="block text-sm font-medium text-slate-700">生息地</label>
          <input type="text" id="habitat" value={habitat} onChange={e => setHabitat(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700">写真・動画</label>
            <div
                onClick={() => fileInputRef.current?.click()} 
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-sky-500"
            >
                <div className="space-y-1 text-center">
                    <CameraIcon className="mx-auto h-12 w-12 text-slate-400"/>
                    <p className="text-sm text-slate-600">
                        <span className="font-semibold text-sky-600">ファイルをアップロード</span> またはドラッグ＆ドロップ
                    </p>
                    <p className="text-xs text-slate-500">画像はPNG, JPGなど・動画はMP4, MOVなど</p>
                </div>
            </div>
            <input 
                ref={fileInputRef}
                id="file-upload" 
                name="file-upload" 
                type="file" 
                multiple
                accept="image/*,video/*"
                className="sr-only"
                onChange={handleMediaChange}
            />
        </div>
        
        {media.length > 0 && (
            <div>
                <h3 className="text-sm font-medium text-slate-700">プレビュー:</h3>
                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {media.map((m, index) => (
                        <div key={index} className="relative aspect-square">
                            {m.type === 'image' ? (
                                <img src={m.url} alt="preview" className="w-full h-full object-cover rounded-md"/>
                            ) : (
                                <video src={m.url} className="w-full h-full object-cover rounded-md"></video>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )}

        <button type="submit" className="w-full bg-sky-600 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            登録する
        </button>
      </form>
    </div>
  );
};
