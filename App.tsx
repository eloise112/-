import React, { useState, useRef, useEffect } from 'react';
import { Upload, Music, Volume2, VolumeX, Sparkles, ArrowDown, Star, Camera, Cloud, Smile, PenLine, Heart, Settings, Image as ImageIcon } from 'lucide-react';
import StarField from './components/StarField';
import StarButton from './components/StarButton';
import Envelope from './components/Envelope';

const App: React.FC = () => {
  // --- State ---
  const [heroImage, setHeroImage] = useState<string | null>("/-/images/hero-main.png");
  const [bgmSrc, setBgmSrc] = useState<string | null>("/media/birthday-bgm.mp4");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  // Background Decorations State (3 slots)
  // Use local placeholder images that will be available under dist/images after build.
  const [bgDecors, setBgDecors] = useState<string[]>([
  "/-/images/bg-decor-1.png",
  "/-/images/bg-decor-2.png",
  "/-/images/bg-decor-3.png"
]);


  // New Sections State
 const [polaroidPhotos, setPolaroidPhotos] = useState<string[]>([
  "/-/images/polaroid-1.png",
  "/-/images/polaroid-2.png",
  "/-/images/polaroid-3.png"
]);


  const [stickyNotes, setStickyNotes] = useState<string[]>([
    " 好漂亮好温柔好有活力的女明星来的💛",
    "可以同时处理多线程任务的超级人形AI 🌼",
    "细心高效又靠谱，学而思你好福气 ✨"
  ]);

  const [futureWishes, setFutureWishes] = useState<string[]>([
    "希望老师未来职场升级顺顺顺，课包转化率都爆表 ✨",
    "希望老师睡够八小时，加薪不加班 🌟",
    "希望老师天天开心，想要的都得到，惊喜常伴左右~ 🎈"
  ]);

  // --- Refs ---
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Specific refs for uploads
  const polaroidInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const bgDecorInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // --- Handlers ---

  // Main Hero Image Upload
  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImage(URL.createObjectURL(file));
    }
  };

  // BGM Upload
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBgmSrc(URL.createObjectURL(file));
      setIsPlaying(true);
    }
  };

  // Background Decor Upload
  const handleBgDecorUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDecors = [...bgDecors];
      newDecors[index] = URL.createObjectURL(file);
      setBgDecors(newDecors);
    }
  };

  // Polaroid Uploads
  const handlePolaroidUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newPhotos = [...polaroidPhotos];
      newPhotos[index] = URL.createObjectURL(file);
      setPolaroidPhotos(newPhotos);
    }
  };

  // Text Edits
  const handleStickyNoteChange = (index: number, value: string) => {
    const newNotes = [...stickyNotes];
    newNotes[index] = value;
    setStickyNotes(newNotes);
  };

  const handleWishChange = (index: number, value: string) => {
    const newWishes = [...futureWishes];
    newWishes[index] = value;
    setFutureWishes(newWishes);
  };

  // Toggle Audio
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Scroll Hint Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowScrollHint(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen pb-32 overflow-hidden selection:bg-yellow-200">
      <StarField />
      
      {/* ================= BACKGROUND DECORATIONS (Fixed Layer) ================= */}
      {/* This sits behind the content but in front of the starfield */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Decor 1: Top Left */}
        <div className="absolute top-10 -left-10 md:left-10 w-64 h-64 md:w-96 md:h-96 opacity-30 animate-float" style={{ animationDelay: '0s' }}>
          <img 
            src={bgDecors[0]} 
            alt="Decoration 1" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>

        {/* Decor 2: Bottom Right */}
        <div className="absolute bottom-20 -right-10 md:right-0 w-72 h-72 md:w-[30rem] md:h-[30rem] opacity-30 animate-float" style={{ animationDelay: '2s' }}>
          <img 
            src={bgDecors[1]} 
            alt="Decoration 2" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>

        {/* Decor 3: Middle Left/Right */}
        <div className="absolute top-1/2 -right-20 md:left-20 w-48 h-48 md:w-72 md:h-72 opacity-20 animate-wiggle" style={{ animationDelay: '4s' }}>
          <img 
            src={bgDecors[2]} 
            alt="Decoration 3" 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>
      </div>

      {/* --- Hidden Inputs --- */}
      {/* Main Hero Input */}
      <input 
        type="file" 
        accept="image/*" 
        ref={imageInputRef} 
        onChange={handleHeroUpload} 
        className="hidden" 
      />
      {/* BGM Input */}
      <input 
        type="file" 
        accept="video/mp4, audio/mp3, audio/wav" 
        ref={audioInputRef} 
        onChange={handleAudioUpload} 
        className="hidden" 
      />
      {/* Polaroid Inputs (3 slots) */}
      {[0, 1, 2].map((i) => (
        <input
          key={`polaroid-${i}`}
          type="file"
          accept="image/*"
          ref={(el) => { polaroidInputRefs.current[i] = el; }}
          onChange={(e) => handlePolaroidUpload(i, e)}
          className="hidden"
        />
      ))}
      {/* Background Decor Inputs (3 slots) */}
      {[0, 1, 2].map((i) => (
        <input
          key={`bg-${i}`}
          type="file"
          accept="image/*"
          ref={(el) => { bgDecorInputRefs.current[i] = el; }}
          onChange={(e) => handleBgDecorUpload(i, e)}
          className="hidden"
        />
      ))}

      {/* Audio Player */}
      {bgmSrc && (
        <video 
          ref={videoRef} 
          src={bgmSrc} 
          loop 
          autoPlay 
          playsInline 
          className="hidden" 
        />
      )}

      {/* --- Top Right Sticky Controls --- */}
      <div className="fixed top-6 right-6 z-50 flex gap-3 md:gap-4 items-start">
        {/* Toggle Settings */}
        <div className="flex flex-col gap-3 items-end">
           <div className="flex gap-3">
              {/* Upload Main Image */}
              <StarButton 
                onClick={() => imageInputRef.current?.click()} 
                icon={<Upload size={20} />} 
                label="更换头像"
              />
              {/* Upload Music */}
              <StarButton 
                onClick={() => audioInputRef.current?.click()} 
                icon={<Music size={20} />} 
                label="更换音乐"
              />
              {/* Play/Pause */}
              {bgmSrc && (
                <StarButton 
                  onClick={togglePlay} 
                  isActive={isPlaying}
                  icon={isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />} 
                  label="播放 / 暂停"
                />
              )}
              {/* Settings Button */}
              <StarButton 
                onClick={() => setShowSettings(!showSettings)} 
                isActive={showSettings}
                icon={<Settings size={20} />} 
                label="设置"
                className="bg-stone-50 text-stone-400 border-stone-200"
              />
           </div>

           {/* Dropdown for Background Uploads */}
           {showSettings && (
             <div className="bg-white p-3 rounded-2xl shadow-xl border-2 border-yellow-200 flex flex-col gap-2 animate-fadeInUp">
                <span className="text-xs font-bold text-stone-400 px-1 uppercase tracking-wider">背景装饰</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => bgDecorInputRefs.current[0]?.click()}
                    className="flex flex-col items-center gap-1 p-2 bg-stone-50 hover:bg-yellow-50 rounded-lg text-xs font-bold text-stone-500 transition-colors"
                  >
                     <ImageIcon size={16} /> Happy birthday to you！
                  </button>
                  <button 
                    onClick={() => bgDecorInputRefs.current[1]?.click()}
                    className="flex flex-col items-center gap-1 p-2 bg-stone-50 hover:bg-yellow-50 rounded-lg text-xs font-bold text-stone-500 transition-colors"
                  >
                     <ImageIcon size={16} /> 可爱的一天
                  </button>
                  <button 
                    onClick={() => bgDecorInputRefs.current[2]?.click()}
                    className="flex flex-col items-center gap-1 p-2 bg-stone-50 hover:bg-yellow-50 rounded-lg text-xs font-bold text-stone-500 transition-colors"
                  >
                     <ImageIcon size={16} /> 小小心意
                  </button>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* ================= SECTION 1: HERO / BIRTHDAY WISH ================= */}
      {/* Added z-10 relative to sit above background decorations */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-10">
        
        <div className="text-center z-10 animate-float">
          {/* Main Avatar Circle */}
          <div className="relative mx-auto mb-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-white rounded-full opacity-60 blur-xl"></div>
            
            <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto group">
              <div className="absolute inset-0 border-4 border-dashed border-yellow-300 rounded-full animate-spin-slow"></div>
              
              <div className="absolute inset-2 rounded-full overflow-hidden bg-white/40 backdrop-blur-sm border-4 border-white shadow-xl flex items-center justify-center">
                {heroImage ? (
                  <img src={heroImage} alt="Star Person" className="w-full h-full object-contain p-4" />
                ) : (
                  <div 
                    onClick={() => imageInputRef.current?.click()}
                    className="cursor-pointer flex flex-col items-center justify-center text-yellow-400 hover:text-yellow-500 transition-colors w-full h-full"
                  >
                    <div className="bg-yellow-50 p-4 rounded-full mb-3">
                       <Sparkles size={40} />
                    </div>
                    <span className="font-bold text-stone-600">点击上传照片</span>
                  </div>
                )}
              </div>
              
              <div className="absolute -top-2 right-4 text-yellow-400 drop-shadow-md animate-bounce">
                <Star size={32} fill="currentColor" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-yellow-400 drop-shadow-[0_2px_0_rgba(251,191,36,1)] stroke-text">
            Happy birthday to you！
          </h1>
          <p className="text-stone-500 text-lg md:text-xl font-medium tracking-wide max-w-md mx-auto bg-white/60 py-2 px-6 rounded-full shadow-sm backdrop-blur-sm inline-block">
            May you be the brightest among the stars
          </p>
        </div>

        {/* Scroll Hint */}
        {showScrollHint && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-yellow-400 animate-bounce">
            <span className="text-sm mb-2 font-bold tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full text-stone-400">下滑开启庆祝</span>
            <ArrowDown size={28} />
          </div>
        )}
      </section>

      {/* ================= SECTION 2: IN MY EYES (PHOTO WALL & STICKY NOTES) ================= */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-600 mb-2 font-['Quicksand']">
            在我眼中 <span className="text-yellow-400 underline decoration-wavy decoration-2">的ni~</span>
          </h2>
          <p className="text-stone-400 text-sm md:text-base">Freeze the moment</p>
        </div>

        {/* Polaroid Grid */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center w-full max-w-5xl mb-24">
          {polaroidPhotos.map((photo, index) => (
            <div 
              key={index}
              className={`
                relative bg-white p-3 pb-12 shadow-lg w-64 transition-all duration-300 transform group
                ${index === 0 ? '-rotate-3 hover:rotate-0 hover:scale-105 z-0' : ''}
                ${index === 1 ? 'rotate-2 md:-translate-y-8 hover:rotate-0 hover:scale-105 z-10' : ''}
                ${index === 2 ? '-rotate-1 hover:rotate-0 hover:scale-105 z-0' : ''}
              `}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-yellow-200/80 rotate-1 shadow-sm opacity-90"></div>

              {/* Image Container */}
              <div className="w-full h-64 bg-stone-100 overflow-hidden relative">
                <img src={photo} alt={`Memory ${index + 1}`} className="w-full h-full object-cover" />
                
                {/* Upload Button Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => polaroidInputRefs.current[index]?.click()}>
                   <div className="bg-yellow-400 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                     <Camera size={24} />
                   </div>
                </div>
              </div>
              
              {/* Decoration */}
              <div className="absolute bottom-4 right-4 text-stone-300">
                <Heart size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Editable Sticky Notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl px-4">
          {stickyNotes.map((note, index) => {
             const rotation = index === 0 ? '-rotate-2' : index === 1 ? 'rotate-1' : '-rotate-3';
             const bgColor = index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-pink-100' : 'bg-blue-100';
             const tapeColor = index === 0 ? 'bg-yellow-300/50' : index === 1 ? 'bg-pink-300/50' : 'bg-blue-300/50';

             return (
              <div key={index} className={`relative p-6 ${bgColor} shadow-md ${rotation} transition-transform hover:scale-105 hover:rotate-0 hover:z-20 group`}>
                {/* Washi Tape */}
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 ${tapeColor} opacity-80 rotate-1 mask-washi`}></div>
                
                {/* Editable Area */}
                <div className="relative">
                  <textarea
                    value={note}
                    onChange={(e) => handleStickyNoteChange(index, e.target.value)}
                    className="w-full h-32 bg-transparent resize-none outline-none font-['Dancing_Script'] text-2xl text-stone-700 leading-relaxed text-center overflow-hidden placeholder-stone-400"
                    placeholder="best wishes"
                  />
                  <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none text-stone-400">
                    <PenLine size={16} />
                  </div>
                </div>
              </div>
             );
          })}
        </div>
      </section>


      {/* ================= SECTION 3: FUTURE WISHES (Redesigned) ================= */}
      <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-4 py-20">
        
        {/* Main Wish Board */}
        <div className="relative w-full max-w-3xl bg-white border-4 border-yellow-200 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-8 md:p-16">
           
           {/* Decorative Elements */}
           <div className="absolute -top-10 -left-10 text-sky-200 animate-float opacity-90 z-10">
             <Cloud size={100} fill="currentColor" />
             <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-600 font-bold text-sm">小小心意</span>
           </div>
           
           <div className="absolute -bottom-8 -right-8 text-pink-200 animate-float opacity-90 z-10" style={{ animationDelay: '2.5s' }}>
             <Star size={90} fill="currentColor" />
           </div>

           <div className="absolute top-0 right-10 w-4 h-16 bg-yellow-400/30 rounded-b-lg"></div>
           <div className="absolute top-0 right-20 w-4 h-12 bg-orange-400/30 rounded-b-lg"></div>

           {/* Content */}
           <div className="text-center mb-10">
              <h2 className="inline-block text-3xl md:text-4xl font-bold text-stone-600 font-['Quicksand'] relative">
                送给未来的祝福
                <div className="absolute -bottom-2 left-0 w-full h-2 bg-yellow-200/60 -rotate-1"></div>
              </h2>
           </div>
           
           <div className="space-y-6">
             {futureWishes.map((wish, index) => (
               <div key={index} className="flex items-start gap-4 group">
                 <div className="mt-1 flex-shrink-0 text-yellow-400 group-hover:scale-125 transition-transform duration-300">
                   {index === 0 ? <Star size={24} fill="currentColor" /> : index === 1 ? <Smile size={24} /> : <Cloud size={24} fill="currentColor" />}
                 </div>
                 <div className="flex-grow relative">
                   <textarea
                      value={wish}
                      onChange={(e) => handleWishChange(index, e.target.value)}
                      className="w-full bg-stone-50/50 hover:bg-stone-50 focus:bg-yellow-50 rounded-xl p-3 resize-none outline-none font-['Quicksand'] font-medium text-stone-600 text-lg leading-relaxed border border-transparent hover:border-yellow-200 focus:border-yellow-300 transition-all shadow-sm"
                      rows={2}
                   />
                 </div>
               </div>
             ))}
           </div>

           <div className="mt-12 flex justify-center items-center gap-2 opacity-60">
             <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
             <div className="h-2 w-2 rounded-full bg-pink-400"></div>
             <div className="h-2 w-2 rounded-full bg-sky-400"></div>
           </div>
        </div>
      </section>


      {/* ================= SECTION 4: THE LETTER ================= */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 pb-20">
        <Envelope isOpen={isLetterOpen} setIsOpen={setIsLetterOpen}>
          {/* Handwritten Letter Content (Chinese) */}
          <div className="font-['Long_Cang'] text-xl md:text-2xl leading-relaxed text-stone-700 tracking-wide">
            
            {/* Header Date & Icons */}
            <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-yellow-200 pb-2">
              <span className="text-stone-400 text-lg font-['Quicksand'] font-bold tracking-widest">2025 · Birthday</span>
              <div className="flex gap-1 animate-pulse">
                 <Star className="text-yellow-400" size={18} fill="currentColor" />
                 <Star className="text-pink-300" size={18} fill="currentColor" />
              </div>
            </div>
            
            {/* Salutation */}
            <p className={`mb-6 text-3xl font-bold text-yellow-600 ${isLetterOpen ? 'opacity-0 animate-fadeInUp' : ''}`} style={{ animationDelay: '1.0s' }}>
              致 · 李惠老师
            </p>
            
            {/* Body Paragraphs */}
            <div className="space-y-4">
              <p className={`${isLetterOpen ? 'opacity-0 animate-fadeInUp' : ''}`} style={{ animationDelay: '1.2s' }}>
                展信舒颜。生日快乐~~ 今天回家一定要好好犒劳一下辛苦的自己🎂
              </p>
              
              <p className={`${isLetterOpen ? 'opacity-0 animate-fadeInUp' : ''}`} style={{ animationDelay: '1.4s' }}>
                非常幸运能够在第一份实习就遇到您，老师的每一s次提点都对我至关重要！（我和朋友聊天说的最多的话就是我mt真好hhhh）
              </p>
              
              <p className={`${isLetterOpen ? 'opacity-0 animate-fadeInUp' : ''}`} style={{ animationDelay: '1.6s' }}>
                接下来的日子也请老师多多指教！我会努力学习，加速成长，成为让您欣慰的实习生的ദ്ദി˶˃ ᵕ ˂ )✧
              </p>
              
               <p className={`${isLetterOpen ? 'opacity-0 animate-fadeInUp' : ''}`} style={{ animationDelay: '1.8s' }}>
                感谢您像引路星一样，指引我前行的方向，让我在职业的旷野中不再迷茫。🌟✨
                祝老师天天开心，万事胜意~加薪加加加加加加加加到厌倦，早日暴富♡
              </p>
            </div>
            
            {/* Signature */}
            <div className={`flex flex-col items-end mt-10 ${isLetterOpen ? 'opacity-0 animate-fadeInUp' : ''}`} style={{ animationDelay: '2.0s' }}>
              <p className="mr-8 text-xl">送上最真挚的祝福</p>
              <div className="relative mt-2">
                 <span className="font-bold text-3xl text-yellow-600 rotate-[-3deg] block pr-4">陆相警</span>
                 <div className="absolute -bottom-2 -right-2 text-pink-300">
                   <Smile size={32} />
                 </div>
              </div>
            </div>
          </div>
        </Envelope>
      </section>

      <footer className="w-full text-center text-stone-400 text-sm font-bold pb-8">
        Made with love for 李惠老师 · Happy Birthday 💛
      </footer>
    </div>
  );
};

export default App;
