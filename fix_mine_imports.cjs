const fs = require('fs');
let content = fs.readFileSync('src/pages/Mine.tsx', 'utf-8');

const targetImports = `import { User, ClipboardList, Star, ShoppingBag, Calendar, Crown, Headset, UserPlus, Settings, Edit3, Wallet } from 'lucide-react';`;
const replaceImports = `import { User, ClipboardList, Star, ShoppingBag, Calendar, Crown, Headset, UserPlus, Settings, Edit3, Wallet } from 'lucide-react';
import { postShareToMiniProgram } from '../utils/wechat';`;
content = content.replace(targetImports, replaceImports);
fs.writeFileSync('src/pages/Mine.tsx', content);
