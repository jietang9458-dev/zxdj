const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

const targetLogo = `<div className="w-16 h-16 bg-gradient-to-br from-[#2A1D0F] to-[#1A1108] backdrop-blur-xl rounded-3xl flex items-center justify-center p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-[#D4AF37]/40 overflow-hidden group relative">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <img 
                  src={appSettings.logo || APP_LOGO} 
                  alt="logo" 
                  className="w-full h-full object-cover filter drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] transform group-hover:scale-110 transition-transform duration-700 rounded-xl"`;

const replaceLogo = `<div className="w-16 h-16 flex items-center justify-center group relative z-10">
                <img 
                  src={appSettings.logo || APP_LOGO} 
                  alt="logo" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 max-w-none object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] group-hover:scale-110 transition-transform duration-700"`;

content = content.replace(targetLogo, replaceLogo);
fs.writeFileSync('src/pages/Home.tsx', content);
