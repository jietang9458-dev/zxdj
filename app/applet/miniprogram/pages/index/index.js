Page({
  data: {
    appUrl: "https://ais-dev-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app",
    finalUrl: "",
    // Step state machine: 'ad' -> 'welcome' -> 'webview'
    currentStep: 'ad',
    splashUrl: "",
    splashType: "image", // 'image' | 'video'
    welcomeTitle: "中星影视生态链",
    welcomeNavTitle: "中星影视生态链",
    slogan: "联动你我 · 链接未来",
    logo: "",
    countdown: 5,
    timer: null,
    videoReady: false,
    isLocalMedia: false
  },

  videoCtx: null,
  idlePreloadTimer: null,
  fsManager: null,

  onLoad(options) {
    console.log('小程序 onLoad 初始化');
    if (wx.getFileSystemManager) {
      this.fsManager = wx.getFileSystemManager();
    }

    if (options && options.h5url) {
      this.setData({
        appUrl: decodeURIComponent(options.h5url)
      });
    }

    // 1. 优先检查并读取已预下载到本地的广告媒体文件 (0秒免缓冲秒开)
    const localSplash = this.checkLocalSplashCache();
    const cachedSettings = wx.getStorageSync('app_settings') || {};

    const wTitle = cachedSettings.welcomeTitle || '中星影视生态链';
    const wNav = cachedSettings.welcomeNavTitle || '中星影视生态链';
    const slogan = cachedSettings.slogan || '联动你我 · 链接未来';
    const logo = cachedSettings.logo || '';

    if (wNav) {
      wx.setNavigationBarTitle({ title: wNav });
    }

    if (localSplash && localSplash.localPath) {
      console.log('⚡ 使用本地预加载广告媒体 (0秒极速启动):', localSplash.localPath);
      this.setData({
        splashUrl: localSplash.localPath,
        splashType: localSplash.type || 'video',
        welcomeTitle: wTitle,
        welcomeNavTitle: wNav,
        slogan: slogan,
        logo: logo,
        isLocalMedia: true
      }, () => {
        if (localSplash.type === 'video') {
          setTimeout(() => { this.initVideoContext(); }, 80);
        }
        this.startCountdown();
      });
    } else if (cachedSettings.splashUrl) {
      // 本地文件尚在下载中，使用本地缓存配置启动
      this.applySettings(cachedSettings, false);
    } else {
      // 首次使用且无缓存，从服务器拉取
      this.fetchSettings();
    }
  },

  onReady() {
    this.initVideoContext();
  },

  initVideoContext() {
    if (!this.videoCtx) {
      this.videoCtx = wx.createVideoContext('splashVideo', this);
    }
    if (this.data.currentStep === 'ad' && this.data.splashType === 'video' && this.data.splashUrl) {
      if (this.videoCtx) {
        this.videoCtx.play();
      }
    }
  },

  // 检查本地持久化存储中是否存在已预下载的广告文件
  checkLocalSplashCache() {
    try {
      const cacheInfo = wx.getStorageSync('cached_splash_info');
      if (cacheInfo && cacheInfo.localPath && this.fsManager) {
        this.fsManager.accessSync(cacheInfo.localPath);
        return cacheInfo;
      }
    } catch (e) {
      // 本地文件失效或已被清除
    }
    return null;
  },

  applySettings(data, isOnline = true) {
    if (!data) return;
    const that = this;

    const wTitle = data.welcomeTitle || '中星影视生态链';
    const wNav = data.welcomeNavTitle || '中星影视生态链';
    const slogan = data.slogan || '联动你我 · 链接未来';
    const logo = data.logo || '';
    const splashType = data.splashType || 'image';

    if (wNav) {
      wx.setNavigationBarTitle({ title: wNav });
    }

    let splash = data.splashUrl;
    if (splash && typeof splash === 'string' && splash.trim().length > 0) {
      splash = splash.trim();
      if (splash.startsWith('/')) {
        splash = that.data.appUrl + splash;
      }
      if (splash.startsWith('http://')) {
        splash = splash.replace('http://', 'https://');
      }

      // 如果当前还在广告阶段且尚未配置媒体，启动广告展示
      if (that.data.currentStep === 'ad' && !that.data.splashUrl) {
        that.setData({
          splashUrl: splash,
          splashType: splashType,
          welcomeTitle: wTitle,
          welcomeNavTitle: wNav,
          slogan: slogan,
          logo: logo
        }, () => {
          if (splashType === 'video') {
            setTimeout(() => { that.initVideoContext(); }, 100);
          }
          if (!that.data.timer) {
            that.startCountdown();
          }
        });
      }
    } else {
      // 未配置广告，直接进入欢迎页面
      if (that.data.currentStep === 'ad' && isOnline) {
        that.clearAdTimer();
        that.setData({
          currentStep: 'welcome',
          welcomeTitle: wTitle,
          welcomeNavTitle: wNav,
          slogan: slogan,
          logo: logo
        });
      }
    }
  },

  fetchSettings() {
    const that = this;
    const requestUrl = this.data.appUrl + '/api/pages/settings?_t=' + Date.now();

    wx.request({
      url: requestUrl,
      method: 'GET',
      header: { 'Cache-Control': 'no-cache' },
      success: (res) => {
        if (res.data) {
          wx.setStorageSync('app_settings', res.data);
          that.applySettings(res.data, true);
        } else if (that.data.currentStep === 'ad' && !that.data.splashUrl) {
          that.setData({ currentStep: 'welcome' });
        }
      },
      fail: (err) => {
        console.error('获取设置失败:', err);
        if (that.data.currentStep === 'ad' && !that.data.splashUrl) {
          that.setData({ currentStep: 'welcome' });
        }
      }
    });
  },

  startCountdown() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    const that = this;
    const timer = setInterval(() => {
      let current = that.data.countdown - 1;
      if (current <= 0) {
        that.clearAdTimer();
        that.finishAdToWelcome();
      } else {
        that.setData({ countdown: current });
      }
    }, 1000);
    this.setData({ timer: timer, countdown: 5 });
  },

  clearAdTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
      this.setData({ timer: null });
    }
    if (this.videoCtx) {
      try { this.videoCtx.pause(); } catch (e) {}
    }
  },

  skipAd() {
    console.log('用户点击跳过广告 -> 进入欢迎页面');
    this.clearAdTimer();
    this.finishAdToWelcome();
  },

  finishAdToWelcome() {
    this.clearAdTimer();
    this.setData({ currentStep: 'welcome' });
  },

  enterApp() {
    console.log('用户点击进入应用 -> 加载 Webview');
    let url = this.data.appUrl;
    let params = [];
    params.push('source=miniprogram');
    params.push('t=' + Date.now());

    if (url.includes('?')) {
      url += '&' + params.join('&');
    } else {
      url += '?' + params.join('&');
    }

    wx.showLoading({ title: '加载中...' });

    this.setData({
      currentStep: 'webview',
      finalUrl: url
    });

    setTimeout(() => {
      wx.hideLoading();
    }, 600);
  },

  onVideoLoaded(e) {
    this.setData({ videoReady: true });
    this.initVideoContext();
  },

  onVideoPlay(e) {
    console.log('广告视频开始播放');
  },

  onMediaError(e) {
    console.error('广告媒体播放出错:', e.detail || e);
  },

  onWebviewLoad() {
    console.log('H5页面加载成功，已进入用户浏览阶段');
    // 当 Webview 加载完毕且用户开始正常使用时，启动智能空闲预加载调度器
    this.scheduleIdlePreload();
  },

  onWebviewError(e) {
    console.error('H5页面加载失败:', e.detail);
    wx.showToast({
      title: '页面加载失败，请检查网络',
      icon: 'none',
      duration: 3000
    });
    this.setData({ currentStep: 'welcome' });
  },

  // ==========================================
  // 智能空闲预加载引擎 (Idle Background Preloader)
  // ==========================================
  scheduleIdlePreload() {
    if (this.idlePreloadTimer) {
      clearTimeout(this.idlePreloadTimer);
    }

    const that = this;
    // 延迟 4000 毫秒启动预加载：确保用户首屏操作完全不受任何网络影响
    this.idlePreloadTimer = setTimeout(() => {
      console.log('✨ [智能空闲预加载] 启动后台静默更新与媒体预热');
      that.runIdlePreloadTasks();
    }, 4000);
  },

  runIdlePreloadTasks() {
    const that = this;

    // 1. 静默预下载最新的 5秒开屏广告媒体 (视频 / 图片)，保存到用户本地持久化存储
    this.preloadLatestSplashMedia();

    // 2. 串行静默预热小程序核心海报、轮播图与热播剧封面
    setTimeout(() => {
      that.preloadKeyAppImages();
    }, 2500);
  },

  // 任务 1：预下载最新的 5秒广告媒体到本地文件系统
  preloadLatestSplashMedia() {
    const that = this;
    const settingsUrl = this.data.appUrl + '/api/pages/settings?_t=' + Date.now();

    wx.request({
      url: settingsUrl,
      method: 'GET',
      header: { 'Cache-Control': 'no-cache' },
      success: (res) => {
        if (!res.data || !res.data.splashUrl) return;
        const newSettings = res.data;
        let remoteUrl = newSettings.splashUrl.trim();
        if (remoteUrl.startsWith('/')) {
          remoteUrl = that.data.appUrl + remoteUrl;
        }
        if (remoteUrl.startsWith('http://')) {
          remoteUrl = remoteUrl.replace('http://', 'https://');
        }

        // 检查本地已缓存的 URL
        const cachedInfo = wx.getStorageSync('cached_splash_info');
        if (cachedInfo && cachedInfo.url === remoteUrl && cachedInfo.localPath && that.fsManager) {
          try {
            that.fsManager.accessSync(cachedInfo.localPath);
            console.log('✔ [智能空闲预加载] 广告媒体本地已处于最新状态，无需重复下载');
            wx.setStorageSync('app_settings', newSettings);
            return;
          } catch (err) {
            // 本地文件失效，继续下载
          }
        }

        console.log('📥 [智能空闲预加载] 开始静默下载最新广告媒体:', remoteUrl);
        wx.downloadFile({
          url: remoteUrl,
          success: (downloadRes) => {
            if (downloadRes.statusCode === 200 && downloadRes.tempFilePath) {
              const ext = (remoteUrl.split('?')[0].split('.').pop() || 'mp4').toLowerCase();
              const savePath = wx.env.USER_DATA_PATH + '/splash_ad_' + Date.now() + '.' + ext;

              // 清理旧的本地缓存文件，避免占用用户手机多余存储
              if (cachedInfo && cachedInfo.localPath && that.fsManager) {
                try {
                  that.fsManager.unlinkSync(cachedInfo.localPath);
                } catch (e) {}
              }

              if (that.fsManager) {
                // 保存到持久用户文件目录
                that.fsManager.saveFile({
                  tempFilePath: downloadRes.tempFilePath,
                  filePath: savePath,
                  success: () => {
                    wx.setStorageSync('cached_splash_info', {
                      url: remoteUrl,
                      localPath: savePath,
                      type: newSettings.splashType || 'image',
                      timestamp: Date.now()
                    });
                    wx.setStorageSync('app_settings', newSettings);
                    console.log('🎉 [智能空闲预加载] 新广告媒体已保存至本地，下次启动将实现 0秒极速秒开:', savePath);
                  },
                  fail: (saveErr) => {
                    console.warn('[智能空闲预加载] 保存媒体文件失败:', saveErr);
                  }
                });
              }
            }
          },
          fail: (dlErr) => {
            console.warn('[智能空闲预加载] 静默下载失败 (网络可能受限):', dlErr);
          }
        });
      }
    });
  },

  // 任务 2：低频串行预热小程序关键页面图片 (首页轮播、热门短剧)
  preloadKeyAppImages() {
    const that = this;

    // 获取首页焦点图
    wx.request({
      url: this.data.appUrl + '/api/pages/home?_t=' + Date.now(),
      method: 'GET',
      success: (homeRes) => {
        let imageUrls = [];
        if (homeRes.data && Array.isArray(homeRes.data.banners)) {
          homeRes.data.banners.forEach((b) => {
            if (b && b.image) imageUrls.push(b.image);
          });
        }

        // 获取热播短剧封面
        wx.request({
          url: that.data.appUrl + '/api/dramas',
          method: 'GET',
          success: (dramaRes) => {
            if (Array.isArray(dramaRes.data)) {
              dramaRes.data.slice(0, 10).forEach((d) => {
                if (d && d.coverImage) imageUrls.push(d.coverImage);
              });
            }

            // 启动低频串行下载队列 (每 2.5 秒下载 1 张，绝不抢占带宽)
            that.downloadImagesQueue(imageUrls, 0);
          }
        });
      }
    });
  },

  downloadImagesQueue(list, index) {
    if (!list || index >= list.length) return;
    const that = this;
    let imgUrl = list[index];

    if (imgUrl && typeof imgUrl === 'string') {
      if (imgUrl.startsWith('/')) {
        imgUrl = this.data.appUrl + imgUrl;
      }
      if (imgUrl.startsWith('http://')) {
        imgUrl = imgUrl.replace('http://', 'https://');
      }

      wx.getImageInfo({
        src: imgUrl,
        success: () => {
          // 成功写入微信内置原生图片缓存
        },
        complete: () => {
          // 间隔 2.5 秒后再预热下一张，完全保持主线程与网络畅通
          setTimeout(() => {
            that.downloadImagesQueue(list, index + 1);
          }, 2500);
        }
      });
    } else {
      setTimeout(() => {
        that.downloadImagesQueue(list, index + 1);
      }, 2500);
    }
  },

  onShareAppMessage(options) {
    let sharePath = '/pages/index/index';
    if (options.webViewUrl) {
      sharePath += '?h5url=' + encodeURIComponent(options.webViewUrl);
    }
    return {
      title: this.data.welcomeTitle || '中星影视生态链',
      path: sharePath
    };
  },

  onShareTimeline() {
    return {
      title: this.data.welcomeTitle || '中星影视生态链',
      query: ''
    };
  }
});
