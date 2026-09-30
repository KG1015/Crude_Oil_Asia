import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PLAIN_ENGLISH_CHAPTERS } from '../data/crudeData';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-paper-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <span className="bg-ft-claret text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded tracking-widest uppercase">
            REUTERS / FT REPORT
          </span>
          <span className="font-serif text-lg font-bold text-ink">
            Asian Crude Market
          </span>
        </Link>

        {/* Primary Clean Navigation */}
        <nav className="flex items-center gap-2 font-sans text-xs font-medium">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-md transition-all ${
              location.pathname === '/'
                ? 'bg-paper-subtle text-ft-claret font-bold border border-paper-border'
                : 'text-ink hover:bg-paper'
            }`}
          >
            Home
          </Link>

          {/* Chapters Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${
                location.pathname.startsWith('/chapter')
                  ? 'bg-paper-subtle text-ft-claret font-bold border border-paper-border'
                  : 'text-ink hover:bg-paper'
              }`}
            >
              <span>Chapters (1–10)</span>
              <span className="text-[10px]">▾</span>
            </button>

            {dropdownOpen && (
              <div
                className="absolute left-0 mt-1 w-72 bg-white border border-paper-border rounded-lg shadow-ft-elevated py-2 z-50 max-h-96 overflow-y-auto"
                onClick={() => setDropdownOpen(false)}
              >
                {PLAIN_ENGLISH_CHAPTERS.map(ch => (
                  <Link
                    key={ch.id}
                    to={`/chapter/${ch.id}`}
                    className="block px-4 py-2 hover:bg-paper-subtle transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-ft-gold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                        {String(ch.id).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-semibold text-ink">{ch.title}</span>
                    </div>
                    <div className="text-[11px] text-ink-muted pl-8 truncate">{ch.subtitle}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/journey"
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${
              location.pathname === '/journey'
                ? 'bg-paper-subtle text-ft-claret font-bold border border-paper-border'
                : 'text-ink hover:bg-paper'
            }`}
          >
            <span>🚢</span> Journey of a Barrel
          </Link>

          <Link
            to="/simulator"
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${
              location.pathname === '/simulator'
                ? 'bg-paper-subtle text-ft-claret font-bold border border-paper-border'
                : 'text-ink hover:bg-paper'
            }`}
          >
            <span>⚖️</span> Crude Simulator
          </Link>

          <Link
            to="/chapter/10"
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${
              location.pathname === '/chapter/10'
                ? 'bg-paper-subtle text-ft-claret font-bold border border-paper-border'
                : 'text-ink hover:bg-paper'
            }`}
          >
            <span>🚨</span> Crisis War Game
          </Link>
        </nav>
      </div>
    </header>
  );
};
