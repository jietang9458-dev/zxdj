const fs = require('fs');
let content = fs.readFileSync('miniprogram/pages/index/index.js', 'utf-8');

// Replace the very end of the file which is "})"
const lastBracket = content.lastIndexOf('})');
if (lastBracket !== -1) {
  content = content.substring(0, lastBracket) + `,

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
})
`;
  fs.writeFileSync('miniprogram/pages/index/index.js', content);
}
