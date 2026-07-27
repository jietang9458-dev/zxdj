const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const tableCreation = `  CREATE TABLE IF NOT EXISTS visit_bookings (
    id TEXT PRIMARY KEY,
    data TEXT
  );`;

content = content.replace(`  CREATE TABLE IF NOT EXISTS course_registrations (`, `${tableCreation}\n  CREATE TABLE IF NOT EXISTS course_registrations (`);

content = content.replace(`'feedbacks', 'course_registrations',`, `'feedbacks', 'course_registrations', 'visit_bookings',`);

fs.writeFileSync('server.ts', content);
