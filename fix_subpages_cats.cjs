const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const targetStr = `export function CopyrightLibrary() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const libraryItems =
    pages.copyright?.libraryItems || HOT_DRAMAS.concat(HOT_DRAMAS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("全部");
  const cats = ["全部", "现代都市", "古装玄幻", "悬疑惊悚", "年代励志"];
  const baseDramas = libraryItems.map((d: any, i: number) => ({
    ...d,
    cat: d.cat || cats[(i % 4) + 1],
  }));`;

const replaceStr = `export function CopyrightLibrary() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const libraryItems =
    pages.copyright?.libraryItems || HOT_DRAMAS.concat(HOT_DRAMAS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("全部");
  
  const configuredCats = pages.copyright?.libraryCategories?.map((c: any) => c.name) || ["现代都市", "古装玄幻", "悬疑惊悚", "年代励志"];
  const cats = ["全部", ...configuredCats];

  const baseDramas = libraryItems.map((d: any, i: number) => ({
    ...d,
    cat: d.cat || configuredCats[i % configuredCats.length],
  }));`;

content = content.replace(targetStr, replaceStr);
fs.writeFileSync('src/pages/SubPages.tsx', content);
