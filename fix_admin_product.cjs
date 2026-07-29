const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const productSchemaOld = `        fields: [
          { key: 'imageUrl', label: '商品图 (1:1方图)', type: 'image', aspectRatio: 1 },
          { key: 'title', label: '商品名称', type: 'text' },
          { key: 'desc', label: '商品介绍', type: 'textarea' },
          { key: 'originalPrice', label: '原价', type: 'number' },
          { key: 'memberPrice', label: '会员价', type: 'number' },
          { key: 'pavilion', label: '所属产品馆 (如 深圳特色产品馆)', type: 'text' },
          { key: 'category', label: '所属类别 (如 文创产品)', type: 'text' },`;
          
const productSchemaNew = `        fields: [
          { key: 'imageUrl', label: '商品图 (1:1方图)', type: 'image', aspectRatio: 1 },
          { key: 'title', label: '商品名称', type: 'text' },
          { key: 'desc', label: '商品介绍', type: 'textarea' },
          { key: 'originalPrice', label: '原价', type: 'number' },
          { key: 'memberPrice', label: '会员价', type: 'number' },
          { key: 'salesCount', label: '付款人数', type: 'number' },
          { key: 'pavilion', label: '所属产品馆 (如 深圳特色产品馆)', type: 'text' },
          { key: 'category', label: '所属类别 (如 文创产品)', type: 'text' },`;

content = content.replace(productSchemaOld, productSchemaNew);
fs.writeFileSync('src/pages/Admin.tsx', content);
