const fs = require('fs');
let content = fs.readFileSync('miniprogram/pages/index/index.wxml', 'utf-8');

const newCode = `
<view class="splash-container" wx:if="{{showSplash && !showWebview}}">
  <video wx:if="{{splashType === 'video'}}" src="{{splashUrl}}" autoplay="{{true}}" controls="{{false}}" show-fullscreen-btn="{{false}}" show-play-btn="{{false}}" show-center-play-btn="{{false}}" object-fit="cover" class="splash-media" muted="{{false}}"></video>
  <image wx:if="{{splashType === 'image'}}" src="{{splashUrl}}" mode="aspectFill" class="splash-media"></image>
  
  <view class="skip-btn" bindtap="skipSplash">
    跳过 {{countdown}}s
  </view>
</view>

<view class="container" wx:if="{{!showWebview && !showSplash}}">
  <view class="header">
    <text class="title">中星影视生态链</text>
    <text class="subtitle">欢迎体验</text>
  </view>
  
  <button class="enter-btn" bindtap="enterApp">点击进入应用</button>
  
</view>
<web-view wx:if="{{showWebview}}" src="{{finalUrl}}" bindload="onWebviewLoad" binderror="onWebviewError"></web-view>
`;

fs.writeFileSync('miniprogram/pages/index/index.wxml', newCode.trim());
