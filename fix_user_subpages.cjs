const fs = require('fs');
let content = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

const targetImport = `import { User, ChevronRight, Shield, Bell, Trash2, Moon, Sun, Wallet, Star, Clock, HelpCircle, MessageSquare, Send, Film, ShoppingBag } from 'lucide-react';`;
const replaceImport = `import { User, ChevronRight, Shield, Bell, Trash2, Moon, Sun, Wallet, Star, Clock, HelpCircle, MessageSquare, Send, Film, ShoppingBag, X } from 'lucide-react';`;
content = content.replace(targetImport, replaceImport);

const targetCloseBtn = `<button 
                  onClick={() => setShowChat(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400"
                >
                </button>`;
const replaceCloseBtn = `<button 
                  onClick={() => setShowChat(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>`;
content = content.replace(targetCloseBtn, replaceCloseBtn);

const targetSendBtn = `<button 
                    disabled={!input.trim()}
                    onClick={handleSend}
                    className={\`w-10 h-10 rounded-xl flex items-center justify-center transition-all \${
                      input.trim() 
                        ? 'bg-[#8B6E4E] text-white shadow-lg active:scale-90' 
                        : 'bg-gray-200 text-gray-400'
                    }\`}
                  >
                  </button>`;
const replaceSendBtn = `<button 
                    disabled={!input.trim()}
                    onClick={handleSend}
                    className={\`w-10 h-10 rounded-xl flex items-center justify-center transition-all \${
                      input.trim() 
                        ? 'bg-[#8B6E4E] text-white shadow-lg active:scale-90' 
                        : 'bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-gray-500'
                    }\`}
                  >
                    <Send size={18} />
                  </button>`;
content = content.replace(targetSendBtn, replaceSendBtn);

fs.writeFileSync('src/pages/UserSubPages.tsx', content);
