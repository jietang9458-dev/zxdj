Page({
  data: {
    appUrl: "https://ais-pre-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app"
  },
  onLoad(options) {
    // 直接进入H5页面
    const finalUrl = this.data.appUrl + "?source=miniprogram";
    this.setData({ appUrl: finalUrl });
  },
  onWebviewLoad() {
    console.log('H5页面加载成功');
  },
  onWebviewError(e) {
    console.error('H5页面加载失败:', e.detail);
  }
})
