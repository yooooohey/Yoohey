import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { AddFishPage } from './pages/AddFishPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { EditFishPage } from './pages/EditFishPage';
import { LoginModal } from './components/LoginModal';
import { MOCK_FISH_DATA } from './data/mockFishData';
import type { Fish, User } from './types';

const App: React.FC = () => {
  const [fishList, setFishList] = useState<Fish[]>(MOCK_FISH_DATA);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isLoggedIn = user !== null;

  const handleLogin = (email: string) => {
    if (email && /^\S+@\S+\.\S+$/.test(email)) {
      const name = email.split('@')[0];
      setUser({ name, email });
      setIsLoginModalOpen(false); // Close modal on successful login
    }
  };
  
  const handleLogout = () => setUser(null);

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

  const addFish = (newFish: Omit<Fish, 'id' | 'media' | 'comments'> & { media: Array<{ type: 'image' | 'video'; file: File }> }) => {
    const fishToAdd: Fish = {
      ...newFish,
      id: Date.now().toString(),
      comments: [],
      media: newFish.media.map((m, index) => ({
        id: `m-${Date.now()}-${index}`,
        type: m.type,
        url: URL.createObjectURL(m.file),
        file: m.file,
      }))
    };
    setFishList(prev => [fishToAdd, ...prev]);
  };
  
  const handleUpdateFish = (updatedFish: Fish) => {
    setFishList(prevList =>
      prevList.map(fish => (fish.id === updatedFish.id ? updatedFish : fish))
    );
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogin={() => setIsLoginModalOpen(true)} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<HomePage fishList={fishList} />} />
            <Route path="/fish/:id" element={
                <DetailPage 
                    fishList={fishList} 
                    isFavorite={id => favorites.has(id)}
                    onToggleFavorite={toggleFavorite}
                    user={user}
                />
            }/>
            <Route path="/add" element={<AddFishPage onAddFish={addFish} />} />
            <Route path="/favorites" element={
                <FavoritesPage 
                    fishList={fishList.filter(f => favorites.has(f.id))} 
                    isLoggedIn={isLoggedIn}
                />
            }/>
            <Route path="/fish/:id/edit" element={
              <EditFishPage 
                fishList={fishList}
                onUpdateFish={handleUpdateFish}
                user={user}
              />
            }/>
          </Routes>
        </main>
        <LoginModal 
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    </HashRouter>
  );
};

export default App;