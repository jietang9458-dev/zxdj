const fs = require('fs');

// Fix App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
const appImportTarget = `import { InvestDetail, NewsDetail, LearningArt, AuditionRegistration, GeneralRegistration, MyRegistrations, AuditionProjectList, ProjectDetails, ClassDetails, VisitBooking } from './pages/SubPages';`;
if (appContent.includes(appImportTarget)) {
    // already updated but maybe not exported?
} else {
    appContent = appContent.replace(`} from './pages/SubPages';`, `, VisitBooking } from './pages/SubPages';`);
    fs.writeFileSync('src/App.tsx', appContent);
}

// Fix Admin.tsx
let adminContent = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');
adminContent = adminContent.replace(`LayoutDashboard, Upload, Plus, Pencil, Trash2, Link as LinkIcon, Edit, Copy, ChevronLeft, Search, Building2, MapPin, ExternalLink, Image as ImageIcon, CheckCircle, Smartphone, Globe, Info, Clock } from 'lucide-react';`, `LayoutDashboard, Upload, Plus, Pencil, Trash2, Link as LinkIcon, Edit, Copy, ChevronLeft, Search, Building2, MapPin, ExternalLink, Image as ImageIcon, CheckCircle, Smartphone, Globe, Info, Clock, X } from 'lucide-react';`);

adminContent = adminContent.replace(`const input = document.getElementById(\`tag-input-\${field.key}\`);`, `const input = document.getElementById(\`tag-input-\${field.key}\`) as HTMLInputElement;`);

fs.writeFileSync('src/pages/Admin.tsx', adminContent);
