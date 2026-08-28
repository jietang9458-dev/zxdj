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
    videoReady: false
  },

  videoCtx: null,

  onLoad(options) {
    console.log('小程序 onLoad 初始化');
    if (options && options.h5url) {
      this.setData({
        appUrl: decodeURIComponent(options.h5url)
      });
    }

    // 1. 优先读取本地缓存的设置以秒开广告/欢迎页，杜绝闪烁
    const cachedSettings = wx.getStorageSync('app_settings');
    if (cachedSettings) {
      this.applySettings(cachedSettings, false);
    }

    // 2. 从云端/服务器拉取最新全局设置
    this.fetchSettings();
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
      // 保证绝对路径
      if (splash.startsWith('/')) {
        splash = that.data.appUrl + splash;
      }
      // 保证使用 https
      if (splash.startsWith('http://')) {
        splash = splash.replace('http://', 'https://');
      }

      // 如果当前还在广告阶段，更新并启动倒计时
      if (that.data.currentStep === 'ad') {
        that.setData({
          splashUrl: splash,
          splashType: splashType,
          welcomeTitle: wTitle,
          welcomeNavTitle: wNav,
          slogan: slogan,
          logo: logo
        }, () => {
          if (splashType === 'video') {
            setTimeout(() => {
              that.initVideoContext();
            }, 100);
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
      header: {
        'Cache-Control': 'no-cache'
      },
      success: (res) => {
        console.log('获取全局设置成功:', res.data);
        if (res.data) {
          wx.setStorageSync('app_settings', res.data);
          that.applySettings(res.data, true);
        } else {
          // 无配置数据，直接进欢迎页
          if (that.data.currentStep === 'ad') {
            that.setData({ currentStep: 'welcome' });
          }
        }
      },
      fail: (err) => {
        console.error('获取设置失败:', err);
        // 网络异常时，如果还没有广告图，展示欢迎页
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
      try {
        this.videoCtx.pause();
      } catch (e) {}
    }
  },

  // 广告播放完毕或点击跳过 -> 进入欢迎页面
  skipAd() {
    console.log('用户点击跳过广告 -> 进入欢迎页面');
    this.clearAdTimer();
    this.finishAdToWelcome();
  },

  finishAdToWelcome() {
    this.clearAdTimer();
    this.setData({
      currentStep: 'welcome'
    });
  },

  // 用户在欢迎页面点击“点击进入应用” -> 加载 Webview
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
    console.log('广告视频元数据加载成功:', e.detail);
    this.setData({ videoReady: true });
    this.initVideoContext();
  },

  onVideoPlay(e) {
    console.log('广告视频开始播放:', e);
  },

  onVideoWaiting(e) {
    console.log('广告视频缓冲中:', e);
  },

  onMediaError(e) {
    console.error('广告媒体加载出错 (Image/Video):', e.detail || e);
    // 即使视频格式或加载异常，也不会卡死，5秒后自动进入欢迎页
  },

  onWebviewLoad() {
    console.log('H5页面加载成功');
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
