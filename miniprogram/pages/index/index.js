Page({
  data: {
    appUrl: "https://ais-pre-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app"
  },
  onLoad(options) {
    // 您可以在这里添加参数透传逻辑
  },
  onWebviewLoad() {
    console.log('H5页面加载成功');
  },
  onWebviewError(e) {
    console.error('H5页面加载失败:', e.detail);
  }
})
