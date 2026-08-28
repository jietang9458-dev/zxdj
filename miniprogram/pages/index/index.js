Page({
  data: {
    appUrl: "https://ais-dev-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app",
    finalUrl: "",
    showWebview: false,
    showSplash: false,
    splashUrl: "",
    splashType: "image",
    welcomeTitle: "中星影视生态链",
    welcomeNavTitle: "中星影视生态链",
    slogan: "联动你我 · 链接未来",
    countdown: 5,
    timer: null
  },

  onLoad(options) {
    console.log('小程序初始化 onLoad');
    if (options && options.h5url) {
      this.setData({
        appUrl: decodeURIComponent(options.h5url)
      });
    }
    this.fetchSettings();
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
        console.log('获取全局设置返回:', res.data);
        if (res.data) {
          const data = res.data;
          const wTitle = data.welcomeTitle || '中星影视生态链';
          const wNav = data.welcomeNavTitle || '中星影视生态链';
          const slogan = data.slogan || '联动你我 · 链接未来';

          if (wNav) {
            wx.setNavigationBarTitle({ title: wNav });
          }

          let splash = data.splashUrl;
          if (splash && typeof splash === 'string' && splash.trim().length > 0) {
            if (splash.startsWith('/')) {
              splash = that.data.appUrl + splash;
            }
            that.setData({
              showSplash: true,
              splashUrl: splash,
              splashType: data.splashType || 'image',
              welcomeTitle: wTitle,
              welcomeNavTitle: wNav,
              slogan: slogan,
              countdown: 5
            });
            that.startCountdown();
          } else {
            that.setData({
              welcomeTitle: wTitle,
              welcomeNavTitle: wNav,
              slogan: slogan
            });
          }
        }
      },
      fail: (err) => {
        console.error('获取设置失败:', err);
      }
    });
  },

  startCountdown() {
    const that = this;
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    const timer = setInterval(() => {
      let current = that.data.countdown - 1;
      if (current <= 0) {
        clearInterval(that.data.timer);
        that.enterApp();
      } else {
        that.setData({ countdown: current });
      }
    }, 1000);
    this.setData({ timer: timer });
  },

  skipSplash() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    this.enterApp();
  },

  enterApp() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    let url = this.data.appUrl;
    let params = [];
    params.push('source=miniprogram');
    params.push('t=' + Date.now());
    
    if (url.includes('?')) {
      url += '&' + params.join('&');
    } else {
      url += '?' + params.join('&');
    }

    console.log('进入应用 Webview:', url);
    wx.showLoading({ title: '加载中...' });

    this.setData({
      showSplash: false,
      showWebview: true,
      finalUrl: url
    });
    
    setTimeout(() => {
      wx.hideLoading();
    }, 600);
  },

  onMediaError(e) {
    console.error('欢迎页媒体加载出错:', e);
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
    this.setData({ showWebview: false });
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
