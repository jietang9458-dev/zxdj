const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const target1 = `  const { addCourseRegistration } = useCMS();
  const { addNotification } = useUser();
  const [formData, setFormData] = useState({`;

const replacement1 = `  const { addCourseRegistration, pages } = useCMS();
  const { addNotification } = useUser();
  const auditionEmail = pages.settings?.auditionEmail || 'szfyuan@163.com';
  const [formData, setFormData] = useState({`;

content = content.replace(target1, replacement1);

const target2 = `            <button 
              type="submit"
              className="w-full h-14 bg-[#1A1108] dark:bg-[#E6D5B8] text-white dark:text-[#1A1108] font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px] mt-4"
            >
              提交报名信息
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}`;

const replacement2 = `            <button 
              type="submit"
              className="w-full h-14 bg-[#1A1108] dark:bg-[#E6D5B8] text-white dark:text-[#1A1108] font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px] mt-4"
            >
              提交报名信息
            </button>
            <div className="mt-6 text-center text-[12px] text-red-500 font-bold px-4 leading-relaxed">
              注意：请将素颜生活照和作品发至邮箱：
              <span 
                onClick={() => {
                  navigator.clipboard.writeText(auditionEmail);
                  alert('复制成功');
                }}
                className="text-blue-600 text-[14px] font-black cursor-pointer underline underline-offset-2 break-all inline-block ml-1"
              >
                {auditionEmail}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}`;

content = content.replace(target2, replacement2);
fs.writeFileSync('src/pages/SubPages.tsx', content);
