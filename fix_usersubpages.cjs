const fs = require('fs');
let content = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

// Fix 1: Favorites
const oldFavStates = `const [savedDramas, setSavedDramas] = useState(HOT_DRAMAS);
  const [savedProducts, setSavedProducts] = useState(MALL_PRODUCTS);`;

const newFavStates = `const [savedDramas, setSavedDramas] = useState(() => {
    const local = localStorage.getItem('app_saved_dramas');
    return local ? JSON.parse(local) : HOT_DRAMAS;
  });
  const [savedProducts, setSavedProducts] = useState(() => {
    const local = localStorage.getItem('app_saved_products');
    return local ? JSON.parse(local) : MALL_PRODUCTS;
  });`;

content = content.replace(oldFavStates, newFavStates);

const oldFavRemoves = `const removeDrama = (index) => {
    setSavedDramas(prev => prev.filter((_, i) => i !== index));
  };

  const removeProduct = (index) => {
    setSavedProducts(prev => prev.filter((_, i) => i !== index));
  };`;

const newFavRemoves = `const removeDrama = (index) => {
    setSavedDramas(prev => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('app_saved_dramas', JSON.stringify(updated));
      return updated;
    });
  };

  const removeProduct = (index) => {
    setSavedProducts(prev => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem('app_saved_products', JSON.stringify(updated));
      return updated;
    });
  };`;

content = content.replace(oldFavRemoves, newFavRemoves);

// Fix 2: Cache
const oldCacheSize = `const [cacheSize, setCacheSize] = useState('128 MB');`;
const newCacheSize = `const [cacheSize, setCacheSize] = useState(() => {
    return localStorage.getItem('app_cache_cleared') ? '0 MB' : '128 MB';
  });`;
content = content.replace(oldCacheSize, newCacheSize);

const oldClearCache = `const handleClearCache = () => {
    localStorage.clear();
    setCacheSize('0 MB');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };`;

const newClearCache = `const handleClearCache = () => {
    localStorage.setItem('app_cache_cleared', 'true');
    setCacheSize('0 MB');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };`;

content = content.replace(oldClearCache, newClearCache);

fs.writeFileSync('src/pages/UserSubPages.tsx', content);
