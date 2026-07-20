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
    wx.exitMiniProgram({
      success: () => {},
      fail: () => {
        wx.showToast({ title: '请点击右上角关闭', icon: 'none' });
      }
    });
  },
  onConfirm() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = res.userInfo;
        wx.setStorageSync('hasLogin', true);
        wx.setStorageSync('userInfo', userInfo);
        this.enterApp(userInfo);
      },
      fail: (err) => {
        console.error("getUserProfile failed", err);
        // Fallback for newer WeChat versions where getUserProfile is disabled
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
