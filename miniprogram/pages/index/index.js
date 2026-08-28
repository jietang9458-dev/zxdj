Page({
  data: {
    appUrl: "https://ais-dev-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app",
    finalUrl: "",
    // Step state machine: 'ad' -> 'welcome' -> 'webview'
    currentStep: 'ad',
    splashUrl: "https://ais-dev-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app/uploads/splash_ad.mp4",
    splashPoster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1080&h=1920&fit=crop",
    defaultPosterUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1080&h=1920&fit=crop",
    splashType: "video", // 'video' | 'image'
    welcomeTitle: "中星影视生态链",
    welcomeNavTitle: "中星影视生态链",
    slogan: "联动你我 · 链接未来",
    logo: "",
    countdown: 5,
    timer: null,
    videoReady: false,
    videoError: false,
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

    // 1. 优先读取已在本地下载的最新广告文件
    const localSplash = this.checkLocalSplashCache();
    const cachedSettings = wx.getStorageSync('app_settings') || {};

    const wTitle = cachedSettings.welcomeTitle || this.data.welcomeTitle;
    const wNav = cachedSettings.welcomeNavTitle || this.data.welcomeNavTitle;
    const slogan = cachedSettings.slogan || this.data.slogan;
    const logo = cachedSettings.logo || this.data.logo;

    if (wNav) {
      wx.setNavigationBarTitle({ title: wNav });
    }

    // 默认直接启动 5 秒广告倒计时
    this.startCountdown();

    if (localSplash && localSplash.localPath) {
      console.log('⚡ 使用本地预加载广告媒体 (0秒秒开):', localSplash.localPath);
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
      });
    } else if (cachedSettings.splashUrl) {
      this.applySettings(cachedSettings, false);
    }

    // 后台拉取最新服务端设置以保持同步
    this.fetchSettings();
  },

  onReady() {
    this.initVideoContext();
  },

  initVideoContext() {
    if (!this.videoCtx) {
      this.videoCtx = wx.createVideoContext('splashVideo', this);
    }
    if (this.data.currentStep === 'ad' && this.data.splashType === 'video' && this.data.splashUrl && !this.data.videoError) {
      if (this.videoCtx) {
        try {
          this.videoCtx.play();
        } catch (e) {}
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

    const wTitle = data.welcomeTitle || that.data.welcomeTitle;
    const wNav = data.welcomeNavTitle || that.data.welcomeNavTitle;
    const slogan = data.slogan || that.data.slogan;
    const logo = data.logo || that.data.logo;
    const splashType = data.splashType || 'video';
    const splashPoster = data.splashPoster || that.data.splashPoster;

    if (wNav) {
      wx.setNavigationBarTitle({ title: wNav });
    }

    let splash = data.splashUrl || that.data.splashUrl;
    if (splash && typeof splash === 'string') {
      splash = splash.trim();
      if (splash.startsWith('/')) {
        splash = that.data.appUrl + splash;
      }
      if (splash.startsWith('http://')) {
        splash = splash.replace('http://', 'https://');
      }
    }

    that.setData({
      splashUrl: splash,
      splashType: splashType,
      splashPoster: splashPoster,
      welcomeTitle: wTitle,
      welcomeNavTitle: wNav,
      slogan: slogan,
      logo: logo
    }, () => {
      if (splashType === 'video') {
        setTimeout(() => { that.initVideoContext(); }, 80);
      }
    });
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
        }
      },
      fail: (err) => {
        console.warn('拉取设置失败，使用本地默认值继续广告流程:', err);
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
    this.setData({ videoReady: true, videoError: false });
    this.initVideoContext();
  },

  onVideoPlay(e) {
    console.log('广告视频开始播放');
  },

  onMediaError(e) {
    console.warn('广告视频播放出错，自动切换至兜底图片:', e.detail || e);
    this.setData({
      videoError: true,
      splashType: 'image'
    });
  },

  onImageError(e) {
    console.warn('图片广告加载出错，切换至默认海报');
    this.setData({
      splashUrl: this.data.defaultPosterUrl
    });
  },

  onWebviewLoad() {
    console.log('H5页面加载成功，已进入用户浏览阶段');
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
  // 智能空闲预加载调度器 (Idle Preloader)
  // ==========================================
  scheduleIdlePreload() {
    if (this.idlePreloadTimer) {
      clearTimeout(this.idlePreloadTimer);
    }

    const that = this;
    // 延迟 4 秒启动预加载：确保用户主屏浏览体验完全流畅
    this.idlePreloadTimer = setTimeout(() => {
      console.log('✨ [智能空闲预加载] 启动静默媒体预热');
      that.runIdlePreloadTasks();
    }, 4000);
  },

  runIdlePreloadTasks() {
    const that = this;
    this.preloadLatestSplashMedia();
    setTimeout(() => {
      that.preloadKeyAppImages();
    }, 2500);
  },

  // 任务 1：预下载最新的广告媒体
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

        const cachedInfo = wx.getStorageSync('cached_splash_info');
        if (cachedInfo && cachedInfo.url === remoteUrl && cachedInfo.localPath && that.fsManager) {
          try {
            that.fsManager.accessSync(cachedInfo.localPath);
            console.log('✔ [智能空闲预加载] 广告媒体本地已是最新');
            wx.setStorageSync('app_settings', newSettings);
            return;
          } catch (err) {}
        }

        console.log('📥 [智能空闲预加载] 静默下载最新广告媒体:', remoteUrl);
        wx.downloadFile({
          url: remoteUrl,
          success: (downloadRes) => {
            if (downloadRes.statusCode === 200 && downloadRes.tempFilePath) {
              const ext = (remoteUrl.split('?')[0].split('.').pop() || 'mp4').toLowerCase();
              const savePath = wx.env.USER_DATA_PATH + '/splash_ad_' + Date.now() + '.' + ext;

              if (cachedInfo && cachedInfo.localPath && that.fsManager) {
                try { that.fsManager.unlinkSync(cachedInfo.localPath); } catch (e) {}
              }

              if (that.fsManager) {
                that.fsManager.saveFile({
                  tempFilePath: downloadRes.tempFilePath,
                  filePath: savePath,
                  success: () => {
                    wx.setStorageSync('cached_splash_info', {
                      url: remoteUrl,
                      localPath: savePath,
                      type: newSettings.splashType || 'video',
                      timestamp: Date.now()
                    });
                    wx.setStorageSync('app_settings', newSettings);
                    console.log('🎉 [智能空闲预加载] 广告媒体已缓存至本地:', savePath);
                  },
                  fail: (saveErr) => {
                    console.warn('[智能空闲预加载] 保存失败:', saveErr);
                  }
                });
              }
            }
          },
          fail: (dlErr) => {
            console.warn('[智能空闲预加载] 下载失败:', dlErr);
          }
        });
      }
    });
  },

  // 任务 2：低频预热关键图片
  preloadKeyAppImages() {
    const that = this;
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

        wx.request({
          url: that.data.appUrl + '/api/dramas',
          method: 'GET',
          success: (dramaRes) => {
            if (Array.isArray(dramaRes.data)) {
              dramaRes.data.slice(0, 10).forEach((d) => {
                if (d && d.coverImage) imageUrls.push(d.coverImage);
              });
            }
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
        success: () => {},
        complete: () => {
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
