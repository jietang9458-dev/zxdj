const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

// Change discover to hot-dramas
content = content.replace(
  `onClick={() => navigate('/discover')} className="flex items-center gap-0.5 text-[#A69984] text-[13px] font-semibold hover:text-[#D4AF37] transition-colors">\n            更多 <ChevronRight size={16} />`,
  `onClick={() => navigate('/hot-dramas')} className="flex items-center gap-0.5 text-[#A69984] text-[13px] font-semibold hover:text-[#D4AF37] transition-colors">\n            更多 <ChevronRight size={16} />`
);

// We need to filter dramas that are recommended
// If none are recommended, we can show the first 3
const oldDramasMap = `{(dramas.length > 0 ? dramas : HOT_DRAMAS).slice(0, 3).map((drama, idx) => (`;

const newDramasMap = `{(dramas.length > 0 ? (dramas.some(d => d.recommended) ? dramas.filter(d => d.recommended) : dramas) : HOT_DRAMAS).slice(0, 3).map((drama, idx) => (`;

content = content.replace(oldDramasMap, newDramasMap);

// Replace onClick action to open playUrl directly
const oldOnClick = `onClick={() => navigate(\`/drama/\${drama.id}\`)}`;
const newOnClick = `onClick={() => {
                if (drama.playUrl) {
                  window.open(drama.playUrl, '_blank');
                } else {
                  navigate(\`/drama/\${drama.id}\`);
                }
              }}`;

content = content.replace(oldOnClick, newOnClick);

fs.writeFileSync('src/pages/Home.tsx', content);
