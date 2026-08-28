const fs = require('fs');

// 1. index.js
const indexJs = `Page({
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
`;

fs.writeFileSync('miniprogram/pages/index/index.js', indexJs);

// 2. index.wxml
const indexWxml = `<!-- 第一阶段：5秒广告开屏页面 (最前面显示) -->
<view class="ad-container" wx:if="{{currentStep === 'ad'}}">
  <!-- 视频广告 -->
  <video 
    wx:if="{{splashType === 'video' && splashUrl}}" 
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
    show-progress="{{false}}"
    object-fit="cover" 
    class="ad-media"
    custom-cache="{{false}}"
    playsinline="{{true}}"
    webkit-playsinline="{{true}}"
    x5-video-player-type="h5-page"
    x5-video-player-fullscreen="false"
    x5-playsinline="true"
    bindloadedmetadata="onVideoLoaded"
    bindplay="onVideoPlay"
    bindwaiting="onVideoWaiting"
    binderror="onMediaError"
  ></video>

  <!-- 图片广告 -->
  <image 
    wx:elif="{{splashType === 'image' && splashUrl}}" 
    src="{{splashUrl}}" 
    mode="aspectFill" 
    class="ad-media"
    binderror="onMediaError"
  ></image>

  <!-- 顶部右上角跳过按钮 -->
  <view class="skip-btn" bindtap="skipAd">
    <text>跳过</text>
    <text class="skip-countdown">{{countdown}}s</text>
  </view>

  <!-- 底部品牌与Slogan展示条 -->
  <view class="ad-bottom-bar" wx:if="{{welcomeTitle}}">
    <text class="ad-title-text">{{welcomeTitle}}</text>
    <text class="ad-slogan-text" wx:if="{{slogan}}">{{slogan}}</text>
  </view>
</view>

<!-- 第二阶段：欢迎页面 (广告结束后展示) -->
<view class="welcome-container" wx:if="{{currentStep === 'welcome'}}">
  <!-- 装饰光晕与背景 -->
  <view class="glow-bg"></view>
  
  <view class="welcome-card">
    <!-- 品牌 Logo 或 徽章 -->
    <view class="brand-logo-wrapper">
      <image wx:if="{{logo}}" src="{{logo}}" mode="aspectFit" class="brand-logo"></image>
      <view wx:else class="brand-badge">
        <text class="badge-text">ZX</text>
      </view>
    </view>

    <!-- 欢迎标题与副标题 -->
    <view class="welcome-header">
      <text class="welcome-main-title">{{welcomeTitle}}</text>
      <text class="welcome-sub-title">{{slogan}}</text>
    </view>

    <!-- 生态特性标签 -->
    <view class="feature-tags">
      <text class="feature-tag">短剧版权</text>
      <text class="feature-dot">·</text>
      <text class="feature-tag">影视基地</text>
      <text class="feature-dot">·</text>
      <text class="feature-tag">演员孵化</text>
      <text class="feature-dot">·</text>
      <text class="feature-tag">文创体验</text>
    </view>

    <!-- 进入应用主按钮 -->
    <button class="enter-app-btn" hover-class="enter-app-btn-hover" bindtap="enterApp">
      <text class="btn-text">点击进入应用</text>
      <text class="btn-arrow">→</text>
    </button>
  </view>

  <!-- 底部安全服务标识 -->
  <view class="welcome-footer">
    <text class="footer-text">中星短剧 · 官方生态链服务平台</text>
  </view>
</view>

<!-- 第三阶段：H5 核心主视图 -->
<web-view wx:if="{{currentStep === 'webview'}}" src="{{finalUrl}}" bindload="onWebviewLoad" binderror="onWebviewError"></web-view>
`;

fs.writeFileSync('miniprogram/pages/index/index.wxml', indexWxml);

// 3. index.wxss
const indexWxss = `page {
  background-color: #120B05;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

/* ================= 广告阶段样式 ================= */
.ad-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background-color: #000000;
  overflow: hidden;
}

.ad-media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.skip-btn {
  position: absolute;
  top: 54px; /* 避开刘海屏与胶囊按钮 */
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #FFFFFF;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 100000;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 4px;
}

.skip-countdown {
  color: #D4AF37;
  font-weight: 900;
  margin-left: 2px;
}

.ad-bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 50px 24px 44px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.45) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 100000;
}

.ad-title-text {
  font-size: 22px;
  font-weight: 900;
  color: #D4AF37;
  letter-spacing: 1.5px;
  margin-bottom: 6px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
}

.ad-slogan-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
}

/* ================= 欢迎页面阶段样式 ================= */
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #120B05;
  color: #FFFFFF;
  padding: 60px 24px 36px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.glow-bg {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.welcome-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 320px;
  margin-top: 40px;
  z-index: 10;
}

.brand-logo-wrapper {
  margin-bottom: 24px;
}

.brand-logo {
  width: 84px;
  height: 84px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.brand-badge {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background: linear-gradient(135deg, #D4AF37 0%, #8B6E4E 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
}

.badge-text {
  font-size: 28px;
  font-weight: 900;
  color: #120B05;
  letter-spacing: 2px;
}

.welcome-header {
  margin-bottom: 20px;
}

.welcome-main-title {
  font-size: 26px;
  font-weight: 900;
  color: #D4AF37;
  display: block;
  margin-bottom: 8px;
  letter-spacing: 1.5px;
}

.welcome-sub-title {
  font-size: 14px;
  color: #A69984;
  font-weight: 500;
  display: block;
  letter-spacing: 0.5px;
}

.feature-tags {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 44px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.feature-tag {
  font-size: 12px;
  color: #D4AF37;
  font-weight: 600;
}

.feature-dot {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
}

.enter-app-btn {
  background: linear-gradient(135deg, #D4AF37 0%, #C59A27 100%);
  color: #120B05;
  border-radius: 30px;
  width: 100%;
  height: 54px;
  font-size: 17px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.35);
  border: none;
  transition: all 0.2s ease;
}

.enter-app-btn-hover {
  transform: scale(0.97);
  opacity: 0.92;
}

.btn-text {
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 1px;
}

.btn-arrow {
  font-size: 18px;
  font-weight: 900;
}

.welcome-footer {
  text-align: center;
  z-index: 10;
}

.footer-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.5px;
}
`;

fs.writeFileSync('miniprogram/pages/index/index.wxss', indexWxss);

console.log('Successfully updated miniprogram to full Ad -> Welcome -> Webview pipeline');
