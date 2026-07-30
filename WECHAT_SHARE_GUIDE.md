# 微信小程序分享功能说明

在微信小程序中，如果您的 React H5 网页是通过 `<web-view>` 嵌入的，右上角的“转发给朋友”和“分享到朋友圈”默认是灰色的。

**要在小程序中点亮这些分享按钮，您必须在小程序原生的代码中进行配置，而不是在 React 网页代码中。**

### 小程序原生代码修改指南：

请打开您的小程序项目（微信开发者工具），找到包含 `<web-view>` 的页面（例如 `pages/index/index.js`），在其中添加以下两个函数：

```javascript
Page({
  // ... 其他代码

  // 1. 开启“转发给朋友”
  onShareAppMessage(options) {
    // options.webViewUrl 可以获取当前 H5 页面的完整 URL
    return {
      title: '中星影视生态链', // 分享标题
      path: '/pages/index/index', // 小程序页面路径
      // imageUrl: '...' // 可选，自定义分享图片
    }
  },

  // 2. 开启“分享到朋友圈”
  onShareTimeline() {
    return {
      title: '中星影视生态链',
      query: '', // 传递的参数
      // imageUrl: '...' // 可选
    }
  }
})
```

添加以上原生代码后，小程序右上角的分享功能就会激活可用了。

---

### React 端配合（可选）

如果您需要 H5 页面将动态内容传递给小程序（例如分享特定的短剧），我们在 React 项目的 `src/utils/wechat.ts` 中为您添加了 `postShareToMiniProgram` 方法。您可以在 React 组件中调用它：

```typescript
import { postShareToMiniProgram } from '../utils/wechat';

// 在某个按钮点击时
postShareToMiniProgram({
  title: '快来看这部短剧！',
  link: window.location.href,
});
```

*注：小程序端需要在 `web-view` 组件上绑定 `@message="handleMessage"` 来接收这些数据。*
