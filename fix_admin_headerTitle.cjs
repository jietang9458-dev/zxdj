const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const target1 = `{(activeTab === 'copyright' || activeTab === 'production' || activeTab === 'actors') && (`
const replacement1 = `{(activeTab === 'copyright' || activeTab === 'production' || activeTab === 'actors' || activeTab === 'tourism' || activeTab === 'starclub') && (`
content = content.replace(target1, replacement1);

const target2 = `                          activeTab === 'copyright' ? copyrightData.headerTitle || '' :
                          activeTab === 'production' ? productionData.headerTitle || '' :
                          activeTab === 'actors' ? actorsData.headerTitle || '' : ''`
const replacement2 = `                          activeTab === 'copyright' ? copyrightData.headerTitle || '' :
                          activeTab === 'production' ? productionData.headerTitle || '' :
                          activeTab === 'actors' ? actorsData.headerTitle || '' :
                          activeTab === 'tourism' ? (tourismData as any).pageTitle || '' :
                          activeTab === 'starclub' ? (starclubData as any).pageTitle || '' : ''`
content = content.replace(target2, replacement2);

const target3 = `                          if (activeTab === 'copyright') setCopyrightData({...copyrightData, headerTitle: val});
                          if (activeTab === 'production') setProductionData({...productionData, headerTitle: val});
                          if (activeTab === 'actors') setActorsData({...actorsData, headerTitle: val});`
const replacement3 = `                          if (activeTab === 'copyright') setCopyrightData({...copyrightData, headerTitle: val});
                          if (activeTab === 'production') setProductionData({...productionData, headerTitle: val});
                          if (activeTab === 'actors') setActorsData({...actorsData, headerTitle: val});
                          if (activeTab === 'tourism') setTourismData({...tourismData, pageTitle: val});
                          if (activeTab === 'starclub') setStarclubData({...starclubData, pageTitle: val});`
content = content.replace(target3, replacement3);

fs.writeFileSync('src/pages/Admin.tsx', content);
