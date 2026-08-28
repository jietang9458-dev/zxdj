const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const oldSave = `  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await updatePageContent('settings', { 
        logo: appLogo, 
        name: appName,
        slogan: appSlogan,
        enName: appEnName,
        auditionEmail: auditionEmail,
        splashUrl: splashUrl,
        splashType: splashType,
        welcomeTitle: welcomeTitle,
        welcomeNavTitle: welcomeNavTitle
      });`;

const newSave = `  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const makeAbsolute = (url) => url && url.startsWith('/') ? window.location.origin + url : url;

      await updatePageContent('settings', { 
        logo: makeAbsolute(appLogo), 
        name: appName,
        slogan: appSlogan,
        enName: appEnName,
        auditionEmail: auditionEmail,
        splashUrl: makeAbsolute(splashUrl),
        splashType: splashType,
        welcomeTitle: welcomeTitle,
        welcomeNavTitle: welcomeNavTitle,
        customerAvatar: makeAbsolute(customerAvatar)
      });`;

content = content.replace(oldSave, newSave);

fs.writeFileSync('src/pages/Admin.tsx', content);
