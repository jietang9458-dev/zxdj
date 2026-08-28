import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';

export default function SplashScreen() {
  const { pages } = useCMS();
  const settings = pages?.settings || {};
  const splashUrl = settings.splashUrl;
  const splashType = settings.splashType || 'image';
  const welcomeTitle = settings.welcomeTitle || '中星影视生态链';
  const appSlogan = settings.slogan || '联动你我 · 链接未来';

  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Only show if splashUrl is configured
    if (splashUrl && !hasStarted) {
      setHasStarted(true);
      setVisible(true);
      setCountdown(5);
    }
  }, [splashUrl, hasStarted]);

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

  return (
    <AnimatePresence>
      {visible && splashUrl && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
          className="fixed inset-0 z-[99999] bg-[#1A1108] flex flex-col justify-between overflow-hidden select-none"
          id="global-splash-screen"
        >
          {/* Background Media */}
          {splashType === 'video' ? (
            <video
              src={splashUrl}
              autoPlay
              muted
              playsInline
              loop
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={splashUrl}
              alt="Welcome"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Top Skip Button */}
          <div className="relative z-20 flex justify-end p-6 pt-12">
            <button
              onClick={handleSkip}
              id="btn-skip-splash"
              className="px-4 py-1.5 bg-black/40 hover:bg-black/60 active:scale-95 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 transition-all flex items-center gap-1 shadow-lg"
            >
              <span>跳过</span>
              <span className="text-[#D4AF37] font-black">{countdown}s</span>
            </button>
          </div>

          {/* Bottom Title & Slogan Gradient Bar */}
          <div className="relative z-20 p-8 pb-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center text-center">
            {welcomeTitle && (
              <h1 className="text-xl md:text-2xl font-black text-[#D4AF37] tracking-wider mb-2 drop-shadow-md">
                {welcomeTitle}
              </h1>
            )}
            {appSlogan && (
              <p className="text-xs md:text-sm font-medium text-white/80 tracking-wide drop-shadow">
                {appSlogan}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
