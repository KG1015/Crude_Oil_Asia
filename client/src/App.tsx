import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { ChapterPage } from './pages/ChapterPage';
import { JourneyOfOneBarrel } from './components/JourneyOfOneBarrel';
import { CrudeChoiceSimulator } from './components/CrudeChoiceSimulator';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink flex flex-col selection:bg-ft-claret selection:text-white">
      {/* Clean Editorial Navbar */}
      <Navbar />

      {/* Main Routed Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/journey" element={<JourneyOfOneBarrel />} />
          <Route path="/simulator" element={<CrudeChoiceSimulator />} />
          <Route path="/wargame" element={<ChapterPage />} />
          <Route path="/chapter/:id" element={<ChapterPage />} />
        </Routes>
      </main>

      {/* Editorial Footer */}
      <footer className="bg-white border-t border-paper-border py-8 text-xs font-mono text-ink-muted">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-bold text-ink">DUBAI / OMAN &amp; THE ASIAN CRUDE MARKET</span>
            <div className="mt-0.5 text-[11px]">
              Special Interactive Commercial Sourcing Study &bull; China, India, Japan, South Korea
            </div>
          </div>
          <div className="text-right text-[11px]">
            Financial Times / Reuters Graphics Design Standard &bull; Verified Primary Data Sources
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
