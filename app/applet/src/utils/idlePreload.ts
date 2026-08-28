/**
 * 智能空闲预加载管理器 (Idle Preload Manager)
 * 
 * 原则：
 * 1. 严格在用户空闲时段（requestIdleCallback 或主页面加载完成后延迟）执行
 * 2. 低优先级网络请求，绝不抢占用户的正常浏览与操作带宽
 * 3. 预热最新的 5秒广告视频/图片及主页焦点图、热门短剧海报等核心资源
 */

export function initIdlePreload() {
  if (typeof window === 'undefined') return;

  const runPreload = () => {
    // 1. 预加载最新的 5秒开屏广告媒体 (视频 / 图片)
    fetch('/api/pages/settings?_t=' + Date.now())
      .then((res) => (res.ok ? res.json() : null))
      .then((settings) => {
        if (settings && settings.splashUrl) {
          const url = settings.splashUrl;
          if (settings.splashType === 'video') {
            const video = document.createElement('video');
            video.preload = 'auto';
            video.src = url;
            video.muted = true;
          } else {
            const img = new Image();
            img.src = url;
          }
        }
      })
      .catch(() => {});

    // 2. 预热首页轮播焦点图
    fetch('/api/pages/home?_t=' + Date.now())
      .then((res) => (res.ok ? res.json() : null))
      .then((homeData) => {
        if (homeData && Array.isArray(homeData.banners)) {
          homeData.banners.forEach((b: any, idx: number) => {
            if (b && b.image) {
              setTimeout(() => {
                const img = new Image();
                img.src = b.image;
              }, 1500 * (idx + 1));
            }
          });
        }
      })
      .catch(() => {});

    // 3. 预热热门短剧海报图
    fetch('/api/dramas')
      .then((res) => (res.ok ? res.json() : null))
      .then((dramas) => {
        if (Array.isArray(dramas)) {
          const topCovers = dramas
            .slice(0, 10)
            .map((d: any) => d.coverImage)
            .filter(Boolean);

          topCovers.forEach((url: string, idx: number) => {
            setTimeout(() => {
              const img = new Image();
              img.src = url;
            }, 3000 + idx * 1200);
          });
        }
      })
      .catch(() => {});
  };

  // 等待页面完全空闲后再低频静默执行
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(runPreload, { timeout: 8000 });
  } else {
    setTimeout(runPreload, 4500);
  }
}
