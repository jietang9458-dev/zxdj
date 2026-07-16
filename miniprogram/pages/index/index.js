Page({
  data: {
    appUrl: "https://你的云托管公网域名.ap-shanghai.run.tcloudbase.com" // 请替换为你云托管的“公网域名访问”链接
  },
  onLoad(options) {
    // 您可以在这里添加参数透传逻辑

    // 示例：使用云托管 callContainer 调用后端接口
    wx.cloud.callContainer({
      config: {
        env: 'cloudbase-d3gzm22gqb7c0caf1', // 你的微信云托管环境ID
      },
      path: '/api/pages/home', // 你在Express中编写的路由
      method: 'GET',
      header: {
        'X-WX-SERVICE': 'zxys', // 这是你在微信云托管中的服务名称
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
  },
  onWebviewLoad() {
    console.log('H5页面加载成功');
  },
  onWebviewError(e) {
    console.error('H5页面加载失败:', e.detail);
  }
})
