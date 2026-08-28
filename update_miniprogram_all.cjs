const fs = require('fs');

// 1. index.js
const indexJs = `Page({
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
`;

fs.writeFileSync('miniprogram/pages/index/index.js', indexJs);

// 2. index.wxml
const indexWxml = `<!-- 5秒开屏欢迎页 (图片/视频) -->
<view class="splash-container" wx:if="{{showSplash && !showWebview}}">
  <video 
    wx:if="{{splashType === 'video'}}" 
    id="splashVideo"
    src="{{splashUrl}}" 
    autoplay="{{true}}" 
    loop="{{true}}" 
    muted="{{true}}"
    controls="{{false}}" 
    show-fullscreen-btn="{{false}}" 
    show-play-btn="{{false}}" 
    show-center-play-btn="{{false}}" 
    enable-progress-gesture="{{false}}" 
    object-fit="cover" 
    class="splash-media"
    binderror="onMediaError"
  ></video>
  
  <image 
    wx:if="{{splashType === 'image'}}" 
    src="{{splashUrl}}" 
    mode="aspectFill" 
    class="splash-media"
    binderror="onMediaError"
  ></image>
  
  <!-- 顶部右上角跳过按钮 -->
  <view class="skip-btn" bindtap="skipSplash">
    <text>跳过</text>
    <text class="skip-countdown">{{countdown}}s</text>
  </view>

  <!-- 底部标题与Slogan渐变蒙层 -->
  <view class="splash-bottom-bar" wx:if="{{welcomeTitle}}">
    <text class="splash-title-text">{{welcomeTitle}}</text>
    <text class="splash-slogan-text" wx:if="{{slogan}}">{{slogan}}</text>
  </view>
</view>

<!-- 备用欢迎卡片 (未配置欢迎媒体时显示) -->
<view class="container" wx:if="{{!showWebview && !showSplash}}">
  <view class="header">
    <text class="title">{{welcomeTitle}}</text>
    <text class="subtitle">{{slogan || '欢迎体验'}}</text>
  </view>
  
  <button class="enter-btn" bindtap="enterApp">点击进入应用</button>
</view>

<!-- H5 核心主视图 -->
<web-view wx:if="{{showWebview}}" src="{{finalUrl}}" bindload="onWebviewLoad" binderror="onWebviewError"></web-view>
`;

fs.writeFileSync('miniprogram/pages/index/index.wxml', indexWxml);

// 3. index.wxss
const indexWxss = `page {
  background-color: #1A1108;
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1A1108;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
}

.header {
  margin-bottom: 40px;
  text-align: center;
}

.title {
  font-size: 26px;
  font-weight: bold;
  color: #D4AF37;
  display: block;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 15px;
  color: #A69984;
}

.enter-btn {
  background-color: #D4AF37;
  color: #1A1108;
  border-radius: 28px;
  width: 80%;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 50px;
  padding: 12px 0;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.splash-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: #1A1108;
}

.splash-media {
  width: 100vw;
  height: 100vh;
  display: block;
}

.skip-btn {
  position: absolute;
  top: 54px; /* Safe area */
  right: 20px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.25);
  z-index: 10000;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: 4px;
}

.skip-countdown {
  color: #D4AF37;
  font-weight: 900;
  margin-left: 2px;
}

.splash-bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 20px 48px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10000;
}

.splash-title-text {
  font-size: 22px;
  font-weight: 900;
  color: #D4AF37;
  letter-spacing: 1px;
  margin-bottom: 6px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.splash-slogan-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}
`;

fs.writeFileSync('miniprogram/pages/index/index.wxss', indexWxss);
console.log('Successfully updated miniprogram index files');
