const fs = require('fs');
let content = fs.readFileSync('miniprogram/pages/index/index.js', 'utf-8');

const newCode = `
Page({
  data: {
    appUrl: "https://ais-dev-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app",
    finalUrl: "",
    showWebview: false,
    showSplash: false,
    splashUrl: "",
    splashType: "image",
    countdown: 5,
    timer: null
  },
  onLoad(options) {
    console.log('小程序初始化完毕，等待用户点击进入');
    wx.clearStorageSync(); 

    if (options.h5url) {
      this.setData({
        appUrl: decodeURIComponent(options.h5url)
      });
    }

    this.fetchSettings();
  },
  fetchSettings() {
    wx.request({
      url: this.data.appUrl + '/api/pages/settings',
      success: (res) => {
        if (res.data && res.data.splashUrl) {
          this.setData({
            showSplash: true,
            splashUrl: res.data.splashUrl,
            splashType: res.data.splashType || 'image',
            countdown: 5
          });
          this.startCountdown();
        }
      },
      fail: (err) => {
        console.error('获取设置失败', err);
      }
    });
  },
  startCountdown() {
    const timer = setInterval(() => {
      let current = this.data.countdown - 1;
      if (current <= 0) {
        clearInterval(this.data.timer);
        this.skipSplash();
      } else {
        this.setData({ countdown: current });
      }
    }, 1000);
    this.setData({ timer });
  },
  skipSplash() {
    if (this.data.timer) {
      clearInterval(this.data.timer);
    }
    this.setData({ showSplash: false });
  },
  enterApp() {
    let url = this.data.appUrl;
    let params = [];
    params.push(\`source=miniprogram\`);
    params.push(\`t=\${Date.now()}\`); 
    
    if (url.includes('?')) {
      url += '&' + params.join('&');
    } else {
      url += '?' + params.join('&');
    }
    
    console.log('准备进入 Webview，URL:', url);
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      this.setData({ showWebview: true, finalUrl: url });
      wx.hideLoading();
    }, 500);
  },
  onWebviewLoad() {
    console.log('H5页面加载成功');
  },
  onWebviewError(e) {
    console.error('H5页面加载失败:', e.detail);
    wx.showToast({
      title: '网页加载失败，请检查网络代理',
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
      title: '中星影视生态链',
      path: sharePath
    };
  },
  onShareTimeline() {
    return {
      title: '中星影视生态链',
      query: ''
    };
  }
})
`;

fs.writeFileSync('miniprogram/pages/index/index.js', newCode.trim());
