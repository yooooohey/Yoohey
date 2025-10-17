import React from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  const linkClass = "hover:text-sky-500 transition-colors";
  const activeLinkClass = "text-sky-600 font-semibold";

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
            <button onClick={onLogout} className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors shadow">
              ログアウト
            </button>
          ) : (
            <button onClick={onLogin} className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors shadow">
              ログイン
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};