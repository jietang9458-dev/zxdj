import wx from 'weixin-js-sdk';

/**
 * Configure WeChat JS-SDK for Web App (H5) sharing.
 * Note: Requires backend to generate signature.
 */
export const initWechatShare = (config: any, shareData: any) => {
  wx.config({
    debug: false,
    appId: config.appId,
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature,
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
  });

  wx.ready(() => {
    wx.updateAppMessageShareData(shareData);
    wx.updateTimelineShareData(shareData);
  });
};

/**
 * Send share data to WeChat Mini Program wrapper.
 */
export const postShareToMiniProgram = (shareData: any) => {
  // @ts-ignore
  if (window.__wxjs_environment === 'miniprogram' || window.wx?.miniProgram) {
    // @ts-ignore
    window.wx.miniProgram.postMessage({
      data: {
        action: 'share',
        title: shareData.title,
        path: shareData.link || window.location.href,
        imageUrl: shareData.imgUrl
      }
    });
  }
};
