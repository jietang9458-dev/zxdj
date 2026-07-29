const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const oldStr = `            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const newStr = `            </div>
          ))}
        </div>
        <button 
          onClick={() => navigate('/help')}
          className="mt-10 w-full bg-[#8B6E4E] hover:bg-[#6A523A] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-[#8B6E4E]/20"
        >
          <MessageSquare size={18} />
          立即咨询
        </button>
      </div>
    </div>
  );
}`;

content = content.substring(0, content.lastIndexOf(oldStr)) + newStr;
fs.writeFileSync('src/pages/SubPages.tsx', content);
