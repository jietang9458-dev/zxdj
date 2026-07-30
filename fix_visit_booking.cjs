const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const targetImport = `import Header from "../components/Header";`;
const replaceImport = `import { BASES } from '../constants';\nimport Header from "../components/Header";`;
content = content.replace(targetImport, replaceImport);

const targetBases = `  const currentBases =
    bases && bases.length > 0
      ? bases
      : [{ id: "1", title: "中国盐田山海都市片场" }];`;
const replaceBases = `  const currentBases = bases && bases.length > 0 ? bases : BASES;`;
content = content.replace(targetBases, replaceBases);

fs.writeFileSync('src/pages/SubPages.tsx', content);
