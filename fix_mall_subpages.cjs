const fs = require('fs');
let content = fs.readFileSync('src/pages/MallSubPages.tsx', 'utf-8');

const oldConfig = `  const config = categoryConfig[category || 'creative'] || {
    title: category ? (category.includes('馆') ? category : \`\${category}馆\`) : '特色产品馆',
    banner: matchedPavilion?.imageUrl || matchedPavilion?.image || matchedPavilion?.banner || 'https://images.unsplash.com/photo-1541604193435-225878996233?w=800',
    icon: <ShoppingBag size={20} />,
    filterTag: category || ''
  };`;

const newConfig = `  const dynamicCategories = pages?.mall?.categories || {};
  ['creative', 'star', 'digital', 'specialty'].forEach(key => {
    if (dynamicCategories[key]) {
      categoryConfig[key].title = dynamicCategories[key].title || categoryConfig[key].title;
      categoryConfig[key].banner = dynamicCategories[key].banner || categoryConfig[key].banner;
    }
  });

  const config = categoryConfig[category || 'creative'] || {
    title: category ? (category.includes('馆') ? category : \`\${category}馆\`) : '特色产品馆',
    banner: matchedPavilion?.imageUrl || matchedPavilion?.image || matchedPavilion?.banner || 'https://images.unsplash.com/photo-1541604193435-225878996233?w=800',
    icon: <ShoppingBag size={20} />,
    filterTag: category || ''
  };`;

content = content.replace(oldConfig, newConfig);
fs.writeFileSync('src/pages/MallSubPages.tsx', content);
