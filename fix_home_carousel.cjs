const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');
const oldCarousel = `<div className="h-[210px] w-full rounded-[32px] overflow-hidden relative border border-white/10 shadow-2xl bg-black">`;
const newCarousel = `<div className="h-[210px] w-full rounded-[32px] overflow-hidden relative shadow-2xl bg-black">`;
content = content.replace(oldCarousel, newCarousel);
fs.writeFileSync('src/pages/Home.tsx', content);
