const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    appUrl: "https://ais-dev-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app",
    finalUrl: "",
    hasLogin: false,
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    defaultAvatar: defaultAvatarUrl
  },
  onLoad(options) {
    // 自动清理一次缓存，确保能看到弹窗
    const isFirstTime = wx.getStorageSync('isFirstTime_v3');
    if (!isFirstTime) {
      wx.clearStorageSync();
      wx.setStorageSync('isFirstTime_v3', true);
    }
    
    const hasLogin = wx.getStorageSync('hasLogin');
    if (hasLogin) {
      const userInfo = wx.getStorageSync('userInfo') || {};
      this.enterApp(userInfo);
    }
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl
    });
  },
  onInputNickname(e) {
    this.setData({
      nickName: e.detail.value
    });
  },
  onCancel() {
    const userInfo = { nickName: '星友_' + Math.floor(Math.random() * 10000), avatarUrl: '' };
    wx.setStorageSync('hasLogin', true);
    wx.setStorageSync('userInfo', userInfo);
    this.enterApp(userInfo);
  },
  onConfirm() {
    let nickName = this.data.nickName;
    if (!nickName) {
      nickName = '星友_' + Math.floor(Math.random() * 10000);
    }
    let avatarUrl = this.data.avatarUrl;
    if (avatarUrl === this.data.defaultAvatar) {
      avatarUrl = '';
    }
    const userInfo = { nickName, avatarUrl };
    wx.setStorageSync('hasLogin', true);
    wx.setStorageSync('userInfo', userInfo);
    this.enterApp(userInfo);
  },
  enterApp(userInfo) {
    let url = this.data.appUrl;
    let params = [];
    params.push(`source=miniprogram`);
    params.push(`t=${Date.now()}`); // 添加时间戳防止 H5 白屏缓存
    
    if (userInfo && userInfo.nickName) {
      params.push(`nickname=${encodeURIComponent(userInfo.nickName)}`);
    }
    if (userInfo && userInfo.avatarUrl) {
      params.push(`avatar=${encodeURIComponent(userInfo.avatarUrl)}`);
    }
    
    if (url.includes('?')) {
      url += '&' + params.join('&');
    } else {
      url += '?' + params.join('&');
    }
    
    this.setData({ hasLogin: true, finalUrl: url });
  },
  onWebviewLoad() {
    console.log('H5页面加载成功');
  },
  onWebviewError(e) {
    console.error('H5页面加载失败:', e.detail);
    wx.showToast({
      title: '页面加载失败，请检查网络或业务域名配置',
      icon: 'none',
      duration: 3000
    });
  }
})
