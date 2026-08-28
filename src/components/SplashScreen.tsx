import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';

export default function SplashScreen() {
  const isMiniprogram = typeof window !== 'undefined' && window.location.search.includes('source=miniprogram');
  
  // If running in miniprogram webview, skip H5 splash because miniprogram native layer handles it
  if (isMiniprogram) {
    return null;
  }

  const { pages } = useCMS();
  const settings = pages?.settings || {};
  const splashUrl = settings.splashUrl || '/uploads/splash_ad.mp4';
  const splashType = settings.splashType || 'video';
  const splashPoster = settings.splashPoster || 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1080&h=1920&fit=crop';
  const welcomeTitle = settings.welcomeTitle || '中星影视生态链';
  const appSlogan = settings.slogan || '联动你我 · 链接未来';

  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [mediaError, setMediaError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt playback immediately when video is selected
    if (splashType === 'video' && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Fallback or retry
      });
    }
  }, [splashType, splashUrl]);

  useEffect(() => {
    if (!visible) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  const handleSkip = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="splash-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
        className="absolute inset-0 z-[100] bg-[#120B05] flex flex-col justify-between overflow-hidden select-none"
        id="global-splash-screen"
      >
        {/* Background Media (Video with Muted Autoplay or High Quality Image) */}
        {splashType === 'video' && !mediaError ? (
          <video
            ref={videoRef}
            src={splashUrl}
            poster={splashPoster}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            onError={() => setMediaError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={mediaError ? splashPoster : splashUrl}
            alt="Welcome Ad"
            onError={() => {}}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Top Right Skip Button */}
        <div className="relative z-20 flex justify-end p-6 pt-12">
          <button
            onClick={handleSkip}
            id="btn-skip-splash"
            className="px-4 py-1.5 bg-black/50 hover:bg-black/70 active:scale-95 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 transition-all flex items-center gap-1 shadow-lg cursor-pointer"
          >
            <span>跳过</span>
            <span className="text-[#D4AF37] font-black">{countdown}s</span>
          </button>
        </div>

        {/* Bottom Title & Slogan Gradient Bar */}
        <div className="relative z-20 p-8 pb-12 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col items-center text-center">
          {welcomeTitle && (
            <h1 className="text-xl md:text-2xl font-black text-[#D4AF37] tracking-wider mb-2 drop-shadow-md">
              {welcomeTitle}
            </h1>
          )}
          {appSlogan && (
            <p className="text-xs md:text-sm font-medium text-white/85 tracking-wide drop-shadow">
              {appSlogan}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
