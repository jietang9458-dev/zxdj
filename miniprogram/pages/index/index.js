Page({
  data: {
    appUrl: "https://ais-dev-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app",
    finalUrl: "",
    showWebview: false
  },
  onLoad(options) {
    console.log('小程序初始化完毕，等待用户点击进入');
    wx.clearStorageSync(); // 清除之前的登录缓存，确保停留在这个页面
    
    // 如果有分享带来的 h5url 参数，覆盖默认的 appUrl
    if (options.h5url) {
      this.setData({
        appUrl: decodeURIComponent(options.h5url)
      });
    }
  },
  enterApp() {
    let url = this.data.appUrl;
    let params = [];
    params.push(`source=miniprogram`);
    params.push(`t=${Date.now()}`); // 添加时间戳防止 H5 白屏缓存
    
    if (url.includes('?')) {
      url += '&' + params.join('&');
    } else {
      url += '?' + params.join('&');
    }
    
    console.log('准备进入 Webview，URL:', url);
    wx.showLoading({ title: '加载中...' });
    
    // 延迟一点点展示 webview，确保 loading 能看到
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
  }
,

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
