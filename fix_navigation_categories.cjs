const fs = require('fs');
let subPagesContent = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

subPagesContent = subPagesContent.replace(
  `onClick={() => navigate('/register')}`,
  `onClick={() => navigate('/register?type=培训报名表')}`
);

// In AuditionRegistration
subPagesContent = subPagesContent.replace(
  `const navigate = useNavigate();
  const { addCourseRegistration, pages } = useCMS();`,
  `const navigate = useNavigate();
  const { addCourseRegistration, pages } = useCMS();
  const typeParam = new URLSearchParams(window.location.search).get('type') || '海选报名表';`
);

subPagesContent = subPagesContent.replace(
  `await addCourseRegistration({ ...newRegistration, category: '海选' });`,
  `await addCourseRegistration({ ...newRegistration, category: typeParam });`
);
subPagesContent = subPagesContent.replace(
  `await addCourseRegistration({ ...newRegistration, category: '海选/活动' });`,
  `const typeParam = new URLSearchParams(window.location.search).get('type') || '一般报名表';\n      await addCourseRegistration({ ...newRegistration, category: typeParam });`
);
subPagesContent = subPagesContent.replace(
  `onClick={() => navigate('/audition/registration')}`,
  `onClick={() => navigate('/audition/registration?type=参演报名表')}`
); // There are multiple, wait.

fs.writeFileSync('src/pages/SubPages.tsx', subPagesContent);
