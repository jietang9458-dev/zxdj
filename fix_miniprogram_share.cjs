const fs = require('fs');
const filePath = 'miniprogram/pages/index/index.js';
let content = fs.readFileSync(filePath, 'utf-8');

const targetOnLoad = `  onLoad(options) {
    console.log('小程序初始化完毕，等待用户点击进入');
    wx.clearStorageSync(); // 清除之前的登录缓存，确保停留在这个页面
  },`;
const replaceOnLoad = `  onLoad(options) {
    console.log('小程序初始化完毕，等待用户点击进入');
    wx.clearStorageSync(); // 清除之前的登录缓存，确保停留在这个页面
    
    // 如果有分享带来的 h5url 参数，覆盖默认的 appUrl
    if (options.h5url) {
      this.setData({
        appUrl: decodeURIComponent(options.h5url)
      });
    }
  },`;
content = content.replace(targetOnLoad, replaceOnLoad);

const appendCode = `
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
});`;
content = content.replace(/}\)$/, appendCode);

fs.writeFileSync(filePath, content);
