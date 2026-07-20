Page({
  data: {
    appUrl: "https://ais-dev-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app",
    finalUrl: "",
    showWebview: false
  },
  onLoad(options) {
    console.log('小程序初始化完毕，等待用户点击进入');
    wx.clearStorageSync(); // 清除之前的登录缓存，确保停留在这个页面
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
  }
})
