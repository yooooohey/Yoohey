import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { AddFishPage } from './pages/AddFishPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MOCK_FISH_DATA } from './data/mockFishData';
import type { Fish } from './types';

const App: React.FC = () => {
  const [fishList, setFishList] = useState<Fish[]>(MOCK_FISH_DATA);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const toggleFavorite = useCallback((fishId: string) => {
    if (!isLoggedIn) {
      alert("お気に入りに追加するにはログインが必要です。");
      return;
    }
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(fishId)) {
        newFavorites.delete(fishId);
      } else {
        newFavorites.add(fishId);
      }
      return newFavorites;
    });
  }, [isLoggedIn]);

  const addFish = (newFish: Omit<Fish, 'id' | 'media'> & { media: Array<{ type: 'image' | 'video'; file: File }> }) => {
    const fishToAdd: Fish = {
      ...newFish,
      id: Date.now().toString(),
      media: newFish.media.map((m, index) => ({
        id: `m-${Date.now()}-${index}`,
        type: m.type,
        url: URL.createObjectURL(m.file),
        file: m.file,
      }))
    };
    setFishList(prev => [fishToAdd, ...prev]);
  };
  
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<HomePage fishList={fishList} />} />
            <Route path="/fish/:id" element={
                <DetailPage 
                    fishList={fishList} 
                    isFavorite={id => favorites.has(id)}
                    onToggleFavorite={toggleFavorite}
                />
            }/>
            <Route path="/add" element={<AddFishPage onAddFish={addFish} />} />
            <Route path="/favorites" element={
                <FavoritesPage 
                    fishList={fishList.filter(f => favorites.has(f.id))} 
                    isLoggedIn={isLoggedIn}
                />
            }/>
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;