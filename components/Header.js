
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserIcon } from './Icons.js';
import type { User } from '../types.js';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout }) => {
  const linkClass = "hover:text-sky-500 transition-colors";
  const activeLinkClass = "text-sky-600 font-semibold";
  const isLoggedIn = user !== null;

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-sky-700">
          FishPedia
        </NavLink>
        <div className="flex items-center space-x-6 text-slate-600">
          <NavLink to="/" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>
            ホーム
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/favorites" className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}>
              お気に入り
            </NavLink>
          )}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-700" role="status" aria-live="polite">
                <UserIcon className="w-6 h-6 text-sky-600" />
                <span className="font-medium hidden sm:block">ようこそ、{user.name}さん</span>
              </div>
              <button onClick={onLogout} className="bg-rose-100 text-rose-600 px-4 py-2 rounded-lg hover:bg-rose-200 transition-colors text-sm font-semibold">
                ログアウト
              </button>
            </div>
          ) : (
            <button onClick={onLogin} className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors shadow">
              <UserIcon className="w-5 h-5" />
              <span>ログイン</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};