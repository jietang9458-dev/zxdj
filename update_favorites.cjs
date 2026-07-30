const fs = require('fs');
let content = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

const targetFavorites = `// 3. 我的收藏
export function Favorites() {
  const [tab, setTab] = useState('短剧');
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <div className="flex px-6 py-0 gap-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1A1108] sticky top-24 z-20 overflow-x-auto scrollbar-hide">
        {[
        ].map(item => (`;

const replaceFavorites = `// 3. 我的收藏
export function Favorites() {
  const [tab, setTab] = useState('短剧');
  const [savedDramas, setSavedDramas] = useState(HOT_DRAMAS);
  const [savedProducts, setSavedProducts] = useState(MALL_PRODUCTS);

  const removeDrama = (index) => {
    setSavedDramas(prev => prev.filter((_, i) => i !== index));
  };

  const removeProduct = (index) => {
    setSavedProducts(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="我的收藏" dark showBack />
      <div className="flex px-6 py-0 gap-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1A1108] sticky top-[72px] z-20 overflow-x-auto scrollbar-hide">
        {[
          { label: '短剧', ic: <Film size={18} /> },
          { label: '商品', ic: <ShoppingBag size={18} /> }
        ].map(item => (`;

content = content.replace(targetFavorites, replaceFavorites);

const targetDramaRender = `        {tab === '短剧' ? (
          HOT_DRAMAS.length > 0 ? (
            HOT_DRAMAS.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-white dark:bg-[#2A1D0F] p-4 rounded-[28px] shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex flex-col justify-center gap-2">
                  <h4 className="text-[15px] font-black text-[#1A1108] dark:text-white">{item.title}</h4>
                  <p className="text-[12px] text-[#A69984] font-bold">更新至 第80集</p>
                </div>
              </motion.div>
            ))
          ) : (`;

const replaceDramaRender = `        {tab === '短剧' ? (
          savedDramas.length > 0 ? (
            savedDramas.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={item.id || i} 
                className="bg-white dark:bg-[#2A1D0F] p-4 rounded-[28px] shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 active:scale-[0.98] transition-transform relative group"
              >
                <div className="flex flex-col justify-center gap-2 flex-1">
                  <h4 className="text-[15px] font-black text-[#1A1108] dark:text-white pr-8">{item.title}</h4>
                  <p className="text-[12px] text-[#A69984] font-bold">更新至 第80集</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeDrama(i); }} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))
          ) : (`;

content = content.replace(targetDramaRender, replaceDramaRender);

const targetProductRender = `        ) : tab === '商品' ? (
          MALL_PRODUCTS.map((prod, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white dark:bg-[#2A1D0F] p-4 rounded-[28px] shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 active:scale-[0.98] transition-transform"
            >
              <div className="flex flex-col justify-center gap-1">
                <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white line-clamp-1">{prod.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-black text-[#8B6E4E] dark:text-[#E6D5B8]">¥ {prod.price}</span>
                  <span className="text-[10px] text-[#A69984] font-bold line-through opacity-50">¥ {Math.floor(prod.price * 1.5)}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (`;

const replaceProductRender = `        ) : tab === '商品' ? (
          savedProducts.length > 0 ? (
            savedProducts.map((prod, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={prod.id || i} 
                className="bg-white dark:bg-[#2A1D0F] p-4 rounded-[28px] shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 active:scale-[0.98] transition-transform relative group"
              >
                <div className="flex flex-col justify-center gap-1 flex-1 pr-8">
                  <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white line-clamp-1">{prod.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-black text-[#8B6E4E] dark:text-[#E6D5B8]">¥ {prod.price}</span>
                    <span className="text-[10px] text-[#A69984] font-bold line-through opacity-50">¥ {Math.floor(prod.price * 1.5)}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); removeProduct(i); }} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-400 font-bold py-10">暂无收藏</div>
          )
        ) : (`;
content = content.replace(targetProductRender, replaceProductRender);

fs.writeFileSync('src/pages/UserSubPages.tsx', content);
