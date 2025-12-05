import React from 'react';
import { EnvelopeProps } from '../types';
import { Heart, Star, Stamp, Sparkles, ArrowDown, X, Cloud, Music, Sun } from 'lucide-react';

const Envelope: React.FC<EnvelopeProps> = ({ isOpen, setIsOpen, children }) => {
  return (
    <div className={`relative w-full max-w-xl mx-auto mt-48 mb-64 px-4 transition-all duration-300 ${isOpen ? 'z-50' : 'z-10'}`}>
      
      {/* Sparkles Effect on Open */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
           <div className="absolute -top-32 left-0 animate-bounce text-yellow-300 delay-100"><Star size={24} fill="currentColor" /></div>
           <div className="absolute -top-24 right-10 animate-pulse text-yellow-400 delay-300"><Sparkles size={32} /></div>
           <div className="absolute -top-10 left-1/2 animate-spin-slow text-pink-300"><Star size={20} fill="currentColor" /></div>
           <div className="absolute top-0 -left-10 animate-float text-sky-300"><Cloud size={28} fill="currentColor" /></div>
        </div>
      )}

      {/* Container for the whole envelope assembly */}
      <div className="relative w-full aspect-[1.5/1] perspective-1000 group">
        
        {/* === 1. The Letter (Slides Up & Pops to Front) === */}
        <div 
          className={`
            absolute top-0 left-1/2 -translate-x-1/2 w-[88%] md:w-[90%]
            transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${isOpen 
              ? '-translate-y-[90%] duration-1000 delay-300 z-50' 
              : 'translate-y-6 duration-700 delay-0 z-20'
            }
          `}
          style={{ 
             transitionProperty: 'transform, z-index',
             transitionDelay: isOpen ? '300ms, 600ms' : '0ms, 0ms' 
          }}
        >
          <div 
            className={`
              paper-texture p-6 pt-10 pb-24 md:p-10 md:pb-32 shadow-2xl rounded-2xl text-stone-700
              transition-opacity duration-300 relative bg-white
              ${isOpen ? 'opacity-100' : 'opacity-0'}
            `}
          >
             {/* Decorative Border on Letter */}
             <div className="absolute inset-2 border-[3px] border-dashed border-yellow-300 rounded-xl pointer-events-none"></div>

             {/* Close Button on Letter */}
             {isOpen && (
               <button 
                 onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                 className="absolute top-4 right-4 p-2 text-stone-400 hover:text-red-400 transition-colors z-50"
                 title="Fold Letter"
               >
                 <X size={20} />
               </button>
             )}

             {/* Cute Header Decor */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-100 px-4 py-1 rounded-full border-2 border-white shadow-sm rotate-1">
                <span className="text-xs font-bold text-pink-400 tracking-widest uppercase">Secret Message</span>
             </div>

             {/* Washi Tape Decorations */}
             <div className="washi-tape -top-2 left-[10%] bg-sky-200/60 -rotate-2 w-24"></div>
             <div className="washi-tape -bottom-2 right-[10%] bg-yellow-200/60 rotate-1 w-32"></div>
             
             {/* Content Slot */}
             <div className="relative z-10">
               {children}
             </div>
          </div>
        </div>

        {/* === 2. Envelope Back (Inside Lining) === */}
        {/* Striped pattern for the inside */}
        <div 
          className="absolute inset-0 rounded-3xl shadow-2xl border-4 border-white transform translate-y-2 overflow-hidden"
          style={{
            background: 'repeating-linear-gradient(45deg, #fef9c3 0px, #fef9c3 20px, #fde047 20px, #fde047 40px)'
          }}
        >
          {/* Shadow inset to give depth */}
          <div className="absolute inset-0 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1)]"></div>
        </div>

        {/* === 3. Envelope Front Pocket (Complex & Cute) === */}
        <div className="absolute bottom-0 left-0 w-full h-full z-30 pointer-events-none drop-shadow-xl rounded-b-3xl overflow-hidden">
          
          {/* Pocket Shape */}
          <svg viewBox="0 0 400 260" className="absolute bottom-0 left-0 w-full h-full text-yellow-300 fill-current" preserveAspectRatio="none">
             {/* Deep Scoop Pocket with slightly curved sides */}
             <path d="M0,260 L0,100 Q60,130 100,140 Q200,165 300,140 Q340,130 400,100 L400,260 Z" />
          </svg>
           
           {/* Stitching / Lace Effect on Pocket Edge */}
           <svg viewBox="0 0 400 260" className="absolute bottom-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <path 
                d="M0,260 L0,100 Q60,130 100,140 Q200,165 300,140 Q340,130 400,100 L400,260" 
                fill="none" 
                stroke="white" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeDasharray="10, 8"
              />
           </svg>
        </div>
        
        {/* === Pocket Decorations (Stickers & Pins) === */}
        {/* Only visible on top of the pocket, z-40 */}
        <div className="absolute inset-0 z-40 pointer-events-none">
            {/* Stamp on Right */}
            <div className="absolute bottom-6 right-6 rotate-[-6deg] animate-wiggle origin-bottom-right" style={{ animationDelay: '1s' }}>
              <div className="bg-white p-2 shadow-sm border-2 border-dashed border-pink-200 rounded-lg">
                <div className="bg-pink-50 w-20 h-24 flex flex-col items-center justify-center border border-pink-100 relative overflow-hidden rounded-md">
                  <Stamp size={32} className="text-pink-400 opacity-80" />
                  <Heart size={12} className="text-pink-300 absolute top-2 right-2 fill-current" />
                  <span className="absolute bottom-1 text-[9px] text-pink-300 font-bold uppercase tracking-widest">Love Mail</span>
                </div>
              </div>
            </div>

            {/* Cloud Sticker Left */}
            <div className="absolute bottom-20 left-6 rotate-12 drop-shadow-md">
               <div className="relative">
                 <Cloud size={48} className="text-white fill-white" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
                    <div className="w-1 h-1 bg-stone-800 rounded-full"></div>
                    <div className="w-1 h-1 bg-stone-800 rounded-full"></div>
                 </div>
                 <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-1 bg-stone-800 rounded-full opacity-50"></div>
               </div>
            </div>

            {/* Music Note Sticker */}
            <div className="absolute bottom-10 left-20 -rotate-12 bg-sky-100 p-2 rounded-full border-2 border-white shadow-sm">
                <Music size={20} className="text-sky-500" />
            </div>

            {/* Script Text */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-yellow-700/60 font-['Dancing_Script'] text-2xl rotate-2 whitespace-nowrap">
               Especially for you <span className="inline-block animate-pulse">✨</span>
            </div>
        </div>

        {/* === 4. Envelope Flap (Complex Dual-Sided) === */}
        <div 
          className={`
            absolute top-0 left-0 w-full h-[65%] z-40 origin-top
            transition-transform ease-in-out
            ${isOpen 
              ? 'rotate-x-180 duration-700 delay-0'
              : 'rotate-x-0 duration-500 delay-500'
            }
          `}
          style={{ transformStyle: 'preserve-3d' }}
        >
            {/* --- Flap Front (Yellow) --- */}
            <div 
              className="absolute inset-0 w-full h-full filter drop-shadow-md" 
              style={{ backfaceVisibility: 'hidden' }} // Hides this when rotated
            >
              <svg viewBox="0 0 400 170" className="w-full h-full text-yellow-400 fill-current" preserveAspectRatio="none">
                 {/* Rounded Soft Flap */}
                 <path d="M0,0 L400,0 L250,140 Q200,170 150,140 L0,0 Z" />
              </svg>
              
              {/* White Lace Trim on Flap */}
              <svg viewBox="0 0 400 170" className="absolute top-0 left-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                 <path 
                   d="M0,0 L400,0 L250,140 Q200,170 150,140 L0,0" 
                   fill="none" 
                   stroke="white" 
                   strokeWidth="3" 
                   strokeDasharray="6, 6"
                   strokeLinecap="round"
                 />
              </svg>

              {/* Decorative Sun Sticker on Flap Corner */}
              <div className="absolute top-4 right-10 text-orange-200 opacity-60">
                 <Sun size={24} />
              </div>

              {/* === The Wax Seal Button === */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                  absolute bottom-[10%] left-1/2 -translate-x-1/2 translate-y-1/2
                  w-20 h-20 rounded-full 
                  flex items-center justify-center
                  shadow-xl transition-all duration-300 hover:scale-110 active:scale-95
                  bg-rose-400 cursor-pointer animate-pulse
                  group-seal
                  ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
                aria-label="Open Letter"
              >
                 <div className="w-16 h-16 rounded-full border-[4px] border-rose-200/50 flex items-center justify-center bg-rose-500 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]">
                    <Heart className="text-white fill-white w-8 h-8 drop-shadow-sm group-seal-hover:scale-110 transition-transform" />
                 </div>
                 {/* Little ribbons sticking out from seal */}
                 <div className="absolute -z-10 bottom-1 left-2 w-4 h-8 bg-rose-400 rotate-45 rounded-sm shadow-sm"></div>
                 <div className="absolute -z-10 bottom-1 right-2 w-4 h-8 bg-rose-400 -rotate-45 rounded-sm shadow-sm"></div>
              </button>
            </div>

            {/* --- Flap Back (Lining Pattern) --- */}
            <div 
              className="absolute inset-0 w-full h-full" 
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateX(180deg)',
              }}
            >
               {/* Use an SVG clip path to match the flap shape for the lining */}
               <div className="w-full h-full" style={{ clipPath: 'url(#flap-clip)' }}>
                  <div 
                    className="w-full h-full" 
                    style={{
                      background: 'repeating-linear-gradient(45deg, #fef9c3 0px, #fef9c3 15px, #fde047 15px, #fde047 30px)'
                    }}
                  ></div>
               </div>
               {/* Define Clip Path in SVG (Hidden) */}
               <svg width="0" height="0">
                  <defs>
                    <clipPath id="flap-clip" clipPathUnits="objectBoundingBox">
                       {/* Normalized coordinates for the flap shape: M0,0 L1,0 L0.625,0.82 Q0.5,1 0.375,0.82 L0,0 Z approximately */}
                       <path d="M0,0 L1,0 L0.625,0.82 Q0.5,1 0.375,0.82 L0,0 Z" />
                    </clipPath>
                  </defs>
               </svg>
            </div>
        </div>

        {/* Close Interaction Hint (Optional) */}
        {isOpen && (
           <div 
             className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-50 opacity-0 animate-[fadeIn_1s_ease-in_forwards_1s]"
           >
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-white/90 backdrop-blur text-yellow-600 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-yellow-50 transition-colors flex items-center gap-2"
              >
                <ArrowDown size={18} />
                Put it back
              </button>
           </div>
        )}

      </div>
    </div>
  );
};

export default Envelope;