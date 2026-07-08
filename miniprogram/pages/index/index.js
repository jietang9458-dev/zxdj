Page({
  data: {
    appUrl: "https://ais-pre-msndmjbx4cyt5wbu7ntfdc-472421389681.asia-northeast1.run.app"
  },
  onLoad(options) {
    // 您可以在这里添加参数透传逻辑

    // 示例：使用云托管 callContainer 调用后端接口
    /*
    wx.cloud.callContainer({
      config: {
        env: 'cloudbase-d3gzm22gqb7c0caf1', // 替换为你的微信云托管环境ID
      },
      path: '/api/pages/home', // 对应你Express中编写的路由
      method: 'GET',
      header: {
        'X-WX-SERVICE': 'zxys', // 替换为你的云托管服务名称
      },
      data: {
        // 你的请求参数
      },
      success: (res) => {
        console.log('接口返回：', res.data)
      },
      fail: (err) => {
        console.error('请求失败：', err)
      }
    })
    */
  },
  onWebviewLoad() {
    console.log('H5页面加载成功');
  },
  onWebviewError(e) {
    console.error('H5页面加载失败:', e.detail);
  }
})
