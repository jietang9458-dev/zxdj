const fs = require('fs');
let content = fs.readFileSync('src/pages/Mine.tsx', 'utf-8');

const targetImports = `import { Settings, UserPlus, ClipboardList, Edit3, Crown, Box, Clock, ShieldCheck, HelpCircle } from 'lucide-react';`;
const replaceImports = `import { Settings, UserPlus, ClipboardList, Edit3, Crown, Box, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import { postShareToMiniProgram } from '../utils/wechat';`;
content = content.replace(targetImports, replaceImports);

const targetRights = `  const RightsIcons = [
    { label: '会员中心', Icon: Crown, path: '/starclub' },
    { label: '设置', Icon: Settings, path: '/settings' },
    { label: '邀请好友', Icon: UserPlus, path: '/service/flow' },
    { label: '我的报名', Icon: ClipboardList, path: '/user/my-registrations' },
  ];`;
const replaceRights = `  const RightsIcons = [
    { label: '会员中心', Icon: Crown, path: '/starclub' },
    { label: '设置', Icon: Settings, path: '/settings' },
    { label: '邀请好友', Icon: UserPlus, action: 'share' },
    { label: '我的报名', Icon: ClipboardList, path: '/user/my-registrations' },
  ];

  const handleShare = () => {
    if ((window as any).__wxjs_environment === 'miniprogram' || (window as any).wx?.miniProgram) {
      postShareToMiniProgram({
        title: '邀请您加入中星影视生态链',
        link: window.location.origin,
      });
      alert('点击右上角分享给好友');
    } else {
      if (navigator.share) {
        navigator.share({
          title: '中星影视生态链',
          text: '邀请您加入中星影视生态链',
          url: window.location.origin
        }).catch(console.error);
      } else {
        alert('当前环境不支持直接分享，请复制链接分享给好友');
      }
    }
  };`;
content = content.replace(targetRights, replaceRights);

const targetRender = `{RightsIcons.map((item, idx) => (
            <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-3 cursor-pointer group">`;
const replaceRender = `{RightsIcons.map((item, idx) => (
            <div key={idx} onClick={() => item.action === 'share' ? handleShare() : navigate(item.path!)} className="flex flex-col items-center gap-3 cursor-pointer group">`;
content = content.replace(targetRender, replaceRender);

fs.writeFileSync('src/pages/Mine.tsx', content);
