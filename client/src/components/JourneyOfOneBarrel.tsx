import React, { useState } from 'react';
import { JOURNEY_OF_ONE_BARREL } from '../data/crudeData';

export const JourneyOfOneBarrel: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const currentStep = JOURNEY_OF_ONE_BARREL[activeStepIdx];

  return (
    <div className="bg-white rounded-xl border border-paper-border p-6 md:p-10 shadow-ft-card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-paper-border pb-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-ft-gold">
            Visual Storytelling Sequence
          </span>
          <h2 className="font-serif text-3xl font-bold text-ink mt-1">
            The Journey of One Barrel
          </h2>
          <p className="text-sm text-ink-light mt-1">
            From a Saudi desert wellhead 2,000 meters underground to an Asian highway.
          </p>
        </div>
        <div className="mt-4 md:mt-0 font-mono text-xs bg-paper-subtle border border-paper-border px-3 py-1.5 rounded-full text-ink">
          STEP {activeStepIdx + 1} OF {JOURNEY_OF_ONE_BARREL.length}
        </div>
      </div>

      {/* Progress Track */}
      <div className="grid grid-cols-3 md:grid-cols-9 gap-2 mb-8">
        {JOURNEY_OF_ONE_BARREL.map((item, idx) => (
          <button
            key={item.step}
            onClick={() => setActiveStepIdx(idx)}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              idx === activeStepIdx
                ? 'border-ft-gold bg-amber-50/60 shadow-sm'
                : 'border-paper-border bg-paper hover:bg-paper-subtle'
            }`}
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <div className="font-mono text-[10px] text-ink-muted">STEP 0{item.step}</div>
            <div className="font-sans text-xs font-bold text-ink truncate">{item.title}</div>
          </button>
        ))}
      </div>

      {/* Active Step Feature Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-paper-subtle border border-paper-border rounded-xl p-8">
        <div className="md:col-span-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{currentStep.icon}</span>
            <div>
              <span className="font-mono text-xs text-ft-gold font-bold uppercase">
                {currentStep.location}
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink">
                {currentStep.step}. {currentStep.title} &mdash; {currentStep.subtitle}
              </h3>
            </div>
          </div>
          <p className="text-base text-ink-light leading-relaxed mt-4">
            {currentStep.description}
          </p>
        </div>

        <div className="md:col-span-4 bg-white p-5 rounded-lg border border-paper-border shadow-sm flex flex-col justify-center">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-1">
            KEY COMMERCIAL METRIC
          </span>
          <div className="font-mono text-xl font-bold text-ft-marine">
            {currentStep.volumeOrFact}
          </div>
          <p className="text-xs text-ink-muted mt-2">
            Every step represents real physical infrastructure, pipeline pressure, and maritime logistics.
          </p>
        </div>
      </div>

      {/* Step Navigation Controls */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-paper-border">
        <button
          disabled={activeStepIdx === 0}
          onClick={() => setActiveStepIdx(activeStepIdx - 1)}
          className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${
            activeStepIdx === 0
              ? 'opacity-40 cursor-not-allowed border-paper-border'
              : 'border-paper-border hover:border-ft-gold bg-white text-ink'
          }`}
        >
          &larr; Previous Stage
        </button>

        <div className="flex gap-1.5">
          {JOURNEY_OF_ONE_BARREL.map((_, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === activeStepIdx ? 'bg-ft-gold w-6' : 'bg-paper-border'
              }`}
            />
          ))}
        </div>

        <button
          disabled={activeStepIdx === JOURNEY_OF_ONE_BARREL.length - 1}
          onClick={() => setActiveStepIdx(activeStepIdx + 1)}
          className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${
            activeStepIdx === JOURNEY_OF_ONE_BARREL.length - 1
              ? 'opacity-40 cursor-not-allowed border-paper-border'
              : 'border-ft-gold bg-ft-gold text-white font-bold'
          }`}
        >
          Next Stage &rarr;
        </button>
      </div>
    </div>
  );
};
