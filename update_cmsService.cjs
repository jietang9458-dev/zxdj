const fs = require('fs');
let content = fs.readFileSync('src/services/cmsService.ts', 'utf-8');

const additional = `
export async function getVisitBookings() {
  const res = await fetch(\`\${API_BASE}/visit_bookings\`);
  if (!res.ok) return null;
  return await res.json();
}

export async function addVisitBooking(data: any) {
  const res = await fetch(\`\${API_BASE}/visit_bookings\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
}
`;

content = content + additional;
fs.writeFileSync('src/services/cmsService.ts', content);
