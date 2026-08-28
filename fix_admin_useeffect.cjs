const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const oldEffect = `  useEffect(() => {
    setHomeBanners(pages.home?.banners || []);
    setHomeCategories(pages.home?.categories || []);
    setAppLogo(pages.settings?.logo || '');
    setSplashUrl(pages.settings?.splashUrl || '');
    setSplashType(pages.settings?.splashType || 'image');
    setWelcomeTitle(pages.settings?.welcomeTitle || '中星影视生态链');
    setWelcomeNavTitle(pages.settings?.welcomeNavTitle || '中星影视生态链');
    setAppName(pages.settings?.name || '中星短剧');
    setAppSlogan(pages.settings?.slogan || '联动你我 · 链接未来');
    setAppEnName(pages.settings?.enName || 'ZX Eco-Chain Premium');
    setCopyrightData(pages.copyright || { banner: '', title: '', subtitle: '', news: [] });`;

const newEffect = `  useEffect(() => {
    setHomeBanners(pages.home?.banners || []);
    setHomeCategories(pages.home?.categories || []);
    setAppLogo(pages.settings?.logo || '');
    setSplashUrl(pages.settings?.splashUrl || '');
    setSplashType(pages.settings?.splashType || 'image');
    setWelcomeTitle(pages.settings?.welcomeTitle || '中星影视生态链');
    setWelcomeNavTitle(pages.settings?.welcomeNavTitle || '中星影视生态链');
    setAppName(pages.settings?.name || '中星短剧');
    setAppSlogan(pages.settings?.slogan || '联动你我 · 链接未来');
    setAppEnName(pages.settings?.enName || 'ZX Eco-Chain Premium');
    setCustomerAvatar(pages.settings?.customerAvatar || '');
    setAuditionEmail(pages.settings?.auditionEmail || 'szfyuan@163.com');
    setCopyrightData(pages.copyright || { banner: '', title: '', subtitle: '', news: [] });`;

content = content.replace(oldEffect, newEffect);
fs.writeFileSync('src/pages/Admin.tsx', content);
