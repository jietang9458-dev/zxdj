Page({
  data: {
    appUrl: "https://ais-pre-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app",
    finalUrl: "",
    hasLogin: false
  },
  onLoad(options) {
    const hasLogin = wx.getStorageSync('hasLogin');
    if (hasLogin) {
      const userInfo = wx.getStorageSync('userInfo') || {};
      this.enterApp(userInfo);
    }
  },
  onCancel() {
    // 如果用户取消，我们直接跳过授权，进入H5
    const userInfo = { nickName: '星友_9527', avatarUrl: '' };
    wx.setStorageSync('hasLogin', true);
    wx.setStorageSync('userInfo', userInfo);
    this.enterApp(userInfo);
  },
  onConfirm() {
    // 设置一个防卡死超时，3秒没反应直接进入
    const timeoutId = setTimeout(() => {
      if (!this.data.hasLogin) {
        const fallbackInfo = { nickName: '星友_9527', avatarUrl: '' };
        wx.setStorageSync('hasLogin', true);
        wx.setStorageSync('userInfo', fallbackInfo);
        this.enterApp(fallbackInfo);
        wx.showToast({ title: '授权超时，已跳过', icon: 'none' });
      }
    }, 3000);

    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        clearTimeout(timeoutId);
        const userInfo = res.userInfo;
        wx.setStorageSync('hasLogin', true);
        wx.setStorageSync('userInfo', userInfo);
        this.enterApp(userInfo);
      },
      fail: (err) => {
        clearTimeout(timeoutId);
        console.error("getUserProfile failed", err);
        // 如果失败（比如基础库不支持），也跳过进入
        const userInfo = { nickName: '星友_9527', avatarUrl: '' };
        wx.setStorageSync('hasLogin', true);
        wx.setStorageSync('userInfo', userInfo);
        this.enterApp(userInfo);
      }
    });
  },
  enterApp(userInfo) {
    let url = this.data.appUrl;
    if (userInfo && userInfo.nickName) {
      url += `?nickname=${encodeURIComponent(userInfo.nickName)}&avatar=${encodeURIComponent(userInfo.avatarUrl || '')}`;
    }
    this.setData({ hasLogin: true, finalUrl: url });
  },
  onWebviewLoad() {
    console.log('H5页面加载成功');
  },
  onWebviewError(e) {
    console.error('H5页面加载失败:', e.detail);
  }
})
