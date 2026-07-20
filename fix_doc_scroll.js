const fs = require('fs');
let content = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

if (!content.includes('window.scrollTo(0, 0)') && content.includes('export function DocumentPage')) {
  content = content.replace(
    /export function DocumentPage\(\) \{\s*const \{ docKey \} = useParams\(\);/,
    "export function DocumentPage() {\n  useEffect(() => {\n    window.scrollTo(0, 0);\n  }, []);\n  const { docKey } = useParams();"
  );
  fs.writeFileSync('src/pages/UserSubPages.tsx', content);
  console.log('Added scrollTo to DocumentPage');
} else {
  console.log('Already added or DocumentPage not found');
}
