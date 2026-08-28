const fs = require('fs');
let content = fs.readFileSync('src/services/cmsService.ts', 'utf-8');

const oldUpload = `export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(\`\${API_BASE}/upload\`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const json = await res.json();
  return json.url;
}`;

const newUpload = `export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(\`\${API_BASE}/upload\`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const json = await res.json();
  const path = json.url;
  if (path && path.startsWith('/')) {
    return window.location.origin + path;
  }
  return path;
}`;

content = content.replace(oldUpload, newUpload);

fs.writeFileSync('src/services/cmsService.ts', content);
