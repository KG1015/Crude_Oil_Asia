import React from 'react';
import { Link } from 'react-router-dom';
import { ThreeGlobeHero } from '../components/ThreeGlobeHero';
import { ASIAN_BUYERS, PLAIN_ENGLISH_CHAPTERS } from '../data/crudeData';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* 3D Global Crude-Flow Globe Hero */}
      <ThreeGlobeHero />

      {/* Core Executive Briefing Strip */}
      <section className="bg-white rounded-xl border border-paper-border p-8 shadow-ft-card">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-ft-claret">
            Executive Summary
          </span>
          <h2 className="font-serif text-3xl font-bold text-ink mt-1">
            How Asia Buys 22 Million Barrels of Oil Every Day
          </h2>
          <p className="text-base text-ink-light mt-3 leading-relaxed">
            Asia does not produce enough oil to feed its giant economies. Every single day, over 22 million barrels of crude must travel by sea across the globe to reach refineries in China, India, Japan, and South Korea. Three massive oil regions are competing for every drop of this Asian demand.
          </p>
        </div>

        {/* 4 Asian Mega-Buyers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.keys(ASIAN_BUYERS).map(k => {
            const b = ASIAN_BUYERS[k];
            return (
              <div key={k} className="p-4 rounded-lg bg-paper-subtle border border-paper-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{b.flag}</span>
                  <span className="font-mono text-xs font-bold text-ft-gold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {b.totalImportsMbd} Mb/d
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-ink">{b.name}</h3>
                <p className="text-xs text-ink-muted mt-1 line-clamp-2">{b.strategicFocus}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Decision Tool Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-paper-border">
          <Link
            to="/journey"
            className="p-6 rounded-xl border border-paper-border bg-paper hover:bg-paper-subtle transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-ft-gold uppercase">Visual Sequence</span>
              <h4 className="font-serif text-xl font-bold text-ink group-hover:text-ft-gold transition-colors mt-0.5">
                The Journey of One Barrel &rarr;
              </h4>
              <p className="text-xs text-ink-muted mt-1">
                Follow one barrel from a desert wellhead in Saudi Arabia through supertankers and refineries to your gas tank.
              </p>
            </div>
            <span className="text-3xl ml-4">🚢</span>
          </Link>

          <Link
            to="/simulator"
            className="p-6 rounded-xl border border-paper-border bg-paper hover:bg-paper-subtle transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs font-mono font-bold text-ft-marine uppercase">Interactive Tool</span>
              <h4 className="font-serif text-xl font-bold text-ink group-hover:text-ft-marine transition-colors mt-0.5">
                The Crude Choice Simulator &rarr;
              </h4>
              <p className="text-xs text-ink-muted mt-1">
                Test all 7 crudes into China, India, Japan, and Korea to see which barrel wins the monthly price contest.
              </p>
            </div>
            <span className="text-3xl ml-4">🧪</span>
          </Link>
        </div>
      </section>

      {/* 12 Dedicated Chapter Cards Grid */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-ft-marine">
              12 Chapter Visual Walkthrough
            </span>
            <h3 className="font-serif text-2xl font-bold text-ink mt-0.5">
              Explore the Chapters
            </h3>
          </div>
          <span className="text-xs font-mono text-ink-muted hidden sm:inline">
            Each chapter contains dedicated maps, visuals &amp; simulators
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLAIN_ENGLISH_CHAPTERS.map(ch => (
            <Link
              key={ch.id}
              to={ch.route}
              className="p-5 rounded-xl border border-paper-border bg-white hover:border-ft-claret hover:shadow-ft-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-ft-claret font-bold">
                  CHAPTER 0{ch.id}
                </span>
                <h4 className="font-serif text-lg font-bold text-ink mt-1">
                  {ch.title}
                </h4>
                <div className="text-xs font-sans text-ft-gold font-medium mt-0.5">
                  {ch.subtitle}
                </div>
                <p className="text-xs text-ink-light mt-2 line-clamp-2">
                  {ch.summary}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-paper-subtle flex justify-between items-center text-xs font-mono text-ink-muted">
                <span>Interactive View</span>
                <span className="text-ft-claret">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
