const fs = require('fs');
let content = fs.readFileSync('src/pages/Mall.tsx', 'utf-8');

const targetSearch = `  const filteredPavilions = allPavilions.filter((p: any) => !searchQuery || p.title.includes(searchQuery));

  const handleSearch = () => {
    setSearchQuery(internalQuery);
    const matches = allPavilions.filter((p: any) => p.title.includes(internalQuery));
    if (internalQuery && matches.length === 0) {
      setShowNoResultMap(true);
      setTimeout(() => setShowNoResultMap(false), 2000);
    }
  };`;

const replaceSearch = `  const filteredPavilions = allPavilions.filter((p: any) => !searchQuery || p.title.includes(searchQuery));
  const filteredProducts = searchQuery ? currentProducts.filter((p: any) => p.name && p.name.includes(searchQuery)) : [];

  const handleSearch = () => {
    setSearchQuery(internalQuery);
    const pavilionMatches = allPavilions.filter((p: any) => p.title.includes(internalQuery));
    const productMatches = currentProducts.filter((p: any) => p.name && p.name.includes(internalQuery));
    if (internalQuery && pavilionMatches.length === 0 && productMatches.length === 0) {
      setShowNoResultMap(true);
      setTimeout(() => setShowNoResultMap(false), 2000);
    }
  };`;
content = content.replace(targetSearch, replaceSearch);

const targetPlaceholder = `placeholder="搜索商品馆"`;
const replacePlaceholder = `placeholder="搜索商品馆和商品"`;
content = content.replace(targetPlaceholder, replacePlaceholder);

const targetRender = `        <div className="grid grid-cols-2 gap-4">
            {filteredPavilions.map((pavilion: any, idx: number) => (`;
const replaceRender = `        {filteredProducts.length > 0 && (
          <div className="mb-8">
            <h4 className="text-[14px] font-bold text-[#1A1108] dark:text-[#E6D5B8] mb-4">相关商品</h4>
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product: any, idx: number) => (
                <div key={idx} onClick={() => navigate(\`/product/\${product.id}\`)} className="bg-white dark:bg-[#2A1D0F] rounded-2xl overflow-hidden shadow-sm flex flex-col active:scale-95 transition-transform cursor-pointer border border-gray-50 dark:border-white/5">
                  <div className="aspect-square bg-gray-100 dark:bg-black/20 overflow-hidden relative">
                    <img src={product.imageUrl} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" alt="" />
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-bold text-[13px] text-[#1A1108] dark:text-[#E6D5B8] leading-snug line-clamp-2 mb-1">{product.name}</h3>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-[10px] text-red-500 font-bold">¥</span>
                        <span className="text-[16px] font-black text-red-500 leading-none">{product.price}</span>
                      </div>
                      <span className="text-[10px] text-[#A69984]">{product.salesCount || 0}人付款</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
            {filteredPavilions.map((pavilion: any, idx: number) => (`;
content = content.replace(targetRender, replaceRender);

fs.writeFileSync('src/pages/Mall.tsx', content);
